import React from "react";
import Page from "../docs-utils/Page";
import { md, Example, CodeBlock } from "../docs-utils/docs";

const content = md`
# Selects

## \`Select\`

${(
  <Example
    code={
      require("!!raw-loader!../src/packages/Select/examples/01-standard-use.js")
        .default
    }
    component={
      require("../src/packages/Select/examples/01-standard-use.js").default
    }
  />
)}

`;

export default () => <Page>{content}</Page>;
