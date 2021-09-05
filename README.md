# Mr. Solomons

Money conversation service.

[Who?](https://peaky-blinders.fandom.com/wiki/Alfie_Solomons)

## Production

This service has an MIT license, so you can use it for you own needs.

1. Run `docker build` for creating docker-image
2. Run docker-image: by `docker run`, `docker-compose`, `k8s` or what ever

Container accept the following env-variables:

- Database (PostgreSQL) connection params: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- Api-key for [CurrencyConverterApi](https://www.currencyconverterapi.com) — `MANNY_API_KEY`

Before starting the application, you must initialize tables for application. Run inside the container next commands:

- `yarn yarn knex --esm migrate:latest`

Now, application listen `3001` port in container, you can use it.

## Development

1. Start PostgreSQL
2. Create [CurrencyConverterApi](https://www.currencyconverterapi.com) api-key
3. Copy file `.env.dist` to `.env`
4. Pass PostgreSQL connection params and api-key to `.env`
5. Run application by `yarn dev`

Now, you can find docs and playground at [localhost:3001/v1/docs](http://localhost:3001/v1/docs).
