export async function getJoke(id: string) {
  const jokeFromApi: JokeResponse = await fetch(
    `https://v2.jokeapi.dev/joke/Any?idRange=${id}&safe-mode`
  ).then(
    (response) => response.json() // just retrieve the json data from the response
  );

  return jokeFromApi as Joke;
}

export async function getJokes(amount?: Number) {
  const amountToGet = amount || 2;
  const arrayOfJokesFromApi: JokeResponse = await fetch(
    `https://v2.jokeapi.dev/joke/Any?safe-mode&amount=${amountToGet}`
  ).then(
    (response) => response.json() // just retrieve the json data from the response
  );

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
