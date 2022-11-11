import { ReactNode } from "react";
import { StyledLinkButton } from "./ui-link-button.styles";
/* eslint-disable-next-line */
export interface UiLinkButtonProps {
  children: ReactNode;
  href: string;
}

export function UiLinkButton(props: UiLinkButtonProps) {
  return (
    <StyledLinkButton href={props.href}>{props.children}</StyledLinkButton>
  );
}

export default UiLinkButton;
