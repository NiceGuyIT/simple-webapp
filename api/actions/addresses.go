package actions

import (
	"fmt"
	"net/http"

	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/pop/v6"
	"github.com/gobuffalo/x/responder"

	"webapp/models"
)

// This file is generated by Buffalo. It offers a basic structure for
// adding, editing and deleting a page. If your model is more
// complex or you need more than the basic implementation you need to
// edit this file.

// Following naming logic is implemented in Buffalo:
// Model: Singular (Address)
// DB Table: Plural (addresses)
// Resource: Plural (Addresses)
// Path: Plural (/addresses)
// View Template Folder: Plural (/templates/addresses/)

// AddressesResource is the resource for the Address model
type AddressesResource struct {
	buffalo.Resource
}

// List gets all Addresses. This function is mapped to the path
// GET /addresses
func (v AddressesResource) List(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	addresses := &models.Addresses{}

	// Paginate results. Params "page" and "per_page" control pagination.
	// Default values are "page=1" and "per_page=20".
	q := tx.PaginateFromParams(c.Params())

	// Retrieve all Addresses from the DB
	if err := q.All(addresses); err != nil {
		return err
	}

	return responder.Wants("html", func(c buffalo.Context) error {
		// Add the paginator to the context so it can be used in the template.
		c.Set("pagination", q.Paginator)

		c.Set("addresses", addresses)
		return c.Render(http.StatusOK, r.HTML("addresses/index.plush.html"))
	}).Wants("json", func(c buffalo.Context) error {
		return c.Render(200, r.JSON(addresses))
	}).Wants("xml", func(c buffalo.Context) error {
		return c.Render(200, r.XML(addresses))
	}).Respond(c)
}

// Show gets the data for one Address. This function is mapped to
// the path GET /addresses/{address_id}
func (v AddressesResource) Show(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Address
	address := &models.Address{}

	// To find the Address the parameter address_id is used.
	if err := tx.Find(address, c.Param("address_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	return responder.Wants("html", func(c buffalo.Context) error {
		c.Set("address", address)

		return c.Render(http.StatusOK, r.HTML("addresses/show.plush.html"))
	}).Wants("json", func(c buffalo.Context) error {
		return c.Render(200, r.JSON(address))
	}).Wants("xml", func(c buffalo.Context) error {
		return c.Render(200, r.XML(address))
	}).Respond(c)
}

// Create adds a Address to the DB. This function is mapped to the
// path POST /addresses
func (v AddressesResource) Create(c buffalo.Context) error {
	// Allocate an empty Address
	address := &models.Address{}

	// Bind address to the html form elements
	if err := c.Bind(address); err != nil {
		return err
	}

	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Validate the data from the html form
	verrs, err := tx.ValidateAndCreate(address)
	if err != nil {
		return err
	}

	if verrs.HasAny() {
		return responder.Wants("html", func(c buffalo.Context) error {
			// Make the errors available inside the html template
			c.Set("errors", verrs)

			// Render again the new.html template that the user can
			// correct the input.
			c.Set("address", address)

			return c.Render(http.StatusUnprocessableEntity, r.HTML("addresses/new.plush.html"))
		}).Wants("json", func(c buffalo.Context) error {
			return c.Render(http.StatusUnprocessableEntity, r.JSON(verrs))
		}).Wants("xml", func(c buffalo.Context) error {
			return c.Render(http.StatusUnprocessableEntity, r.XML(verrs))
		}).Respond(c)
	}

	return responder.Wants("html", func(c buffalo.Context) error {
		// If there are no errors set a success message
		c.Flash().Add("success", T.Translate(c, "address.created.success"))

		// and redirect to the show page
		return c.Redirect(http.StatusSeeOther, "/addresses/%v", address.ID)
	}).Wants("json", func(c buffalo.Context) error {
		return c.Render(http.StatusCreated, r.JSON(address))
	}).Wants("xml", func(c buffalo.Context) error {
		return c.Render(http.StatusCreated, r.XML(address))
	}).Respond(c)
}

// Update changes a Address in the DB. This function is mapped to
// the path PUT /addresses/{address_id}
func (v AddressesResource) Update(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Address
	address := &models.Address{}

	if err := tx.Find(address, c.Param("address_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	// Bind Address to the html form elements
	if err := c.Bind(address); err != nil {
		return err
	}

	verrs, err := tx.ValidateAndUpdate(address)
	if err != nil {
		return err
	}

	if verrs.HasAny() {
		return responder.Wants("html", func(c buffalo.Context) error {
			// Make the errors available inside the html template
			c.Set("errors", verrs)

			// Render again the edit.html template that the user can
			// correct the input.
			c.Set("address", address)

			return c.Render(http.StatusUnprocessableEntity, r.HTML("addresses/edit.plush.html"))
		}).Wants("json", func(c buffalo.Context) error {
			return c.Render(http.StatusUnprocessableEntity, r.JSON(verrs))
		}).Wants("xml", func(c buffalo.Context) error {
			return c.Render(http.StatusUnprocessableEntity, r.XML(verrs))
		}).Respond(c)
	}

	return responder.Wants("html", func(c buffalo.Context) error {
		// If there are no errors set a success message
		c.Flash().Add("success", T.Translate(c, "address.updated.success"))

		// and redirect to the show page
		return c.Redirect(http.StatusSeeOther, "/addresses/%v", address.ID)
	}).Wants("json", func(c buffalo.Context) error {
		return c.Render(http.StatusOK, r.JSON(address))
	}).Wants("xml", func(c buffalo.Context) error {
		return c.Render(http.StatusOK, r.XML(address))
	}).Respond(c)
}

// Destroy deletes a Address from the DB. This function is mapped
// to the path DELETE /addresses/{address_id}
func (v AddressesResource) Destroy(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Address
	address := &models.Address{}

	// To find the Address the parameter address_id is used.
	if err := tx.Find(address, c.Param("address_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	if err := tx.Destroy(address); err != nil {
		return err
	}

	return responder.Wants("html", func(c buffalo.Context) error {
		// If there are no errors set a flash message
		c.Flash().Add("success", T.Translate(c, "address.destroyed.success"))

		// Redirect to the index page
		return c.Redirect(http.StatusSeeOther, "/addresses")
	}).Wants("json", func(c buffalo.Context) error {
		return c.Render(http.StatusOK, r.JSON(address))
	}).Wants("xml", func(c buffalo.Context) error {
		return c.Render(http.StatusOK, r.XML(address))
	}).Respond(c)
}
