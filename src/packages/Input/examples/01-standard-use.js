import React, { useState } from "react";
import { Input } from "storefront-ui/Input";
import { StatefulInput } from "storefront-ui/Input";
import { ThemeProvider } from "storefront-ui/Theme";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import IconSearch from "../../../../data/svg/search.svg";

export default () => {
  let [value, setValue] = useState("");
  let [value2, setValue2] = useState("Peter Pan");

  return (
    <div>
      <p>Standard</p>
      <Input
        onChange={e => setValue(e.target.value)}
        placeholder={"First name"}
        value={value}
      />{" "}
      <br />
      <Input
        onChange={e => setValue2(e.target.value)}
        placeholder={"First name"}
        value={value2}
      />
      <p>Error</p>
      <Input
        onChange={e => setValue(e.target.value)}
        placeholder={"First name"}
        value={value}
        error={true}
      />{" "}
      <br />
      <Input
        onChange={e => setValue2(e.target.value)}
        placeholder={"First name"}
        value={value2}
        error={true}
      />
      <p>Disabled</p>
      <Input
        onChange={e => setValue(e.target.value)}
        placeholder={"First name"}
        value={value}
        disabled={true}
      />{" "}
      <br />
      <Input
        onChange={e => setValue2(e.target.value)}
        placeholder={"First name"}
        value={value2}
        disabled={true}
      />
      <p>Before / After + stateful</p>
      <StatefulInput
        placeholder={"Search"}
        overrides={{
          After: () => (
            <div
              css={css`
                display: flex;
                justify-content: flex;
                align-items: center;
                margin-right: 8px;
              `}
            >
              <IconSearch
                css={css`
                  fill: currentColor;
                `}
              />
            </div>
          )
        }}
      />
      <ThemeProvider
        theme={{
          Input: {
            default: {
              overrides: {
                InputContainer: {
                  style: `
                                border-color: green;
                                border-width: 2px;
                            `
                }
              }
            },

            thick: props => ({
              overrides: {
                InputContainer: {
                  style: `
                                border-color: black;
                                border-width: 5px;
                            `
                }
              }
            })
          }
        }}
      >
        <p>Themed default</p>
        <StatefulInput placeholder={"Search"} />

        <p>Themed custom</p>
        <StatefulInput appearance={"thick"} placeholder={"Search"} />
      </ThemeProvider>
    </div>
  );
};
