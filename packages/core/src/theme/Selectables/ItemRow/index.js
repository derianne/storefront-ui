/** @jsx jsx */
import React from "react";
import { jsx } from "@commerce-ui/core";
import Selectable from "@commerce-ui/core/Selectable";
import Box from "@commerce-ui/core/Box";

function ItemRow(props) {
  const { ...restProps } = props;

  return (
    <Selectable {...restProps}>
      {({ disabled, focused, selected }) => (
        <Box
          sx={{
            width: "100%",
            minWidth: "250px",
            height: "44px",
            display: "flex",
            padding: "12px",
            alignItems: "center",
            // pointerEvents: "none",
            lineHeight: 1,
            font: "body",
            bg: "#fafafa",
            opacity: disabled ? 0.5 : 1
          }}
        >
          {restProps.label} {selected ? "✔" : ""}
        </Box>
      )}
    </Selectable>
  );
}

export default ItemRow;
