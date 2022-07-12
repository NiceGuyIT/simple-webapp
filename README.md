# Simple Web App

This is a simple web application. The server is based on [PocketBase](https://github.com/pocketbase/pocketbase).

## Goal

The goal is a simple web application. It doesn't have to be fance or look nice. The default look and feel of Quasar is
sufficient. Here are the objectives in order of priority.

1. Login page. The sessions need to use JWT. The goal is to use modern standards (JWTs) and not legacy standards (
   session cookies).
2. Service call form. The server API has all the fields defined. A nice form needs to be presented on the frontend.
3. List/search the service calls. Use the appropriate fields for displaying each item.
4. View the service calls. This should be obvious from above but listing it in case it's not.
5. Use the libraries/frameworks already chosen. If you need others, feel free to add them.

## Not needed

The following items are not needed.

1. Great design. This will be completed later.
2. Performance. The app will be used by less than 5 people a few times a day.
3. User management including password resets. This can be handled by the PocketBook admin.
4. Emails. This will be done later if needed.
5. Documentation. I will handle that part.

## Quote

What would it take to accomplish the 5 goals above? I'm looking for price and timeframe. 

## Server

Download [PocketBase](https://github.com/pocketbase/pocketbase) and run it from the server directory or use
the `--dir server/pb_data` switch. For example:

```bash
pocketbase serve --dir server/pb_data
```

The admin, users and collections are already created. Login as the admin to see what is in the database.

- URL: <http://localhost:8090/_/>
- Email: Admin@Example.com
- Password: Admin@Example.com

## Frontend

The frontend is Quasar 2, Vue 3 with composition API and TypeScrypt.
