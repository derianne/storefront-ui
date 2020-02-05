import { styled } from "../../../packages/base/styles";
import React from "react";
import { rslin } from "responsive-helpers";
import { R } from "responsive-helpers";

export const rootStyles = ({ $theme }) =>
  `position: relative; display: flex; flex-wrap: nowrap; background: white;`;
export const rootChildren = ({ content, image }) => (
  <>
    {image}
    {content}
  </>
);
export const RootStyled = styled("div", rootStyles, rootChildren);

export const imageContainerStyles = ({ $theme, layout }) =>
  `position: relative; height: 100%; display: flex;  ${
    layout === "compact"
      ? rslin(80, 80).css("width")
      : rslin(80, 140).css("width")
  }`;
export const ImageContainerStyled = styled("div", imageContainerStyles);

export const quantityStyles = ({ $theme }) =>
  `${$theme.fonts.body1.css} display: flex; align-items: center; `;
export const QuantityStyled = styled("div", quantityStyles);

export const titleStyles = ({ $theme, layout }) => `${$theme.fonts.h6.css} 
   a {text-decoration: none; color: ${$theme.colors.mono900.css};} ${
  layout === "compact" ? `max-height: calc(2*1.15em); overflow: hidden;` : ""
}`;
export const TitleStyled = styled("div", titleStyles);

export const descriptionStyles = ({ $theme }) => `
color: ${$theme.colors.mono500.css};
${$theme.fonts.body2.css}
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
    `;
export const DescriptionStyled = styled("div", descriptionStyles);

export const variantStyles = ({ $theme }) =>
  `color: ${$theme.colors.mono500.css}; ${$theme.fonts.body2.css}`;
export const VariantStyled = styled("div", variantStyles);
