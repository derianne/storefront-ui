import { styled } from "../../base/styles";
import React from "react";

export const rootStyles = ({ $theme }) => `position: relative;`;
export const RootStyled = styled("div", rootStyles);

export const rowStyles = ({ $theme, isTotal }) =>
  `position: relative; display: flex; flex-wrap: nowrap; justify-content: space-between;
    padding: ${$theme.spacings.s10}px 0;
    `;
export const RowStyled = styled("div", rowStyles);

export const labelStyles = ({ $theme, isTotal }) =>
  `flex-grow: 1; ${$theme.fonts.body1.css}
     ${isTotal && $theme.fonts.h6.css}
    `;
export const LabelStyled = styled("div", labelStyles);

export const valueStyles = ({ $theme, isTotal }) =>
  `text-align: right; ${$theme.fonts.body1.css}
    ${isTotal && $theme.fonts.h6.css}
    `;
export const ValueStyled = styled("div", valueStyles);

export const noteStyles = ({ $theme, isTotal }) => `
${$theme.fonts.body2.css}
color: ${$theme.colors.mono500.css};    
margin: ${$theme.spacings.s10}px 0;


    `;
export const NoteStyled = styled("div", noteStyles);
