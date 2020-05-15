import React from "react";
import { jsx, rs } from "@commerce-ui/core";

import Box from "@commerce-ui/core/Box";

import useFilters from "@commerce-ui/core/useFilters";

import { filters as filtersData } from "./data";

import SelectInline from "@commerce-ui/core/SelectInline";

import ItemRow from "./Selectables/ItemRow";

import SelectNative from "./SelectNative";

export const basic = () => {
  const filters = useFilters({
    data: filtersData,
    onChange: () => {
      console.log("changed!");
    }
  });

  return (
    <Box sx={{ p: 50 }}>
      <SelectInline {...filters.selectProps}>
        <ItemRow />
      </SelectInline>

      <SelectNative {...filters.selectProps} />

      <button
        onClick={() => {
          filters.clear();
        }}
      >
        Clear
      </button>
    </Box>
  );
};

export default {
  title: "Filters"
};
