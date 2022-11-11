import { Response } from "@remix-run/node";

export async function getJoke(id: string) {
  const jokeFromApi: JokeResponse = await fetch(
    `https://v2.jokeapi.dev/joke/Any?idRange=${id}&amount=1&safe-mode`
  ).then(async (response) => {
    const jsonResponse = await response.json(); // retrieve the json data from the response body

    // The API responds with a 200 OK and a JSON object when something is wrong with the search https://sv443.net/jokeapi/v2/#errors
    if (jsonResponse.error) {
      throw new Response(
        `Error from API: ${jsonResponse.message} ${jsonResponse.additionalInfo}`,
        {
          status: 404,
        }
      );
    }

    return jsonResponse;
  });

  return jokeFromApi as Joke;
}

export async function getJokes(amount?: Number) {
  const amountToGet = amount || 2;
  const arrayOfJokesFromApi: JokeResponse = await fetch(
    `https://v2.jokeapi.dev/joke/Any?safe-mode&amount=${amountToGet}`
  ).then(async (response) => {
    const jsonResponse = await response.json(); // retrieve the json data from the response body

    // The API responds with a 200 OK and a JSON object when something is wrong with the search https://sv443.net/jokeapi/v2/#errors
    if (jsonResponse.error) {
      throw new Response(
        `Error from API: ${jsonResponse.message} ${jsonResponse.additionalInfo}`,
        {
          status: 404,
        }
      );
    }

    return jsonResponse;
  });

  // Make sure we always return a list, even if we only get one joke
  return arrayOfJokesFromApi.jokes
    ? arrayOfJokesFromApi.jokes
    : [arrayOfJokesFromApi as Joke];
}

export type Joke = {
  category: string;
  type: string;
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: {
    nsfw: Boolean;
    religious: Boolean;
    political: Boolean;
    racist: Boolean;
    sexist: Boolean;
    explicit: Boolean;
  };
  id: Number;
  safe: Boolean;
  lang: string;
};

export type JokeResponse = {
  error?: Boolean;
  amount?: Number;
  jokes?: Array<Joke>;
} & Joke;
