import { json, LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { JokeDisplay } from "../../components/joke";
import type { Joke } from "../../utils/jokes.server";
import Jokes from "../../utils/jokes.server";

type LoaderData = { randomJoke: Joke };

export const loader: LoaderFunction = async () => {
  const randomJokes = await Jokes.getJokes(1);
  const randomJoke = randomJokes[0];

  if (!randomJoke) {
    throw new Response("No random joke found", {
      status: 404,
    });
  }
  const data: LoaderData = { randomJoke };
  return json(data);
};

export default function JokesIndexRoute() {
  const data = useLoaderData<LoaderData>();

  return <JokeDisplay joke={data.randomJoke} />;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="error-container">There are no jokes to display.</div>
    );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary() {
  return <div className="error-container">I did a whoopsies.</div>;
}
