# Category API Reference

Base URL for local development is `http://localhost:3000/api/v1/category`. Send JSON with `Content-Type: application/json` for POST and PATCH. The mounted category routes currently have no authentication middleware.

This reference describes `app.js`, `src/routes/category.js`, the category controller, validators, and database contract. Examples are illustrative. Database-backed runtime verification remains outstanding.

## Category data

A category has an integer `id` and a unique `title`. The database accepts the following title values.

```text
ELECTRONICS, MOBILE_PHONES, COMPUTERS, COMPUTER_ACCESSORIES,
HOME_APPLIANCES, CLOTHING, SHOES, BAGS, JEWELRY, WATCHES,
BEAUTY, PERSONAL_CARE, HEALTH, BABY_PRODUCTS, TOYS, BOOKS,
STATIONERY, OFFICE_SUPPLIES, HOME_AND_KITCHEN, FURNITURE,
HOME_DECOR, GARDEN, TOOLS, SPORTS, OUTDOOR, AUTOMOTIVE,
PET_SUPPLIES, GROCERIES, FOOD_AND_BEVERAGES, MUSICAL_INSTRUMENTS,
VIDEO_GAMES, ARTS_AND_CRAFTS, OTHER
```

The request validator checks that `title` is a string of at least three characters. Enum membership and uniqueness are enforced by the database. Use the exact uppercase values above.

## List categories

`GET /api/v1/category`

```sh
curl http://localhost:3000/api/v1/category
```

A populated list returns HTTP 200.

```json
{"status":"success","message":"categories fetched","data":{"result":[{"id":1,"title":"ELECTRONICS"}]}}
```

An empty list currently returns HTTP 400 with `{"status":"success","message":"no category added yet"}`. The response body and HTTP status reflect the implementation. Pagination, filtering, and ordering parameters are not implemented.

## Create a category

`POST /api/v1/category`

```sh
curl -X POST http://localhost:3000/api/v1/category \
  -H 'Content-Type: application/json' \
  -d '{"title":"ELECTRONICS"}'
```

Success returns HTTP 201.

```json
{"status":"success","message":"ELECTRONICS added successfully","data":{"category":{"id":1,"title":"ELECTRONICS"}}}
```

Validation failure returns HTTP 400 with `status` set to `fail` and the first Zod issue message. A title shorter than three characters produces `name too short`. Duplicate or invalid enum values reach the database error handler and return HTTP 400. Creating an existing title again fails because titles are unique.

## Retrieve one category

`GET /api/v1/category/:id`

```sh
curl http://localhost:3000/api/v1/category/1
```

Success returns HTTP 200.

```json
{"status":"success","message":"category fetched","data":{"category":{"id":1,"title":"ELECTRONICS"}}}
```

A missing category returns HTTP 404 with `status` set to `fail` and a message such as `category with id 1 does not exist`. IDs are converted using `Number()` and have no separate positive-integer request validator. Use a valid integer identifier.

## Update a category

`PATCH /api/v1/category/:id`

```sh
curl -X PATCH http://localhost:3000/api/v1/category/1 \
  -H 'Content-Type: application/json' \
  -d '{"title":"COMPUTERS"}'
```

Success returns HTTP 200.

```json
{"status":"success","message":"COMPUTERS updated successfully","data":{"category":{"id":1,"title":"COMPUTERS"}}}
```

For a JSON object body, `title` remains required. The update schema makes the entire object optional rather than making its fields optional. An empty object fails validation. IDs are parsed using `parseInt(value, 10)`.

The controller contains an HTTP 404 branch when the database update returns no category. A thrown database error instead returns HTTP 400. The exact missing-record behavior therefore depends on the Prisma runtime result and has not been verified against a live database.

## Error handling and operational notes

- Controller validation and database failures generally return HTTP 400 and a JSON object containing `status` and `message`.
- Database error messages currently include error strings, so their exact text depends on the database/runtime.
- Malformed JSON and unmatched routes use Express defaults. A uniform JSON error envelope is not configured.
- There is no authentication, authorization, pagination, or rate-limiting middleware on these routes.
- Successful POST and PATCH requests persist database changes. Avoid blind retries after an uncertain write outcome. Check the category list or individual resource first.
- No DELETE endpoint is registered.

These details document the existing implementation and identify behavior to consider in future development.
