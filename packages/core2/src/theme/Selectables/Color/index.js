/** @jsx jsx */
import React from "react";
import { jsx } from "@commerce-ui/core";
import Selectable from "@commerce-ui/core/Selectable";
import Box from "@commerce-ui/core/Box";

function Color(props) {
  const { option, ...restProps } = props;

  return (
    <Selectable {...restProps}>
      {({ disabled, highlighted, selected }) => (
        <Box
          sx={{
            width: "32px",
            height: "32px",
            display: "flex",
            borderRadius: "16px",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            lineHeight: 1,
            bg: option.color,
            border: highlighted ? "2px solid black" : "2px solid transparent",
            font: "body",
            opacity: disabled ? 0.5 : 1
          }}
        >
          {selected ? "✔" : ""}
        </Box>
      )}
    </Selectable>
  );
}

export default Color;
