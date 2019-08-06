import React, { useState } from "react";

import { Modal } from "../Modal";

import { MenuDesktop$ } from "storefront-ui/MenuDesktop";
import LayoutLeftCenterRight from "storefront-ui/LayoutLeftCenterRight";
import LayoutRow from "storefront-ui/LayoutRow";
import useScrollDirection from "storefront-ui/useScrollDirection";
import useScrollSegment from "storefront-ui/useScrollSegment";
import Container from "storefront-ui/Container";
import { useTheme } from "storefront-ui/Theme";
import Link from "next/link";

import { Button } from "../Button";
import data from "../../data";
import routerPush from "../../helpers/routerPush";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import MiniBasketContent from "../MiniBasketContent";

import IconSearch from "./outline-search-24px.svg";
import IconCart from "./outline-shopping_cart-24px.svg";
import IconAccount from "./baseline-account_circle-24px.svg";
import { Banner, BannerInner } from "../Banner";
import { ProductCardTheme1 } from "../ProductCard";
import { Ledger } from "../Ledger";
import ProfileLogInContent from "../ProfileLogInContent";

export const MenuDesktopContent = props => {
  const { category, alternative } = props;
  const theme = useTheme();

  return (
    <div
      css={css`
        background: white;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
      `}
    >
      <Container>
        <div
          css={css`
            padding: ${theme.spacings.s100}px 0;
          `}
        >
          <div
            css={css`
              display: flex;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                max-height: 500px;
                flex-wrap: wrap;
                align-content: flex-start;
                justify-content: flex-start;
                width: 75%;
              `}
            >
              {category.subcats.map((subcat, j) => (
                <div
                  css={css`
                    width: 33.33%;
                    a {
                      color: inherit;
                      text-decoration: none;
                    }
                  `}
                >
                  <div
                    css={css`
                      padding-right: 1em;
                      margin-bottom: ${theme.spacings.s40}px;
                      color: ${theme.colors.primary.css};
                      a:hover {
                        color: ${theme.colors.primary600.css};
                      }
                      ${theme.fonts.h6.css}
                    `}
                  >
                    <Link href={"/collection"}>
                      <a>{subcat.name}</a>
                    </Link>
                  </div>
                  <div
                    css={css`
                      padding-bottom: ${theme.spacings.s80}px;
                    `}
                  >
                    {subcat.links &&
                      subcat.links.map((link, k) => (
                        <div
                          css={css`${
                            theme.fonts.body2.css
                          } line-height: 2; a:hover {color: ${
                            theme.colors.mono500.css
                          };`}
                        >
                          <Link href={"/collection"}>
                            <a>{link}</a>
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            <div
              css={css`
                width: 25%;
                padding-left: ${theme.spacings.s40}px;
              `}
            >
              {alternative && <ProductCardTheme1 product={data.products[0]} />}
              {!alternative && (
                <Banner
                  image={data.products[1].images[0]}
                  href={"/collection"}
                  element={<BannerInner text={"The Tonal Trend"} />}
                  elementFlexAlign={"flex-end"}
                  elementFullWidth
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const MenuDesktop = props => {
  const [opened, setOpened] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);

  const basketProducts = data.products.slice(0, 5);

  const theme = useTheme();
  const direction = useScrollDirection();
  const segment = useScrollSegment({ 1: "not-top", 1000: "hideable" });

  const MenuButton = props => (
    <Button
      {...props}
      kind={"minimal"}
      css={css`
        color: ${theme.colors.mono800.css};
        span {
          ${theme.fonts.caption.css}
        }
        svg {
          width: 24px;
          fill: currentColor;
        }
      `}
    >
      {props.children}
    </Button>
  );

  return (
    <MenuDesktop$
      overrides={{
        MenuButton: ({ index, menu, isActive, setActive, buttonProps }) => (
          <MenuButton
            key={index}
            kind={"minimal"}
            isSelected={isActive}
            onClick={() => {
              routerPush("/collection");
            }}
            {...buttonProps}
          >
            {menu.label}
          </MenuButton>
        ),
        MenuBar: ({ buttons }) => (
          <div
            css={css`
              position: relative;
            `}
          >
            <div
              css={css`
                background-color: white;
                transition: all 0.15s ease-out;

                /*transform: ${
                  segment === "hideable" && direction === true
                    ? "translateY(-100%)"
                    : "none"
                };*/

                border-bottom: ${
                  segment === "hideable" || segment === "not-top"
                    ? `1px solid ${theme.colors.mono200.css};`
                    : "none"
                };
              `}
            >
              <Container>
                <LayoutLeftCenterRight
                  height={70}
                  left={
                    <LayoutRow>
                      <div
                        css={css`
                          ${theme.fonts.h6.css} a {
                            text-decoration: none;
                            color: ${theme.colors.mono900.css};
                          }
                        `}
                      >
                        <Link href={"/"}>
                          <a>SuperStore</a>
                        </Link>
                      </div>
                    </LayoutRow>
                  }
                  right={
                    <div>
                      <MenuButton
                        onClick={() => {
                          setProfileOpened(true);
                        }}
                      >
                        <IconAccount />
                      </MenuButton>
                      <MenuButton>
                        <IconSearch />
                      </MenuButton>
                      <MenuButton
                        onClick={() => {
                          setOpened(true);
                        }}
                      >
                        <IconCart />
                        <span>{basketProducts.length}</span>
                      </MenuButton>
                    </div>
                  }
                  center={buttons}
                />
              </Container>
            </div>

            <Modal
              isOpen={opened}
              onRequestClose={() => setOpened(false)}
              config={{
                mode: "right",
                width: {
                  xs: "90vw",
                  md: "50vw",
                  lg: "33vw"
                }
              }}
              header={"Your Bag"}
              footer={() => (
                <div
                  css={css`
                    padding: ${theme.spacings.s30}px;
                  `}
                >
                  <div
                    css={css`
                      padding: ${theme.spacings.s30}px;
                    `}
                  >
                    <Ledger
                      rows={[
                        {
                          label: "Subtotal",
                          value: "€399"
                        },
                        {
                          label: "Tax",
                          value: "€0"
                        },
                        {
                          label: "Total",
                          isTotal: true,
                          value: "€399"
                        }
                      ]}
                    />
                  </div>
                  <div
                    css={css`
                      display: flex;
                      width: 100%;
                      & > div {
                        flex-basis: 50%;
                        padding: ${theme.spacings.s30}px;
                      }
                    `}
                  >
                    <div>
                      <Button
                        kind={"secondary"}
                        fitContainer
                        size={"large"}
                        onClick={() => {
                          setOpened(false);
                          routerPush("/cart");
                        }}
                      >
                        View Bag ({data.products.length})
                      </Button>
                    </div>
                    <div>
                      <Button
                        fitContainer
                        size={"large"}
                        onClick={() => {
                          setOpened(false);
                          routerPush("/form1");
                        }}
                      >
                        Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            >
              <MiniBasketContent products={basketProducts} />
            </Modal>

            <Modal
              isOpen={profileOpened}
              onRequestClose={() => setProfileOpened(false)}
              config={{
                mode: "center",
                width: {
                  xs: "90%",
                  lg: "400px"
                }
              }}
              header={""}
            >
              <div
                css={css`
                  padding: ${theme.spacings.s80}px;
                `}
              >
                <ProfileLogInContent />
              </div>
            </Modal>
          </div>
        )
      }}
      renderMenuContent={true}
      mode={"fixed"}
      debounce={50}
      {...props}
    />
  );
};

export default MenuDesktop;
