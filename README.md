# front-end-remix-coding-challenge

A simple demo repo used in Front End code interviews

## Get started quickly

```sh
git clone https://github.com/PropertyMe/front-end-remix-coding-challenge.git
cd front-end-remix-coding-challenge
npm run dev
```

> 📣 Make sure you have Node 14+ and NPM 7+ installed!

## This is a Remix App based loosely on [Remix.run Jokes Tutorial](https://remix.run/docs/en/v1/tutorials/jokes)

This is based on the Jokes App tutorial, it might be a source of some explanation as to what is here.

https://remix.run/docs/en/v1/tutorials/jokes

## Uses JokesAPI instead of a database

To make sure it is a light project we do not include all of that tutorial code, instead we simply connect to an external API to get the jokes.

https://sv443.net/jokeapi/v2/

## Welcome to NX!

This is a monorepo using NX, we'll use it here to help have a library and an app working together but you don't really need to know lots about it.

- [Intro to Nx](https://nx.dev/getting-started/intro)

We use the `apps` and `libs` structure which is the common standard in NX.

## Deploy using Vercel

Create a vercel project and set the [Root Directory](https://vercel.com/docs/concepts/deployments/configure-a-build?query=root%20directory#root-directory) to the demo folder
in the general settings: `https://vercel.com/{username}/{projectname}/settings/general`

Then run `vercel` in the root directory

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

The first time it will automatically run `npm install` which will take a while.

## Running unit tests

Run `npm run test` to execute all unit tests via [Jest](https://jestjs.io).
Run for example `npm run test:ui-link` to execute only the tests for that library.
