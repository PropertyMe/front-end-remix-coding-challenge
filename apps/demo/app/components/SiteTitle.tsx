import styled from "@emotion/styled";

const SiteTitle = styled.h1`
  font-family: var(--font-display);
  margin: 0;
  text-shadow: 0 3px 0 rgba(0, 0, 0, 0.75);
  line-height: 2.5rem;
  font-size: 2.25rem;
  color: var(--color-foreground);

  .logo-medium {
    display: none;
  }
  @media print, (min-width: 640px) {
    font-size: 3rem;
    line-height: 1;

    .logo {
      display: none;
    }
    .logo-medium {
      display: block;
    }
  }
  @media screen and (min-width: 1024px) {
    font-size: 3.75rem;
  }
`;

export default SiteTitle;
