import React from "react";

import MediaQuery from "storefront-ui/MediaQuery";
import { R } from "storefront-ui/config";

export default () => {
    return (<div>
        <MediaQuery query={"screen and (min-width: 1000px)"}>
            <p>&gt;1000px paragraph</p>
        </MediaQuery>

        <MediaQuery query={"screen and (max-width: 999px)"}>
            <p>&lt;1000px paragraph</p>
        </MediaQuery>

        <MediaQuery range={R.from("md")}>
            <p>from MD up</p>
        </MediaQuery>

        <MediaQuery range={R.to("sm")}>
            <p>from SM down</p>
        </MediaQuery>

    </div>)
};
