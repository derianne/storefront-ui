import React from "react";
import Page from "../docs-utils/Page";
import { md, Example, CodeBlock } from "../docs-utils/docs";

const content = md`
# Button

${<Example code={require("!!raw-loader!../src/core-main/Button/examples/01-standard-use.js")} component={require('../src/core-main/Button/examples/01-standard-use.js').default} />}

`;

export default () => <Page>{content}</Page>;


