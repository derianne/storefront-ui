import React from "react";
import Link from "next/link";

import packageJson from "../package.json";
import { menuWidth } from "./layoutVars";

import Color from "../src/packages/Color";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default props => {
  return (
    <div>
      <div
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          width: ${menuWidth};
          height: 100vh;
          background-color: #eaeaea;
          padding: 20px;
        `}
      >
        <strong>
          <pre
            css={css`
              margin-bottom: 2em;
            `}
          >
            storefront-ui <code>{packageJson.version}</code>
          </pre>
        </strong>

        <ul
          css={css`
            list-style: none;
            padding: 0;
            line-height: 1.5;
          `}
        >
          <li>
            <Link href="/">
              <a>Introduction</a>
            </Link>
          </li>
          <li>
            <Link href="/image">
              <a>Image</a>
            </Link>
          </li>
          <li>
            <Link href="/responsive">
              <a>Responsiveness</a>
            </Link>
          </li>
          <li>
            <Link href="/layout">
              <a>Layout, Container and Grid</a>
            </Link>
          </li>
          <li>
            <Link href="/image-mosaic">
              <a>Image mosaic</a>
            </Link>
          </li>
          <li>
            <Link href="/swipeable-items-container">
              <a>Swipers / sliders</a>
            </Link>
          </li>
          <li>
            <Link href="/sticky-column">
              <a>StickyColumn</a>
            </Link>
          </li>
          <li>
            <Link href="/modals">
              <a>Modals / Overlays</a>
            </Link>
          </li>
          <li>
            <Link href="/accordion">
              <a>Accordion</a>
            </Link>
          </li>
          <li>
            <Link href="/filters">
              <a>Filters</a>
            </Link>
          </li>
          <li>
            <Link href="/ledger">
              <a>Ledger</a>
            </Link>
          </li>
          <li>
            <Link href="/button">
              <a>Button</a>
            </Link>
          </li>
          <li>
            <Link href="/popups">
              <a>Popups / dropdowns</a>
            </Link>
          </li>
          <li>
            <Link href="/forms">
              <a>Forms / Inputs / Controls</a>
            </Link>
          </li>
          <li>
            <Link href="/pagination">
              <a>Pagination</a>
            </Link>
          </li>
        </ul>
      </div>

      <div
        css={css`
          position: absolute;
          left: ${menuWidth};
          width: calc(100% - ${menuWidth});
          padding: 20px 0 100px 0;
        `}
      >
        {props.children}
      </div>
    </div>
  );
};
