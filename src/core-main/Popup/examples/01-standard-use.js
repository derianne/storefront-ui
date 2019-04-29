import React, { useState } from "react";
import { Popup, Button, StorefrontUIContext } from "storefront-ui";

/** @jsx jsx */
import {css, jsx} from "@emotion/core";

import LoremIpsum from "../../../../docs-utils/LoremIpsum";

export default () => {

    return <div>
        <p>Standard</p>
        <Popup trigger={<Button>Open dropdown</Button>}>
            <div css={css`padding: 10px`}>Hello world!</div>
        </Popup>

        <p><code>size=large</code></p>
        <Popup trigger={<Button>Open dropdown</Button>} size={"large"}>
            <div css={css`padding: 10px`}>Hello world!</div>
        </Popup>

        <p><code>size=small</code></p>
        <Popup trigger={<Button>Open dropdown</Button>} size={"small"}>
            <div css={css`padding: 10px`}>Hello world!</div>
        </Popup>

        <p>Custom appearance (no shadow, border, background yellow), closing by button inside popup</p>
        <Popup
            trigger={<Button>Open dropdown</Button>}
            size={"small"}
            appearance={() => ({
                styles: `
                    border: 1px solid black;
                    background-color: yellow;
                `
            })}
        >
            {(closePopup) => <div css={css`padding: 10px`}><button onClick={closePopup}>Close me</button></div>}
        </Popup>

        <p>Custom appearance registered (as default)</p>

        <StorefrontUIContext.Provider value={{
            Popup: {
                default: () => ({
                    styles: `
                        border: 1px solid black;
                        background-color: red;
                    `,
                    size: {
                        width: 500,
                        maxHeight: 500
                    }
                })
            }
        }}>
            <Popup trigger={<Button>Open dropdown</Button>}>Hello world.</Popup>
        </StorefrontUIContext.Provider>

    </div>
};
