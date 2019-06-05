import React, { useState } from "react";
import { FiltersColumn } from "../../../../demo/theme/Filters";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import filterData from "../../../../docs-utils/filtersData";
import useFiltersData from "storefront-ui/Filters/useFiltersData";

export default () => {
  const [data, onChange] = useFiltersData(filterData);

  return (
    <div
      css={css`
        width: 400px;
      `}
    >
      <FiltersColumn data={data} onChange={onChange} />
    </div>
  );
};
