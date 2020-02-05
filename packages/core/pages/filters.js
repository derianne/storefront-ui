import React from "react";
import Page from "../docs-utils/Page";
import { md, Example, CodeBlock } from "../docs-utils/docs";

const content = md`
# Filters

Filtering in collection page is always quite a feat, especially on mobile.

There are different ways of building filtering in \`storefront-ui\`. You could simply use components shipped by \`storefront-ui'\` like accordions, popups, overlays, item lists etc and put filters together and then connect them to the data from backend (in whatever format).
 
 However, this is not a recommended way. It turns out that almost all the e-commerce websites use common tested patterns for filtering. That's why we ship \`Filter*\` components that handle them and saves you ton of time. The idea of \`Filter*\` helpers is to let you quickly ship simple solution (one line of code) and gradually customise it so that you get original brand feel and at the same time great, stable and well-tested UI/UX patterns. The main info here is that \`storefront-ui\` **is not a theme**. In any place we allow you to ship your own components instead of built-in ones so that your creative team is not limited by it's-not-possible-to-implement talk from developers.
  
## Data format

All filter components in \`storefront-ui\` require unified filter format which is as follows:

${<CodeBlock code={require("!!raw-loader!../data/filters.js").default} />}

## \`FilterColumn\`

Let's start with simple filter column, so common in all kinds of e-commerce sites.

${(
  <Example
    code={
      require("!!raw-loader!../src/packages_old/Filters/examples/01-filters-column.js")
        .default
    }
    component={
      require("../src/packages_old/Filters/examples/01-filters-column.js")
        .default
    }
  />
)}

## \`RangePicker\`

${(
  <Example
    code={
      require("!!raw-loader!../src/packages_old/RangePicker/examples/01-standard-use.js")
        .default
    }
    component={
      require("../src/packages_old/RangePicker/examples/01-standard-use.js")
        .default
    }
  />
)}

`;

export default () => <Page>{content}</Page>;
