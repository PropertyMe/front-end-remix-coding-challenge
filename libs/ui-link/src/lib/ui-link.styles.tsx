import styled from "@emotion/styled";
import { Link } from "@remix-run/react";

export const StyledUiLink = styled.a`
  color: var(--color-links);
  text-decoration: none;

  &:hover {
    color: var(--color-links-hover);
    text-decoration: underline;
  }
`;

export const StyledRemixUiLink = styled(Link)`
  color: var(--color-links);
  text-decoration: none;

  &:hover {
    color: var(--color-links-hover);
    text-decoration: underline;
  }
`;

export default StyledUiLink;
