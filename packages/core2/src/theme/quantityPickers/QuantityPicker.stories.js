/** @jsx jsx */
import React, { useState, useEffect, useRef } from "react";
import { jsx, rs } from "@commerce-ui/core";
import QuantityPicker from "./QuantityPicker";
import QuantityPicker2 from "./QuantityPicker2";
import ButtonMinimal from "../Button/ButtonMinimal";
import Button from "../Button/Button";
import { Button$ } from "@commerce-ui/core/Button";
import InputRaw$ from "@commerce-ui/core/InputRaw";
import Input from "../Input";

import { useQuantityPicker } from "@commerce-ui/core/QuantityPicker";

import Box from "@commerce-ui/core/Box";

import SelectNative$ from "@commerce-ui/core/SelectNative";

export const componnt = () => (
  <div>
    <QuantityPicker />
  </div>
);

export const styling2 = () => (
  <div>
    <QuantityPicker2 />
  </div>
);

export const componentDrivenByHook = () => {
  const counter = useQuantityPicker({ step: 6 });

  return (
    <div>
      <QuantityPicker {...counter.counterProps} />
    </div>
  );
};

export const hook = () => {
  const counter = useQuantityPicker({ step: 6 });
  const counter2 = useQuantityPicker();

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <Button {...counter.buttonDecrementProps}>-</Button>
        {counter.exceedsSelectRange && (
          <InputRaw$
            {...counter.inputProps}
            sx={{ width: "50px", textAlign: "center" }}
            noFocus={true}
          />
        )}
        {!counter.exceedsSelectRange && (
          <SelectNative$
            {...counter.selectProps}
            sx={{
              width: "50px",
              textAlignLast: "center",
              $arrowContainer: { __children: <div /> },
              $input: { textAlign: "center" }
            }}
            allowEmpty={false}
          />
        )}
        <Button {...counter.buttonIncrementProps}>+</Button>
      </Box>

      <br />

      <Button onClick={() => counter.setValue(0)}>reset</Button>

      <br />
      <br />
      <br />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <Button {...counter2.buttonDecrementProps}>-</Button>
        {counter2.exceedsSelectRange && (
          <InputRaw$
            {...counter2.inputProps}
            sx={{ width: "50px", textAlign: "center" }}
          />
        )}
        {!counter2.exceedsSelectRange && (
          <SelectNative$
            {...counter2.selectProps}
            sx={{
              width: "50px",
              textAlignLast: "center",
              $arrowContainer: { __children: <div /> },
              $input: { textAlign: "center" }
            }}
          />
        )}
        <Button {...counter2.buttonIncrementProps}>+</Button>
      </Box>
    </div>
  );
};

export default {
  title: "QuantityPicker"
};
