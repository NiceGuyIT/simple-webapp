package actions

import (
	"github.com/gobuffalo/logger"
	"github.com/sirupsen/logrus"
	buffaloSwagger "github.com/swaggo/buffalo-swagger"
	"github.com/swaggo/buffalo-swagger/swaggerFiles"
	"os"
	"webapp/locales"
	"webapp/models"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/buffalo-pop/v3/pop/popmw"
	"github.com/gobuffalo/envy"
	contenttype "github.com/gobuffalo/mw-contenttype"
	forcessl "github.com/gobuffalo/mw-forcessl"
	i18n "github.com/gobuffalo/mw-i18n/v2"
	paramlogger "github.com/gobuffalo/mw-paramlogger"
	"github.com/gobuffalo/x/sessions"
	"github.com/rs/cors"
	"github.com/unrolled/secure"
	//_ "github.com:NiceGuyIT/simple-webapp/api/docs"
)

// ENV is used to help switch settings based on where the
// application is being run. Default is "development".
var ENV = envy.Get("GO_ENV", "development")

var (
	app *buffalo.App
	T   *i18n.Translator
)

// App is where all routes and middleware for buffalo
// should be defined. This is the nerve center of your
// application.
//
// Routing, middleware, groups, etc... are declared TOP -> DOWN.
// This means if you add a middleware to `app` *after* declaring a
// group, that group will NOT have that new middleware. The same
// is true of resource declarations as well.
//
// It also means that routes are checked in the order they are declared.
// `ServeFiles` is a CATCH-ALL route, so it should always be
// placed last in the route declarations, as it will prevent routes
// declared after it to never be called.
func App() *buffalo.App {
	if app == nil {
		app = buffalo.New(buffalo.Options{
			Env:          ENV,
			SessionStore: sessions.Null{},
			PreWares: []buffalo.PreWare{
				cors.Default().Handler,
			},
			SessionName: "_webapp_session",
			Logger:      TextLogger(logger.DebugLevel),
		})

		// Automatically redirect to SSL
		app.Use(forceSSL())

		// Log request parameters (filters apply).
		app.Use(paramlogger.ParameterLogger)

		// Set the request content type to JSON
		app.Use(contenttype.Set("application/json"))

		// Wraps each request in a transaction.
		//   c.Value("tx").(*pop.Connection)
		// Remove to disable this.
		app.Use(popmw.Transaction(models.DB))

		app.GET("", HomeHandler)
		app.GET("/swagger/{doc:.*}", buffaloSwagger.WrapHandler(swaggerFiles.Handler))

		// Only server the /api/v1 endpoint
		api := app.Group("/api/v1")

		//AuthMiddlewares
		api.Use(SetCurrentUser)
		api.Use(Authorize)

		//Routes for Auth
		auth := api.Group("/auth")
		auth.GET("/", AuthLanding)
		auth.GET("/new", AuthNew)
		auth.POST("/", AuthCreate)
		auth.DELETE("/", AuthDestroy)
		auth.Middleware.Skip(Authorize, AuthLanding, AuthNew, AuthCreate)

		//Routes for User registration
		users := api.Group("/users")
		users.GET("/new", UsersNew)
		users.POST("/", UsersCreate)
		users.Middleware.Remove(Authorize)

		api.Resource("/addresses", AddressesResource{})
		api.Resource("/clients", ClientsResource{})
		api.Resource("/materials", MaterialsResource{})
		api.Resource("/service_calls", ServiceCallsResource{})
	}

	return app
}

// translations will load locale files, set up the translator `actions.T`,
// and will return a middleware to use to load the correct locale for each
// request.
// for more information: https://gobuffalo.io/en/docs/localization
func translations() buffalo.MiddlewareFunc {
	var err error
	if T, err = i18n.New(locales.FS(), "en-US"); err != nil {
		app.Stop(err)
	}
	return T.Middleware()
}

// forceSSL will return a middleware that will redirect an incoming request
// if it is not HTTPS. "http://example.com" => "https://example.com".
// This middleware does **not** enable SSL. for your application. To do that
// we recommend using a proxy: https://gobuffalo.io/en/docs/proxy
// for more information: https://github.com/unrolled/secure/
func forceSSL() buffalo.MiddlewareFunc {
	return forcessl.Middleware(secure.Options{
		SSLRedirect:     ENV == "production",
		SSLProxyHeaders: map[string]string{"X-Forwarded-Proto": "https"},
	})
}

// TextLogger wraps a logrus text logger into a buffalo Logger
// https://gobuffalo.io/documentation/guides/logging/
// TODO: Use ZeroLog
func TextLogger(lvl logger.Level) logger.FieldLogger {
	l := logrus.New()
	/*
		if lvl == nil {
		   if ENV == "production" {
		       l.Level = logger.InfoLevel
		   } else {
		       l.Level = logger.DebugLevel
		   }
		}
	*/

	//l.SetFormatter(&logrus.JSONFormatter{})
	l.SetFormatter(&logrus.TextFormatter{
		FullTimestamp: true,
	})
	l.SetOutput(os.Stdout)
	// This may be useful but makes the log entries too wide for the terminal defeating the purpose of good logging.
	//l.SetReportCaller(true)
	return logger.Logrus{FieldLogger: l}
}
