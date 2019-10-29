import React, { useState } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { FormHeader } from "../FormHeader";
import data from "../../data";
import { CheckoutLineItemRowTheme1 } from "../CheckoutLineItemRow";
import { Divider } from "../Divider";
import { FormControl } from "../FormControl";
import { StatefulInput } from "../Input";
import { Button } from "../Button";
import { Ledger } from "../Ledger";

import { useTheme } from "@commerce-ui/core/Theme";
import Device from "@commerce-ui/core/Device";
//
// let products = [
//   data.products[0],
//   data.products[1],
//   data.products[2],
//   data.products[3],
//   data.products[4]
// ];

const CheckoutSidebar = props => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  return (
    <>
      <FormHeader title={"Your Bag"} />
      <div>
        {data.checkout.lineItems.slice(0, 5).map((item, index) => (
          <div
            css={css`&:not(:last-of-type) {margin-bottom: ${
              theme.spacings.s40
            }px;)`}
          >
            <CheckoutLineItemRowTheme1
              checkoutLineItem={item}
              layout={"compact"}
              mode={"default"}
            />
          </div>
        ))}
      </div>
      {!props.hideGiftCard && (
        <>
          <div
            css={css`
              height: ${theme.spacings.s80}px;
            `}
          />
          {open && (
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              `}
            >
              <div
                css={css`
                  flex-grow: 1;
                  margin-right: ${theme.spacings.s40}px;
                `}
              >
                <FormControl label={"Promo code"}>
                  <StatefulInput />
                </FormControl>
              </div>
              <Button onClick={() => setOpen()}>Apply</Button>
            </div>
          )}
          {!open && (
            <Button
              kind={"minimal"}
              onClick={() => setOpen(!open)}
              css={css`
                color: ${theme.colors.mono900.css};
                &:hover {
                  color: ${theme.colors.mono900.css};
                  text-decoration: underline;
                }
              `}
            >
              I have a promo code
            </Button>
          )}
        </>
      )}
      <Divider />
      <Ledger
        rows={[
          {
            label: "Subtotal",
            value: "€399"
          },
          {
            label: "Shipping",
            value: "€0"
          },
          {
            label: "Total",
            isTotal: true,
            value: "€399"
          }
        ]}
      />
    </>
  );
};

export default CheckoutSidebar;
