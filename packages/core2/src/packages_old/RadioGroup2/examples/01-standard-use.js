import React, { useState } from "react";

import {
  RadioGroup$,
  StatefulRadioGroup$,
  StatefulRadioGroupPanels$
} from "@commerce-ui/core/RadioGroup2";
import RadioMark$ from "@commerce-ui/core/RadioGroup2/RadioMark";

import { ThemeProvider } from "@commerce-ui/core/Theme";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default () => {
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState("option2");

  return (
    <div>
      <p>Standard stateless</p>
      <RadioGroup$
        label={"Pick an option"}
        name="radio group"
        onChange={x => setValue(x)}
        value={value}
        items={[
          {
            label: "Option 1",
            value: "option1"
          },
          {
            label: "Option 2",
            value: "option2"
          },
          {
            label: "Option 3",
            value: "option3"
          }
        ]}
      />

      <p>Standard stateless, preselected option</p>
      <RadioGroup$
        label={"Pick an option"}
        name="radio group 2"
        onChange={x => setValue2(x)}
        value={value2}
        items={[
          {
            label: "Option 1",
            value: "option1"
          },
          {
            label: "Option 2",
            value: "option2"
          },
          {
            label: "Option 3",
            value: "option3"
          }
        ]}
      />

      <p>
        Standard stateful with <code>initialValue</code>, with checkmark
      </p>
      <StatefulRadioGroup$
        label={"Pick an option"}
        name="radio group 3"
        onChange={val => console.log("changed", val)}
        initialValue={"option2"}
        items={[
          {
            label: "Option 1",
            value: "option1"
          },
          {
            label: "Option 2",
            value: "option2"
          },
          {
            label: "Option 3",
            value: "option3"
          }
        ]}
        overrides={{
          RadioMark: RadioMark$
        }}
      />

      <p>Standard stateful, with checkmark, overrides</p>
      <StatefulRadioGroup$
        label={"Pick an option"}
        name="radio group 4"
        items={[
          {
            label: "Option 1",
            value: "option1",
            description: "Lorem ipsum dolor sit amet"
          },
          {
            label: "Option 2",
            value: "option2",
            description: "Lorem ipsum dolor sit amet"
          },
          {
            label: "Option 3",
            value: "option3",
            description: "Lorem ipsum dolor sit amet"
          },
          {
            label: "Option 4",
            value: "option4",
            description: "Lorem ipsum dolor sit amet"
          },
          {
            label: "Option 5",
            value: "option5",
            description: "Lorem ipsum dolor sit amet"
          },
          {
            label: "Option 6",
            value: "option6",
            description: "Lorem ipsum dolor sit amet"
          }
        ]}
        overrides={{
          RadioMark: RadioMark$,
          Label: {
            style: ({ checked }) => `
                        color: ${checked ? "blue" : "red"};
                        margin-right: 8px;
                    `
          },
          Container: {
            style: `
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 10px 10px;
                    `
          },
          ItemContainer: {
            style: `
                        margin: 0;
                    `
          },
          Item: {
            style: ({ focused, $theme }) => `
                        padding: 12px;
                        display: flex;
                        flex-direction: column;
                        border: 1px solid ${$theme.colors.mono300.css};
                        justify-content: space-between;

                        &:hover {
                            background-color: yellow;
                        }

                        ${focused ? "color: blue;" : ""}
                    `,
            children: ({ label, radioMark, item, $theme }) => (
              <>
                {label}
                <div
                  css={css`
                            ${$theme.fonts.body2}
                            color: ${$theme.colors.mono500.css};
                            margin: ${$theme.spacings.s30}px 0;
                        `}
                >
                  {item.description}
                </div>
                {radioMark}
              </>
            )
          }
        }}
      />

      <p>Panel short</p>
      <StatefulRadioGroupPanels$
        label={"Pick an option"}
        name="radio group 5"
        initialValue={"option1"}
        items={[
          {
            label: "Option 1",
            value: "option1",
            enhancer: "FREE"
          },
          {
            label: "Option 2",
            value: "option2",
            enhancer: "19.99$"
          },
          {
            label: "Option 3",
            value: "option3",
            enhancer: "24.99$"
          }
        ]}
        overrides={{
          RadioMark: RadioMark$
        }}
      />

      <p>Panel with descriptions and longer titles</p>
      <StatefulRadioGroupPanels$
        label={"Pick an option"}
        name="radio group 6"
        onChange={val => console.log("changed", val)}
        initialValue={"option2"}
        items={[
          {
            label: "Option 1",
            value: "option1",
            enhancer: "FREE",
            description: "This option is for the purpose of doing something."
          },
          {
            label: "Option 2",
            value: "option2",
            enhancer: "19.99$",
            description: "This option is for the purpose of doing something."
          },
          {
            label:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            value: "option3",
            enhancer: "24.99$",
            description: "This option is for the purpose of doing something."
          }
        ]}
        overrides={{
          RadioMark: RadioMark$
        }}
      />

      <p>Panel with content</p>
      <StatefulRadioGroupPanels$
        label={"Pick an option"}
        name="radio group 7"
        items={[
          {
            label: "Option 1",
            value: "option1",
            enhancer: "FREE",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          },
          {
            label: "Option 2",
            value: "option2",
            enhancer: "19.99$",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          },
          {
            label: "Option 3",
            value: "option3",
            enhancer: "24.99$"
          }
        ]}
        overrides={{
          RadioMark: RadioMark$
        }}
      />

      <p>Panel with content - overrides</p>
      <StatefulRadioGroupPanels$
        label={"Pick an option"}
        name="radio group 8"
        items={[
          {
            label: "Option 1",
            value: "option1",
            enhancer: "FREE",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          },
          {
            label: "Option 2",
            value: "option2",
            enhancer: "19.99$",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          },
          {
            label: "Option 3",
            value: "option3",
            enhancer: "24.99$"
          }
        ]}
        overrides={{
          Container: {
            style: `
                        border: none;
                    `
          },
          ItemContainer: {
            style: ({ index, checked }) => `
                        background-color: rgba(0,0,255,0.3);
                        color: white;
                        opacity: 1;
                        &:hover {
                            background-color: rgba(0,0,255,0.3);
                            opacity: 0.9;
                        }
                        border: none;
                        margin-top: ${index > 0 ? "16px" : 0};

                        outline: ${checked ? "3px solid blue;" : ""};
                    `
          },
          Content: {
            style: `
                        margin-top: 2px;
                    `
          }
        }}
      />

      {/*<RadioMark$ disabled={true} />*/}
      {/*<RadioMark$ checked={true} />*/}
      {/*<RadioMark$ checked={false} />*/}
    </div>
  );
};
