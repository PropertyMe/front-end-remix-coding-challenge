import { render } from "@testing-library/react";

import UiLink from "./ui-link";

describe("UiLink", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<UiLink />);
    expect(baseElement).toBeTruthy();
  });
});
