import type { LoaderFunction } from "@remix-run/node";

import styled from "@emotion/styled";
import { UiLink } from "@propertyme-coding-challenge/ui-link";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { UiLinkButton } from "libs/ui-link-button/src";
import SiteTitle from "../components/SiteTitle";
import { getJokes, Joke } from "../utils/jokes.server";

const JokesLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: inherit;
`;

const JokesHeader = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

const JokesContainer = styled.div({
  "--gutter": "16px",
  width: "1024px",
  maxWidth: "calc(100% - var(--gutter) * 2)",
  marginRight: "auto",
  marginLeft: "auto",
  display: "flex",
  gap: "1rem",

  "@media (max-width: 639px)": {
    flexDirection: "column",
  },
  "@media (min-width: 640px)": {
    "--gutter": "40px",
  },
});

const JokesMainContainer = styled(JokesContainer)`
  padding-top: 2rem;
  padding-bottom: 2rem;
  flex: 1 1 100%;

  @media print, (max-width: 639px) {
    padding-top: 3rem;
    padding-bottom: 3rem;
    flex-direction: column-reverse;
  }
`;

const JokesSidebar = styled.div`
  max-width: 12rem;
`;

const JokesOutlet = styled(Outlet)`
  flex: 1;
`;

const JokesFooter = styled.footer`
  padding-top: 2rem;
  padding-bottom: 1rem;
  border-top: 1px solid var(--color-border);
`;

type LoaderData = Joke[];

export const loader: LoaderFunction = async ({}) => {
  const randomJokes: LoaderData = await getJokes(5);

  return json(randomJokes);
};

export default function JokesLayoutRoute() {
  const randomJokes = useLoaderData<LoaderData>();

  return (
    <JokesLayout>
      <JokesHeader>
        <JokesContainer>
          <UiLink
            type="remix"
            to="/"
            title="Remix Jokes"
            aria-label="Remix Jokes"
          >
            <SiteTitle>
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </SiteTitle>
          </UiLink>
        </JokesContainer>
      </JokesHeader>
      <JokesMainContainer>
        <JokesSidebar>
          <p>
            <UiLink type="remix" to=".">
              Get a random joke
            </UiLink>
          </p>
          <p>Here are a few more jokes to check out:</p>
          <ul>
            {randomJokes.map((joke) => (
              <li key={`${joke.id}`}>
                <UiLink type="remix" to={`${joke.id}`}>
                  {joke.setup || joke.joke}
                </UiLink>
              </li>
            ))}
          </ul>
          <UiLinkButton href="https://sv443.net/jokeapi/v2/#submit">
            Add your own
          </UiLinkButton>
        </JokesSidebar>

        <JokesOutlet />
      </JokesMainContainer>
      <JokesFooter>
        <JokesContainer>
          <UiLink to="https://sv443.net/jokeapi/v2/" title="JokesAPI v2">
            All credit for the jokes goes to the JokesAPI
          </UiLink>
        </JokesContainer>
      </JokesFooter>
    </JokesLayout>
  );
}
