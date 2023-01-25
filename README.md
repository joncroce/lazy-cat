# Lazy Cat

A full-stack application built with Node, Express, PostgreSQL, Kysely, and React.

## 🚧 Under Construction 🚧

This project is currently in the early stages of development. Key features are still being planned, so check back soon 👀

## What can it be used for right now?

You can see how a functioning RESTful API may be assembled using Node, Express, PostgreSQL, and Kysely.

To get it running, install the dependencies from the `/server` directory ([pnpm](https://pnpm.io/) recommended) and then you'll need the following set up:

### A PostgreSQL database

Consider using Docker to handle this for you. Their [official image](https://hub.docker.com/_/postgres) is convenient.

Once that's running, run the `migrate:latest` npm script from the `/server` directory to prepare the database for operations.

### Environment variables set

This project uses [dotenv](https://github.com/motdotla/dotenv), so a `.env` file placed in the `/server` directory with the following environment variables set is preferable (defaults suggested where appropriate):
```
PGUSER="postgres"
PGHOST="localhost"
PGPORT=5432
PGDATABASE="postgres"
PGPASSWORD=

SERVER_PORT=3001
```

Now the `dev` npm script can be run from the `/server` directory.

### A way to make requests to the API endpoints

A program like [Postman](https://www.postman.com/) or [Curl](https://github.com/curl/curl) will allow you to interact with the API now that (hopefully) the database is ready and the server is running.

## What might it be used for later?

Whatever interesting relational data modeling I can think of, with corresponding data visualizations on the front-end.

My overall intent with this is to show a project reflecting my current skill level as a full-stack developer. With that in mind, there is absurd potential for feature creep and over-engineering. 

Leave the laziness to the cats 😸