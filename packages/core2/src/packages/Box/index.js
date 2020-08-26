import React, { useContext } from "react";
import { jsx, splitSx, css } from "..";
import { useTheme } from "../Theme";
import CSSContext from "../CSSContext";

import styled from "styled-components";

// import styled from "@emotion/styled";

import { css as cssEmotion } from "@emotion/core";
import styledEmotion from "@emotion/styled";

import { useUID } from "react-uid";

const boxStyles = {
  boxSizing: "border-box",
  minWidth: "0px",
  margin: 0,
  padding: 0,
  border: 0,
  listStyle: "none"
};

const focusReset = {
  ":focus": {
    outline: "none"
  }
};

const fitChildStyles = {
  position: "relative",
  "> *": {
    minWidth: "inherit !important",
    maxWidth: "inherit !important",
    width: "100% !important"
  }
};

const fitChildHeightStyles = {
  position: "relative",
  "> *": {
    minHeight: "inherit !important",
    maxHeight: "inherit !important",
    height: "100% !important"
  }
};

export const styledProvider = theme => {
  return (...args) => {
    let as = "div";
    let obj = args[0];
    let extraProps = args[1];

    if (typeof args[0] === "string") {
      as = args[0];
      obj = args[1];
      extraProps = args[2];
    }

    return styledBox(as, obj, extraProps, theme);
  };
};

export function styledBox(...args) {
  let as = "div";
  let obj;
  let extraProps;

  if (typeof args[0] === "string") {
    as = args[0];
    obj = args[1] || {};
    extraProps = args[2] || {};
  } else {
    obj = args[0] || {};
    extraProps = args[1] || {};
  }

  function createComponent(theme) {
    const { fitW, fitH, noFocus, ...restProps } = extraProps;

    if (typeof obj === "function") {
      obj = obj(theme);
    }

    const rootStyles = {
      ...boxStyles,
      ...(fitW && fitChildStyles),
      ...(fitH && fitChildHeightStyles),
      ...((theme.hideFocus || noFocus) && focusReset)
    };

    let hasFunctions = false;

    // static styles calculated only once in styledBox function. dynamicStyles must be recalculated at runtime
    let staticStyles = {};

    for (let key in obj) {
      if (typeof obj[key] === "function") {
        hasFunctions = true;
      } else {
        staticStyles[key] = obj[key];
      }
    }

    staticStyles = css(staticStyles)(theme); // compile static styles

    let dynamicStyles;

    if (hasFunctions) {
      dynamicStyles = props => {
        let dynamicStyles = {};

        for (let key in obj) {
          if (typeof obj[key] === "function") {
            dynamicStyles[key] = obj[key](props, props.__state__);
          } else {
            // newObj[key] = obj[key];
          }
        }

        dynamicStyles = css(dynamicStyles)(theme); // compile static styles

        return dynamicStyles;
      };
    }

    // const test = cssEmotion(rootStyles, staticStyles, dynamicStyles);
    // console.log('--------',test);
    // console.log(rootStyles, staticStyles, dynamicStyles);

    return {
      component: styledEmotion(as)(rootStyles, staticStyles, dynamicStyles),
      // component: styled(as)`
      //   ${rootStyles}
      //   ${staticStyles}
      //   ${dynamicStyles}
      // `,
      staticStyles
    };
  }

  let RawDiv;

  // This below takes some performance hit, don't know why. Maybe it's just the issue of number of components and dev mode.
  const Component = React.forwardRef((props, ref) => {
    const theme = useTheme();

    if (!RawDiv) {
      RawDiv = createComponent(theme).component;
    }

    if (props.__portals__) {
      return (
        <>
          {props.__portals__}
          <RawDiv {...restProps} {...props} ref={ref} />
        </>
      );
    }
    return React.createElement(RawDiv, { ...props, ref });
  });

  return Component;
}
//
// import { theme2 } from "../../../theme";
// const theme = theme2;
//
// export function styledBox(...args) {
//   let as = "div";
//   let obj;
//   let extraProps;
//
//   if (typeof args[0] === "string") {
//     as = args[0];
//     obj = args[1] || {};
//     extraProps = args[2] || {};
//   } else {
//     obj = args[0] || {};
//     extraProps = args[1] || {};
//   }
//
//   if (typeof obj !== "object") {
//     throw new Error("Dupa, can't use function");
//   }
//
//   const { fitW, fitH, noFocus, ...restProps } = extraProps;
//
//   const rootStyles = {
//     ...boxStyles,
//     ...(fitW && fitChildStyles),
//     ...(fitH && fitChildHeightStyles),
//     ...((theme.hideFocus || noFocus) && focusReset)
//   };
//
//   let hasFunctions = false;
//
//   // static styles calculated only once in styledBox function. dynamicStyles must be recalculated at runtime
//   let staticStyles = {};
//
//   for (let key in obj) {
//     if (typeof obj[key] === "function") {
//       hasFunctions = true;
//     } else {
//       staticStyles[key] = obj[key];
//     }
//   }
//
//   staticStyles = css(staticStyles)(theme); // compile static styles
//
//   let dynamicStyles;
//
//   if (hasFunctions) {
//     dynamicStyles = props => {
//       let dynamicStyles = {};
//
//       for (let key in obj) {
//         if (typeof obj[key] === "function") {
//           dynamicStyles[key] = obj[key](props);
//         } else {
//           // newObj[key] = obj[key];
//         }
//       }
//
//       dynamicStyles = css(dynamicStyles)(theme); // compile static styles
//
//       return dynamicStyles;
//     };
//   }
//
//   // const result = [rootStyles, staticStyles];
//   // if (dynamicStyles) {
//   //   result.push(dynamicStyles);
//   // }
//
//   const RawDiv = styled(as)`
//     ${rootStyles}
//     ${staticStyles}
//     ${dynamicStyles}
//   `;
//
//
//   // This below takes some performance hit, don't know why. Maybe it's just the issue of number of components and dev mode.
//   const Component = React.forwardRef((props, ref) => {
//     if (props.__portals__) {
//       return (
//         <>
//           {props.__portals__}
//           <RawDiv {...restProps} {...props} ref={ref} />
//         </>
//       );
//     }
//     return React.createElement(RawDiv, { ...props, ref });
//   });
//
//   return Component;
// }

function Box_(props) {
  let {
    sx,
    as,
    _ref,
    noFocus = false,
    fitChild = false,
    fitChildHeight = false,
    fitW,
    fitH,
    __portals__,
    ...restProps
  } = props;

  console.log("render box", sx, as);

  const [css, customSx] = splitSx(sx);
  const t = useTheme();

  if (fitW === true) {
    fitChild = true;
  }

  if (fitH === true) {
    fitChildHeight = true;
  }

  const ret = jsx(as, {
    sx: [
      boxStyles,
      (t.hideFocus || noFocus) && focusReset,
      fitChild && fitChildStyles,
      fitChildHeight && fitChildHeightStyles,
      css
    ],
    ref: _ref,
    ...restProps
  });

  if (__portals__) {
    return (
      <>
        {__portals__}
        {ret}
      </>
    );
  }
  return ret;
}

const Box = React.forwardRef((props, ref) => <Box_ _ref={ref} {...props} />);

Box.defaultProps = {
  as: "div"
};

export default Box;

/**
 What do we want?

 css={{
    color: "primary", // colors by simple string from theme,
    font: "heading1", // fonts that compile to a group of properties
    padding: rslin(10, 20), // linear spacings, responsive sizes,
    "media-query": {
        color: "blue" // media queries available directly
    }
 }}

 rslin(10, 20)
 {
    _: 0,
    md: rslin(10, 20)
 }

 We want easy access to:
 - h1, h2, h3, h4, etc.
 - p
 - ul, li, ol
 - section etc.
 - A
 - <Ul>
 - <Li>

 sx!!!

 <ul sx={} />

 <li sx={{}}

 They should have some nice default styles, but easily overrideable.

 If we want to use native HTML elements, we must remember that then can't have default styles defined in any other way than global styles.


 NATYWNE KOMPONENTY CZY NIE?
 - na razie natywne!!! z sx. Potem możemy rozszerzać. Możemy zostawić Box i Text na razie (w sumie to samo tylko inny default "as" na "p", lol)
 - czyli co, wgrywamy theme-ui?

 ZALETY NIENATYWNYCH
 - możemy mieć kontrolę nad propsami i wtedy np. wiedzieć, że żaden komponent w środku jakiegoś komponentu nie zrobi position: fixed czy coś. Można to realnie zablokować :O ZAJEBIŚCIE.
 - zacznijmy od Box i Text.


 THINGS TO DO:
 - One big css() function that takes "our form of css" (with theme styles, fonts, responsive sizes) and compiles to emotion form. It should be wrapper around css from styled-system.
 - W całej appce posługujemy sie naszymi obiektami, dopiero na SAM KONIEC kompilujemy style do styli emotion.
 - Rozkmiń kolejnośc media query etc.

 **/
