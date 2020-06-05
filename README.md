# **[Next Level Week]** Ecoleta

## Project

This project is for an application to register eco-points for product disposal.

### 1. Backend

Before we start the development we need to setup our environment, following the next commands:

```sh
npm init -y
npm install express
npm install @types/express --save-dev
npm install typescript --save-dev
npm install ts-node --save-dev
npm install ts-node-dev --save-dev
npx tsc --init
```

After we install everything we need to build our backend, we can simplify some commands, on our **package.json**:

```json
"scripts": {
  "dev": "ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts"
}
```

With this we just need to run this following command to see our backend application working:

```sh
npm run dev
```

Now our environment is setting up to start the coding

#### Database

Our application need to store the eco-points so when we consult on mobile. We'll use an relational database to store all this data.

To this app we'll use [SQLite](https://sqlite.org/index.html) to keep thinks simple.

For our application read and write on SQLite we'll use [Knex.JS](https://knexjs.org/)

> **Knex.js** is a *"batteries included"* SQL query builder for **Postgres**, **MSSQL**, **MySQL**, **MariaDB**, **SQLite3**, **Oracle**, and **Amazon Redshift** designed to be flexible, portable, and fun to use. It features both traditional node style callbacks as well as a promise interface for cleaner async flow control, a stream interface, full featured query and schema builders, transaction support (with savepoints), connection pooling and standardized responses between different query clients and dialects.

To use knex we need to install first

```sh
npm install knex
```

After installation is completed we'll choose our database and install

```sh
npm install sqlite3
```

And to simplify our commands on **package.json** we include this commands:

```json
"scripts": {
  ...,
  "knex:migrate": "knex --knexfile knexfile.ts migrate:latest",
  "knex:seed": "knex --knexfile knexfile.ts seed:run"
}
```

### 2. Web


### 3. Mobile

