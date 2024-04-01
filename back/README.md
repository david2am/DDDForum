# How to use the project for the first time:

## Install dependencies
```sh
bun install
```


## DB Setup

### Install Turso
Go to the official documentation to [install Turso](https://docs.turso.tech/cli/installation)

### Set env variables
Follow step 2 in the official documentation to set
[Turso env variables](https://docs.turso.tech/sdk/ts/orm/drizzle)


### Seed DB in dev mode
Create the `local` folder inside the `./db` folder


Run the local version of the DB
```sh
bun db:local
```

Run the push command to make the dev mode migration
```sh
bun db:push
```

_**Note:** at this time using Bun can generate some problems with the migration step, to solve it install Nodejs globaly. I highly recommend to use nvm to do this work and install the lastest LTS version of Node._

Run the seed command to insert some dummy data
```sh
bun db:seed
```


# Run the project in subsequent ocassions
Run the preject
```sh
bun run dev
```

In a different terminal run the database
```sh
bun db:local
```