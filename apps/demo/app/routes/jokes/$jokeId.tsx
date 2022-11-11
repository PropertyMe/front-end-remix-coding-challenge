import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { JokeDisplay } from "../../components/JokeDisplay";
import { getJoke, Joke } from "../../utils/jokes.server";

export const meta: MetaFunction = ({ data }: { data: Joke | undefined }) => {
  if (!data) {
    return {
      title: "No joke",
      description: "No joke found",
    };
  }
  return {
    title: `"${data.joke}" joke`,
    description: `Enjoy the "${data.joke}" joke and much more`,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const specificJoke = await getJoke(params.jokeId || "");

  if (!specificJoke) {
    throw new Response("Joke {params.jokeId} doesn't seem to exist.", {
      status: 404,
    });
  }

  return json(specificJoke);
};

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();

  switch (caught.status) {
    case 404: {
      return (
        <div className="error-container">
          Huh? Joke {params.jokeId} doesn't seem to exist.
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status} ${caught.statusText}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const { jokeId } = useParams();
  return (
    <div className="error-container">{`There was an error loading joke by the id ${jokeId}. Sorry.`}</div>
  );
}

export default function JokeRoute() {
  const joke = useLoaderData<Joke>();

  return <JokeDisplay joke={joke} />;
}
