# Rings

BlogRings is a nostalgic revisit of an era from where Google wasn't dominant and forums were all the rage.

## Requirements

```
yarn 3.2.2 or higher
node v16.15.1 or higher
```

## Installation and Setup

Setup for this is quite tricky, as you need to register an account with Auth0 for full functionality.

1. Create an account with Auth0
2. Create a SPA Application, and note down Client ID, Audience, Domain, and Secret.
3. Set VITE_CLIENT_ID, VITE_DOMAIN, VITE_AUDIENCE, and VITE_SECRET in client/.env folder to respective values.
4. Follow given instructions to add callback urls for client side.
5. Create an API with localhost or link of target deployment as audience, and repeat process with the Test application
   Auth0 creates, except with the server now.
6. You will need to configure AUDIENCE and ISSUER_BASE_URL environment variables.
7. Create mongo database and connect URI to it.

```bash
git clone https://github.com/adi-lux/Rings.git foldername
cd foldername
yarn
yarn start
```

## Overview

The codebase is a monorepo, and thus it will be split into client and server side folders. The client side uses React
and Typescript primarily, along with Vite as a bundler. The server side uses Express and Typescript, and it uses nodemon
to ensure consistent testing. Yarn workspaces allows for easy and convenient testing, linting, and running.

Once you set up a local environment, you can experiment with the website as you wish.

## Known Bugs/Issues

The features for this application are essentially complete. However, there do exist some issues that still need to be
taken care of. Look in Issues to find current bugs.

## Contributing

Any contribution or advice would be meaningful, and pull requests by anyone are also welcome! I would prefer if you give
a good explanation of your change and maybe show some proof it works inside the PR, though. 