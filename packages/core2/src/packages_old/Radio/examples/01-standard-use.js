import React, { useState } from "react";
import { Radio, RadioGroup } from "../../../../../../demo/components/Radio";

import { Radio$, RadioGroup$ } from "@commerce-ui/core/Radio";

import { ThemeProvider } from "@commerce-ui/core/Theme";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default () => {
  const [value, setValue] = useState("1");

  const radioOverrides = {
    Label: {
      style: ({ $theme }) => `
                                ${$theme.fonts.h6.css}
                                color: ${$theme.colors.primary700.css};
                            `
    },
    RadioMarkOuter: {
      style: ({ $theme }) => `border-color: ${$theme.colors.positive}`
    }
  };

  return (
    <div>
      <p>Standard</p>
      <RadioGroup
        name="radio group"
        onChange={e => setValue(e.target.value)}
        value={value}
      >
        <Radio value="1">First</Radio>
        <Radio
          value="2"
          description="This is a radio description, it gives a little more in-yo-face context about what this is."
        >
          Second
        </Radio>
        <Radio value="3">Third</Radio>
      </RadioGroup>

      <p>Themed</p>
      <RadioGroup$
        name="radio group"
        onChange={e => setValue(e.target.value)}
        value={value}
      >
        <Radio$ value="1" overrides={radioOverrides}>
          First
        </Radio$>
        <Radio$
          value="2"
          description="This is a radio description, it gives a little more in-yo-face context about what this is."
          overrides={radioOverrides}
        >
          Second
        </Radio$>
        <Radio$ value="3" overrides={radioOverrides}>
          Third
        </Radio$>
      </RadioGroup$>

      <div>
        <label>
          <input name={"test-radio"} type={"radio"} value={"1"} />
          Opcja 1
        </label>
        <label>
          <input name={"test-radio"} type={"radio"} value={"2"} />
          Opcja 2
        </label>
        <br />
        <label>
          <input name={"test-radio"} type={"radio"} value={"3"} />
          Opcja 3
        </label>
        <label>
          <input name={"test-radio"} type={"radio"} value={"4"} />
          Opcja 4
        </label>
      </div>
    </div>
  );
};
