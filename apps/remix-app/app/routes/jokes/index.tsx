import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
