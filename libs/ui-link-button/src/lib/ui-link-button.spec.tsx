import { render } from "@testing-library/react";

import UiLinkButton from "./ui-link-button";

describe("UiLink", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <UiLinkButton href="#test">Child</UiLinkButton>
    );
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <a
            class="css-v6r5xe"
            href="#test"
          >
            Child
          </a>
        </div>
      </body>
    `);
  });
});
