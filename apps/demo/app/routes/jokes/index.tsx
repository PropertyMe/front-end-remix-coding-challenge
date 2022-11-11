import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { JokeDisplay } from "../../components/JokeDisplay";
import { getJokes, Joke } from "../../utils/jokes.server";

export const loader: LoaderFunction = async () => {
  const randomJokes = await getJokes(1);
  const randomJoke = randomJokes[0];

  if (!randomJoke) {
    throw new Response("No random joke found", {
      status: 404,
    });
  }

  return json(randomJoke);
};

export default function JokesIndexRoute() {
  const randomJoke = useLoaderData<Joke>();

  return <JokeDisplay joke={randomJoke} />;
}
