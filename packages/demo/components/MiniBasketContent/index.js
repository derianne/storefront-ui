import React from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { useTheme } from "@commerce-ui/core/Theme";

import { CheckoutLineItemRowTheme1 } from "../CheckoutLineItemRow";
// import useDeleteFromCart from "data/useDeleteFromCart";
import useCheckout from "data/useCheckout";

const MiniBasketContent = props => {
  const {} = props;
  const theme = useTheme();
  // const [deleteItemFromCart, deletingInProgress] = useDeleteFromCart();
  const { checkout } = useCheckout();

  const lineItems = checkout.lineItems;

  return (
    <div
      css={css`
        padding: ${theme.spacings.s50}px;
        * {
          box-sizing: border-box;
        }
        & > div:not(:first-of-type) {
          margin-top: ${theme.spacings.s80}px;
        }
      `}
    >
      {lineItems.map((lineItem, index) => (
        <div>
          <CheckoutLineItemRowTheme1
            checkoutLineItem={lineItem}
            layout={"compact"}
            mode={"basket"}
            onBinClick={() => alert(3)}
          />
        </div>
      ))}
    </div>
  );
};

MiniBasketContent.defaultProps = {};

export default MiniBasketContent;
