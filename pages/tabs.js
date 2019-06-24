import React from "react";
import Page from "../docs-utils/Page";
import { md, Example, CodeBlock } from "../docs-utils/docs";

const content = md`
# Tabs

${(
  <Example
    code={
      require("!!raw-loader!../src/packages/Tabs/examples/01-standard-use.js")
        .default
    }
    component={
      require("../src/packages/Tabs/examples/01-standard-use.js").default
    }
  />
)}

`;

export default () => <Page>{content}</Page>;
