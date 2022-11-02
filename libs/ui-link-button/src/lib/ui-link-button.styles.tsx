import styled from "styled-components";

export const StyledLinkButton = styled.a`
  --shadow-color: hsl(var(--hs-links) 30%);
  --shadow-size: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-links);
  color: var(--color-background);
  font-family: var(--font-display);
  font-weight: bold;
  line-height: 1;
  font-size: 1.125rem;
  margin: 0;
  padding: 0.625em 1em;
  border: 0;
  border-radius: 4px;
  box-shadow: 0 var(--shadow-size) 0 0 var(--shadow-color);
  outline-offset: 2px;
  transform: translateY(0);
  transition: background-color 50ms ease-out, box-shadow 50ms ease-out,
    transform 100ms cubic-bezier(0.3, 0.6, 0.8, 1.25);

  &:hover {
    --raise: 1px;
    color: var(--color-background);
    text-decoration: none;
    box-shadow: 0 calc(var(--shadow-size) + var(--raise)) 0 0
      var(--shadow-color);
    transform: translateY(calc(var(--raise) * -1));
  }

  &:active {
    --press: 1px;
    box-shadow: 0 calc(var(--shadow-size) - var(--press)) 0 0
      var(--shadow-color);
    transform: translateY(var(--press));
    background-color: var(--color-links-hover);
  }

  &[disabled],
  &[aria-disabled="true"] {
    transform: translateY(0);
    pointer-events: none;
    opacity: 0.7;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;
