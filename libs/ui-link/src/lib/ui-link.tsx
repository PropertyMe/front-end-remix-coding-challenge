import StyledUiLink, { StyledRemixUiLink } from "./ui-link.styles";

export interface UiLinkProps {
  type?: "a" | "remix";
  title?: string;
  to: string;
  children: React.ReactNode;
}

UiLink.defaultProps = {
  type: "a",
};

export function UiLink({ children, type, to, title }: UiLinkProps) {
  if (type === "remix") {
    return <StyledRemixUiLink to={to} children={children} title={title} />;
  }
  return <StyledUiLink href={to} children={children} title={title} />;
}

export default UiLink;
