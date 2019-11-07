import "../global-config";

import React from "react";

import { Grid, GridItem } from "@commerce-ui/core/Grid";
import Container from "@commerce-ui/core/Container";
import { useTheme } from "@commerce-ui/core/Theme";
import Device from "@commerce-ui/core/Device";
import { L } from "../theme.js";

import { rslin } from "responsive-helpers";

import { StatefulInput } from "../components/Input";
import Banner from "../components/Banner";
import TwoBanners from "../components/TwoBanners";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import SectionTitle from "../components/SectionTitle";
import CollectionCard from "../components/CollectionCard";

import data from "../data";
import routerPush from "../helpers/routerPush";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import {
  useCollectionByHandle,
  getCollectionByHandle
} from "../data-sources/mock/collectionByHandle";
import {
  useCollections,
  getCollections
} from "../data-sources/mock/collections";

// Categories displayed at the bottom
const categories = [
  "Bars",
  "Candy",
  "Chips & Pretzels",
  "Cookies",
  "Crackers & Crisps",
  "Fruit & Vegetable Snacks",
  "Jerky",
  "Popcorn & Puffs"
].map((category, index) => ({
  title: category,
  image: data.images["landscape" + ((index % 4) + 2)],
  href: "/collection"
}));

const Home = ({
  homepageSliderCollectionDataWithQuery,
  collectionsDataWithQuery
}) => {
  const theme = useTheme();

  const { data: homepageSliderCollection } = useCollectionByHandle(
    homepageSliderCollectionDataWithQuery
  );
  const { data: collections } = useCollections(collectionsDataWithQuery);

  const featuredCollections = collections.filter(c =>
    c.tags.includes("featured-in-homepage")
  );

  return (
    <div>
      <Device mobile>
        <Container
          css={css`
            ${rslin(theme.spacings.s80, theme.spacings.s100).css(
              "margin-bottom"
            )}

            ${rslin(theme.spacings.s100, theme.spacings.s100).css("margin-top")}
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <div
              css={css`
                ${theme.fonts.h4.css}
                margin-bottom: 32px;
              `}
            >
              Basic&nbsp;Store
            </div>

            <StatefulInput
              placeholder={"What you're looking for?"}
              onFocus={() => {
                routerPush("/search");
              }}
              search
            />
          </div>
        </Container>
      </Device>

      <div
        css={css`
          & > div:not(:first-of-type) {
            ${rslin(theme.spacings.s120, theme.spacings.s160).css("margin-top")}
          }
        `}
      >
        <Container>
          <Banner
            image={data.images.boxes.full_box_01}
            imageMobile={data.images.boxes.mobile_box_01}
            href={"/collection"}
            label={"Truly Transparent"}
            title={"Transparent Bottle"}
          />
        </Container>

        {/*<ProductSlider*/}
        {/*products={sliderProducts}*/}
        {/*title={"Top Picks"}*/}
        {/*/>*/}

        <TwoBanners
          title={"Trending Now"}
          banners={[
            <Banner
              image={data.images.boxes.half_box_10}
              imageMobile={data.images.boxes.mobile_box_10}
              label={"The Tonal Trend"}
              href={"/collection"}
            />,
            <Banner
              image={data.images.boxes.half_box_04}
              imageMobile={data.images.boxes.mobile_box_04}
              label={"Summer Must-Haves: Air Max Dia"}
              href={"/collection"}
            />
          ]}
        />

        <div>
          <Container>
            <SectionTitle>Top Categories</SectionTitle>
            <Grid gutterVertical={L.gutter}>
              {featuredCollections.map((collection, index) => (
                <GridItem key={index} params={{ xs: 24, sm: 12, lg: 6 }}>
                  <CollectionCard collection={collection} />
                </GridItem>
              ))}
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async ({ req }) => {
  let homepageSliderCollectionDataWithQuery = await getCollectionByHandle({
    handle: "homepage-slider",
    _fields: { products: {} }
  });

  let collectionsDataWithQuery = await getCollections();

  return { homepageSliderCollectionDataWithQuery, collectionsDataWithQuery };
};

Home.tabbar = 0;
Home.showFooterOnMobile = true;

export default Home;
