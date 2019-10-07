import React from "react";
import { Ledger } from "../../../../demo/components/Ledger";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default () => {
  return (
    <Ledger
      rows={[
        {
          label: "subtotal",
          value: "€12.99"
        },
        {
          label: "Tax",
          value: "€0.00"
        },
        {
          label: "Grand Total",
          value: "€12.99",
          isTotal: true
        }
      ]}
    />
  );
};
