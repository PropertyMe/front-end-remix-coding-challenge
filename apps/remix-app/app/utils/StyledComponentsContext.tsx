import React from "react";

export const StyledComponentsContext = React.createContext<null | Array<
  React.ReactElement<{}>
>>(null);

export default StyledComponentsContext;
