import React from "react";
import { ProductRowTheme1 } from "../../../../demo/theme/ProductRow";
import { Grid, GridItem } from "storefront-ui/Grid";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import products from "../../../../data/products";

export default () => {
  return (
    <div>
      <Grid gutter={20} gutterVertical={20}>
        {products.map((product, index) => (
          <GridItem params={{ xs: 24, md: [24], lg: [12] }} key={index}>
            <ProductRowTheme1
              product={product}
              price={product.price}
              quantity={"1"}
              layout={"compact"}
              mode={"basket"}
              onClick={() => console.log("click")}
            />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
