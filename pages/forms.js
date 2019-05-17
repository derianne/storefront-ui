import React from "react";
import Page from "../docs-utils/Page";
import { md, Example } from "../docs-utils/docs";

const content = md`
# Forms, Inputs and Controls

Right now most of the code related to forms, inputs and controls is taken from base-ui (developed by Uber).

## Input

Standard input field.

${(
  <Example
    code={
      require("!!raw-loader!../src/packages/Input/examples/01-standard-use.js")
        .default
    }
    component={
      require("../src/packages/Input/examples/01-standard-use.js").default
    }
  />
)}

## Tests


`;
//
// ${(
//     <Example
//         code={
//             require("!!raw-loader!../src/packages/Form/examples/01-standard-use.js")
//                 .default
//         }
// component={
//     require("../src/packages/Form/examples/01-standard-use.js").default
// }
// />
// )}

export default () => <Page>{content}</Page>;
