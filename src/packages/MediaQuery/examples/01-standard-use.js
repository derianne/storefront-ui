import React from "react";

import MediaQuery from "@commerce-ui/core/MediaQuery";
import { R } from "responsive-helpers";

export default () => {
  return (
    <div>
      <MediaQuery query={"screen and (min-width: 1000px)"}>
        <p>&gt;1000px paragraph</p>
      </MediaQuery>

      <MediaQuery query={"screen and (max-width: 999px)"}>
        <p>&lt;1000px paragraph</p>
      </MediaQuery>

      <MediaQuery range={R.from("md")} prerender={true}>
        <p>from MD up</p>
      </MediaQuery>

      <MediaQuery range={R.to("sm")} prerender={false}>
        <p>from SM down</p>
      </MediaQuery>
    </div>
  );
};
