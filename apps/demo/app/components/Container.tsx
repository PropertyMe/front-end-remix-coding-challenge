import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledContainer = styled.div`
  --gutter: 16px;

  width: 1024px;
  max-width: calc(100% - var(--gutter) * 2);
  margin-right: auto;
  margin-left: auto;
  display: flex;
  gap: 1rem;

  @media (max-width: 639px) {
    flex-direction: column;
  }
  @media (min-width: 640px) {
    --gutter: 40px;
  }
`;

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <StyledContainer className={className}>{children}</StyledContainer>;
}
