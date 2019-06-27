import React from "react";
import { ProductCard } from "../../../../demo/theme/ProductCard";
import { Grid, GridItem } from "storefront-ui/Grid";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import products from "../../../../docs-utils/products";

export default () => {
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <Grid gutter={20} gutterVertical={20}>
        {products.map((product, index) => (
          <GridItem params={{ xs: 12, md: 12, lg: 12 }} key={index}>
            <ProductCard
              name={product.name}
              description={product.description}
              price={product.price}
              discountPrice={product.discountPrice}
              images={product.images}
              badges={product.badges}
            />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
