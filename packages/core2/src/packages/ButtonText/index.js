/** @jsx jsx */
import React from "react";
import { jsx, createElement, getElementSpec, splitSx } from "..";
import ButtonBase from "../ButtonBase";
import Box from "../Box";

const defaultBody = ({ children, leftIcon, rightIcon }) => ({
  __children: (
    <>
      {leftIcon}
      {children}
      {rightIcon}
    </>
  )
});

export default props => {
  let { leftIcon, rightIcon, children, sx, ...restProps } = props;

  return (
    <ButtonBase
      {...restProps}
      sx={state => {
        sx = typeof sx === "function" ? sx(state) : sx;
        const [css, customSx] = splitSx(sx);

        const {
          $leftIcon,
          $rightIcon,
          $body,
          $gap,
          $iconSize,
          ...restSx
        } = customSx;

        const gap = $gap || 0;
        const iconSize = $iconSize || "auto";

        // TODO: wrapper should not be there, styles should be applied directly to icon. We should have `size` parameter for Icons and we can have fixed amount of icon sizes!
        const leftIconWrapper = leftIcon && (
          <Box
            sx={{
              mr: gap,
              flex: "0 0 auto",
              width: iconSize,
              height: iconSize,
              ...$leftIcon
            }}
          >
            {React.cloneElement(leftIcon, {
              style: { width: "100%", height: "100%" }
            })}
          </Box>
        );
        const rightIconWrapper = rightIcon && (
          <Box
            sx={{
              ml: gap,
              flex: "0 0 auto",
              width: iconSize,
              height: iconSize,
              ...$rightIcon
            }}
          >
            {React.cloneElement(rightIcon, {
              style: { width: "100%", height: "100%" }
            })}
          </Box>
        );

        const newState = {
          ...state,
          leftIcon: leftIconWrapper,
          rightIcon: rightIconWrapper,
          children
        };

        const bodySpec = getElementSpec($body, defaultBody, newState);

        return {
          $css: css,
          $body: bodySpec,
          ...restSx
        };
      }}
    />
  );
};
