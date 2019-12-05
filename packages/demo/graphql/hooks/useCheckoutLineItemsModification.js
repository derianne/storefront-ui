import { useMutation } from "@apollo/react-hooks";
import { useContext } from "react";
import { checkoutLineItemsReplace, createCheckoutMutation } from "../mutations";
import { CheckoutContext } from "../../lib/CheckoutContext";

export default productVariant => {
  const [mutationFunction, { loading, error }] = useMutation(
    checkoutLineItemsReplace
  );
  const [createCheckoutFunction] = useMutation(createCheckoutMutation);
  const { checkout, setCheckout } = useContext(CheckoutContext);

  const createCheckout = async lineItems => {
    const data = await createCheckoutFunction({
      variables: { input: { lineItems } }
    });
    setCheckout(data.data.checkoutCreate.checkout);

    return data.data.checkoutCreate.checkout;
  };

  const getVariantToUpdateAndOtherVariants = () => {
    const variantToUpdate = checkout.lineItems.edges.find(
      el => el.node.variant.id === productVariant.id
    );
    const otherVariants = checkout.lineItems.edges.filter(
      el => el.node.variant.id !== productVariant.id
    );

    return { variantToUpdate, otherVariants };
  };

  const changeQuantity = async (quantity, add) => {
    if (!checkout) {
      await createCheckout([{ variantId: productVariant.id, quantity }]);
      return;
    }

    const {
      variantToUpdate,
      otherVariants
    } = getVariantToUpdateAndOtherVariants();

    const newVariant = variantToUpdate
      ? {
          variantId: variantToUpdate.node.variant.id,
          quantity: add ? quantity + variantToUpdate.node.quantity : quantity
        }
      : { variantId: productVariant.id, quantity };

    const newCheckoutItems = [
      ...otherVariants.map(el => ({
        variantId: el.node.variant.id,
        quantity: el.node.quantity
      })),
      newVariant
    ];

    return runMutation(newCheckoutItems);
  };

  const runMutation = checkoutItems => {
    return mutationFunction({
      variables: {
        checkoutId: checkout.id,
        lineItems: checkoutItems
      }
    })
      .then(checkout => {
        setCheckout(checkout.data.checkoutLineItemsReplace.checkout);
      })
      .catch(err => {});
  };

  const update = quantity => {
    changeQuantity(quantity, false);
  };

  const add = quantity => {
    changeQuantity(quantity, true);
  };

  const remove = quantity => {
    const {
      variantToUpdate,
      otherVariants
    } = getVariantToUpdateAndOtherVariants();

    const newCheckoutItems = [
      ...otherVariants.map(el => ({
        variantId: el.node.variant.id,
        quantity: el.node.quantity
      })),
      {
        variantId: variantToUpdate.node.variant.id,
        quantity: variantToUpdate.node.quantity - quantity
      }
    ];

    runMutation(newCheckoutItems);
  };

  const removeAll = () => {
    runMutation([]);
  };

  return { loading, error, update, add, remove, removeAll };
};
