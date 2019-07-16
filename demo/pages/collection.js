import React, { useState } from "react";

import Page from "../components/Page";
import { Grid, GridItem } from "storefront-ui/Grid";
import Container from "storefront-ui/Container";
import { FiltersColumn } from "../theme/Filters";
import { Button } from "../theme/Button";
import LayoutRow from "storefront-ui/LayoutRow";

import { StatefulPopover } from "../theme/Popover";

import { Modal } from "../theme/Modal";

import useFiltersData from "storefront-ui/Filters/useFiltersData";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import data from "../data";
import { ProductCardTheme1 } from "../theme/ProductCard";

export default () => {
  const [filters, onChange] = useFiltersData(data.filters);

  const [filtersModalOpened, setFiltersModalOpened] = useState(false);

  return (
    <Page>
      <Container>
        <Button onClick={() => setFiltersModalOpened(true)}>
          Filters modal
        </Button>

        <StatefulPopover
          content={
            <div
              css={css`
                width: 200px;
                height: 300px;
                background: red;
              `}
            >
              Hej
            </div>
          }
        >
          <Button>Open popover</Button>
        </StatefulPopover>

        <br />
        <br />

        <Modal
          config={{
            mode: "bottom",
            height: "90%"
          }}
          isOpen={filtersModalOpened}
          onRequestClose={() => setFiltersModalOpened(false)}
          header={"Filters"}
          footer={() => (
            <div
              css={css`
                padding: 10px;
                background-color: lightgrey;
              `}
            >
              <Grid gutter={10}>
                <GridItem params={12}>
                  <Button kind={"secondary"} fitContainer={true}>
                    Clear all
                  </Button>
                </GridItem>
                <GridItem params={12}>
                  <Button fitContainer={true}>Apply (55)</Button>
                </GridItem>
              </Grid>
            </div>
          )}
        >
          <FiltersColumn data={filters} onChange={onChange} />
        </Modal>

        <Grid>
          <GridItem params={4}>
            <FiltersColumn data={filters.slice(1)} onChange={onChange} />
          </GridItem>

          <GridItem params={[19, 1]}>
            <Grid colNumber={19} gutter={20} gutterVertical={20}>
              {data.products.map((product, index) => (
                <GridItem params={{ xs: 12, md: 6 }} key={index}>
                  <ProductCardTheme1 product={product} />
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </Grid>
      </Container>
    </Page>
  );
};
