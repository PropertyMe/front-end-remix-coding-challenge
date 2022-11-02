import { UiLinkButton } from "@propertyme-coding-challenge/ui-link-button";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import stylesUrl from "../styles/jokes.css";
import Jokes, { Joke } from "../utils/jokes.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderData = {
  randomJokes: Array<Joke>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const randomJokes = await Jokes.getJokes(5);

  const data: LoaderData = {
    randomJokes,
  };

  return json(data);
};

export default function JokesRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {data.randomJokes.map((joke) => (
                <li key={`${joke.id}`}>
                  <Link to={`${joke.id}`}>{joke.setup || joke.joke}</Link>
                </li>
              ))}
            </ul>
            <UiLinkButton href="https://sv443.net/jokeapi/v2/#submit">
              Add your own
            </UiLinkButton>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
      <footer className="jokes-footer">
        <div className="container">
          <a href="https://sv443.net/jokeapi/v2/" title="JokesAPI v2">
            All credit for the jokes goes to the JokesAPI
          </a>
        </div>
      </footer>
    </div>
  );
}
