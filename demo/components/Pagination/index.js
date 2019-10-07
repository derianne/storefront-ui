import React, { useState } from "react";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { Button } from "../Button";
import { SelectNative } from "../SelectNative";
import { useTheme } from "@commerce-ui/core/Theme";

import LayoutRow from "@commerce-ui/core/LayoutRow";
import { Pagination$, StatefulPagination$ } from "@commerce-ui/core/Pagination";

import IconBack from "../../svg/keyboard_arrow_left.svg";
import IconForward from "../../svg/keyboard_arrow_right.svg";
import Device from "@commerce-ui/core/Device";

const overrides = {
  Root: ({
    prevButtonProps,
    prevButtonActive,
    nextButtonProps,
    nextButtonActive,
    selectProps,
    count
  }) => {
    const theme = useTheme();
    return (
      <LayoutRow gutter={10}>
        <Button
          {...prevButtonProps}
          startEnhancer={() => <IconBack />}
          disabled={!prevButtonActive}
          css={css`
            svg {
              fill: currentColor;
            }
          `}
        >
          <Device desktop> Prev </Device>
        </Button>
        <div
          css={css`
            width: 70px;
          `}
        >
          <SelectNative {...selectProps} />
        </div>
        <div
          css={css`
            ${theme.fonts.body1.css}
          `}
        >
          of {count}
        </div>
        <Button
          {...nextButtonProps}
          disabled={!nextButtonActive}
          endEnhancer={() => <IconForward />}
          css={css`
            svg {
              fill: currentColor;
            }
          `}
        >
          <Device desktop> Next </Device>
        </Button>
      </LayoutRow>
    );
  }
};

export const Pagination = props => (
  <Pagination$ overrides={overrides} {...props} />
);
export const StatefulPagination = props => (
  <StatefulPagination$ overrides={overrides} {...props} />
);
