export async function getJoke(id: string) {
  const res = await fetch(
    `https://v2.jokeapi.dev/joke/Any?idRange=${id}&safe-mode`
  ).then((res) => res.json());

  return res as Joke;
}

export async function getJokes(amount?: Number) {
  const amountToGet = amount || 2;
  const res: JokeResponse = await fetch(
    `https://v2.jokeapi.dev/joke/Any?safe-mode&amount=${amountToGet}`
  ).then((res) => res.json());

  return res.jokes ? res.jokes : [res as Joke];
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

export default { getJokes, getJoke };
