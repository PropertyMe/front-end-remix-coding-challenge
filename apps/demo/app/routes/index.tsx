import styled from "@emotion/styled";
import { UiLink } from "@propertyme-coding-challenge/ui-link";
import { MetaFunction } from "@remix-run/node";
import SiteTitle from "../components/SiteTitle";

const Box = styled.div`
  background-image: radial-gradient(
    circle,
    rgba(152, 11, 238, 1) 0%,
    rgba(118, 15, 181, 1) 35%,
    rgba(58, 13, 85, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: inherit;
  max-width: 100%;
`;

const Content = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  text-align: center;
`;

const SiteTitleBig = styled.div`
  font-size: 4.5rem;
  line-height: 1;
  text-transform: uppercase;
  text-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.5), 0 5px 0 rgba(0, 0, 0, 0.75);

  @media print, (min-width: 640px) {
    font-size: 6rem;
  }
  @media screen and (min-width: 1024px) {
    font-size: 8rem;
  }
`;

const IndexNav = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
  font-family: var(--font-display);
  font-size: 1.125rem;
  line-height: 1;
  align-items: center;
  justify-content: center;

  @media print, (min-width: 640px) {
    font-size: 1.25rem;
    gap: 1.5rem;
  }
`;

const IndexFooter = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
  font-family: var(--font-display);
  font-size: 1.125rem;
  line-height: 1;
  align-items: center;
  justify-content: center;

  @media print, (min-width: 640px) {
    font-size: 1.25rem;
    gap: 1.5rem;
  }
`;

export const meta: MetaFunction = () => ({
  title: "Remix: So great, it's funny!",
  description: "Remix jokes app. Learn Remix and laugh at the same time!",
});

export default function IndexRoute() {
  return (
    <Box>
      <Content>
        <SiteTitle>
          Remix <SiteTitleBig>Jokes!</SiteTitleBig>
        </SiteTitle>
        <IndexNav>
          <UiLink type="remix" to="jokes">
            Read Jokes
          </UiLink>
        </IndexNav>
      </Content>
      <IndexFooter>
        References:
        <UiLink to="https://remix.run/docs/en/v1/tutorials/jokes">
          Jokes App Tutorial
        </UiLink>
        <UiLink to="https://sv443.net/jokeapi/v2/">JokesAPI</UiLink>
      </IndexFooter>
    </Box>
  );
}
