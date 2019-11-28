import useAddToCart from "./useAddToCart";
import React from "react";
import { showNotification } from "@commerce-ui/core/Notifications";
import Notification from "../../components/Notification";
import useCheckout from "./useCheckout";

const useAddToCartAndShowNotification = productVariant => {
  const [checkout, setCheckout] = useCheckout();
  const [addToCartFunction, loading] = useAddToCart(productVariant);

  const addToCart = quantity => {
    addToCartFunction(quantity)
      .then(result => {
        showNotification(({ close }) => (
          <Notification>Product successfuly added to cart</Notification>
        ));

        setCheckout(result.data.checkoutLineItemsAdd.checkout);
      })
      .catch(error => {
        showNotification(({ close }) => (
          <Notification>
            There was some error while adding product to cart
          </Notification>
        ));
      });
  };

  return [addToCart, loading];
};

export default useAddToCartAndShowNotification;
