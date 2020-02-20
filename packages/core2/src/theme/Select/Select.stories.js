/** @jsx jsx */
import React, { useState, useEffect, useRef } from "react";
import { jsx, rs } from "@commerce-ui/core";
import {
  Select$,
  SelectInline$,
  useSelect,
  Select2
} from "@commerce-ui/core/Select";

import Button from "../Button/Button";
import Color from "../Selectables/Color";

import Layer from "@commerce-ui/core/Layer";

const colors = [
  { color: "red", value: "red" },
  { color: "blue", value: "blue" },
  { color: "yellow", value: "yellow" },
  { color: "green", value: "green" },
  { color: "magenta", value: "magenta" },
  { color: "purple", value: "purple" }
];

export const newSelect = () => {
  const [value, setValue] = useState(null); // useState(colors[2]);

  return (
    <div>
      <Button>Test</Button>
      <Button>Test2</Button>

      <Select2
        sx={{
          $layer: <Layer anchoredTo={["window", null, "trigger"]} />,
          $button: <Button />,
          $selectable: <Color />,
          width: "400px"
        }}
        options={colors}
        value={value}
        onChange={value => setValue(value)}
      />

      <Button>Test</Button>
      <Button>Test2</Button>
    </div>
  );
};

export const unstyled = () => {
  const [value, setValue] = useState(colors[2]);

  return (
    <div>
      <Button>Test</Button>
      <Button>Test2</Button>

      <Select$
        config={{
          xs: {
            mode: "slide-from-bottom",
            height: "auto"
          },
          md: {
            anchored: true
          }
        }}
        button={({ selectedItem }) => (
          <Button>{selectedItem ? selectedItem.value : "Pick color"}</Button>
        )}
        options={colors}
        value={value}
        onChange={value => setValue(value)}
      >
        {({ options }) =>
          options.map(option => (
            <Color color={option.color} label={option.color} />
          ))
        }
      </Select$>

      <Button>Test</Button>
      <Button>Test2</Button>
    </div>
  );
};

export const inline = () => {
  const { selectProps } = useSelect({ options: colors });

  return (
    <div>
      <Button>Test</Button>
      <Button>Test2</Button>

      <br />
      <br />

      <SelectInline$ {...selectProps}>
        {({ options }) =>
          options.map(option => (
            <Color color={option.color} label={option.color} />
          ))
        }
      </SelectInline$>

      <br />
      <br />

      <Button>Test</Button>
      <Button>Test2</Button>
    </div>
  );
};

export default {
  title: "Select"
};
