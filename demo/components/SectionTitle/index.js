import React from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { rslin, rs, rm } from "responsive-helpers";
import { L, R } from "../../theme.js";

import { useTheme } from "@commerce-ui/core/Theme";

function SectionTitle(props) {
  const theme = useTheme();
  return (
    <div
      css={css`
        ${theme.fonts.h5.css}
        ${rslin(theme.spacings.s40, theme.spacings.s80).css("margin-bottom")}
      `}
    >
      {props.children}
    </div>
  );
}
SectionTitle.propTypes = {
  children: PropTypes.string
};
export default SectionTitle;
