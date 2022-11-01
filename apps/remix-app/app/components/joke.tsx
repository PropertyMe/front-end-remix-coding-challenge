import { Link } from "@remix-run/react";
import type { Joke } from "../utils/jokes.server";

export function JokeDisplay({ joke }: { joke: Partial<Joke> }) {
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{joke.joke}</p>
      <p>{joke.setup}</p>
      <p>{joke.delivery}</p>
      <Link to={`/jokes/${joke.id}`}>"{`${joke.id}`}" Permalink</Link>
    </div>
  );
}
