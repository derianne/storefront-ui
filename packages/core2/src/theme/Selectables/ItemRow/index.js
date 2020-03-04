import React from "react";
import Selectable from "@commerce-ui/core/Selectable";
import Box from "@commerce-ui/core/Box";

function ItemRow(props) {
  return (
    <Selectable {...props}>
      {({ disabled, highlighted, selected }) => (
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
            bg: highlighted ? "rgb(230,230,230)" : "#fafafa",
            ":hover": {
              bg: disabled ? "#fafafa" : "rgb(230,230,230)"
            },
            opacity: disabled ? 0.5 : 1
          }}
        >
          {props.children} {selected ? "✔" : ""}
        </Box>
      )}
    </Selectable>
  );
}

export default ItemRow;
