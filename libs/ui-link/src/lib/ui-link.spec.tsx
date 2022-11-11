import { render } from "@testing-library/react";

import UiLink from "./ui-link";

describe("UiLink", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <UiLink to="/" title="Link title">
        Link text
      </UiLink>
    );
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div>
          <a
            class="css-1iqsx9x"
            href="/"
            title="Link title"
          >
            Link text
          </a>
        </div>
      </body>
    `);
  });
});
