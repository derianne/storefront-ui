/** @jsx jsx */
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import Box from "../Box";
import HorizontalStack from "../HorizontalStack";
import { jsx, createElement, getElementSpec, splitSx } from "..";
import InputRaw$ from "../InputRaw";

const defaults = {
  rootCss: ({ focused }) => ({
    position: "relative",
    display: "flex",
    verticalAlign: "top",
    overflow: "hidden",
    flexDirection: "row",
    cursor: "text"
  }),
  $input: ({}) => ({
    __type: InputRaw$,
    height: "100%",
    width: "100%"
  }),
  $leftEnhancersContainer: ({ leftEnhancer }) => ({
    __type: HorizontalStack,
    height: "100%",
    flexGrow: 0,
    flexShrink: 0,
    pointerEvents: "none",
    __children: leftEnhancer
  }),
  $rightEnhancersContainer: ({ rightEnhancer }) => ({
    __type: HorizontalStack,
    height: "100%",
    flexGrow: 0,
    flexShrink: 0,
    pointerEvents: "none",
    __children: rightEnhancer
  }),
  $controlContainer: ({ control, label, arrow, cursor }) => ({
    position: "relative",
    boxSizing: "border-box",
    height: "100%",
    flexGrow: 1,
    flexShrink: 1,
    display: "flex",
    alignItems: "center",
    cursor,
    // pointerEvents: "none",
    __children: (
      <>
        {label}
        {control}
        {arrow}
      </>
    )
  }),
  $label: ({ label, empty }) => ({
    __type: "span",
    position: "absolute",
    pointerEvents: "none",
    top: 0,
    left: 0,
    opacity: empty ? 0 : 1,
    __children: label
  }),
  $arrowContainer: ({ arrow }) => ({
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
    __children: arrow,
    __props: {
      key: "arrow"
    }
  }),
  $arrow: {
    __children: <>⌄</>
  }
};

function buildBox(config, override, styledBox) {
  config = { ...config }; // copy
  override = { ...override }; // copy

  let configAs = config.__as__;
  let configChildren = config.__children__;
  let configProps = config.__props__;
  delete config.__as__;
  delete config.__children__;
  delete config.__props__;

  let overrideAs = override.__as__;
  let overrideChildren = override.__children__;
  let overrideProps = override.__props__;
  delete override.__as__;
  delete override.__children__;
  delete override.__props__;

  const as = overrideAs || configAs;
  const children = overrideChildren || configChildren;
  const props = overrideProps || configProps;

  const Box__ = styledBox(as, {
    ...config,
    ...override
  });

  return ({ __state__, ...restProps }) => (
    <Box__ {...restProps} __state__={__state__}>
      {typeof children === "function"
        ? children(restProps, __state__)
        : children}
    </Box__>
  );
}

export function styledTest(config, styledBox) {
  let {
    sx,
    labelInside,
    label,
    controlContainer,
    control,
    leftEnhancersContainer,
    leftEnhancersGap,
    rightEnhancersContainer,
    rightEnhancersGap,
    leftIcon,
    rightIcon
  } = config;

  // Let's build label
  const Label = buildBox(
    {
      color: (p, s) => (p.isBlue ? "blue" : "red"),
      bg: "yellow",
      p: 20,
      __children__: (p, s) => s.label,
      __props__: {},
      __as__: "section"
    },
    label,
    styledBox
  );

  return props => {
    return <Label {...props} __state__={{ label: props.children }} />;
  };
}

export function styledInputContainer(config, styledBox) {
  let {
    sx,
    labelInside,
    label,
    controlContainer,
    control,
    leftEnhancersContainer,
    leftEnhancersGap,
    rightEnhancersContainer,
    rightEnhancersGap,
    leftIcon,
    rightIcon
  } = config;

  // Let's build label
  const Label = buildBox(
    {
      position: "absolute",
      pointerEvents: "none",
      top: 0,
      left: 0,
      opacity: (p, s) => (s.empty ? 0 : 1),
      __children__: (p, s) => s.label,
      __props__: {},
      __as__: "label"
    },
    label
  );

  return props => {
    return <Label {...props} __state__={state} />;
  };
}

function InputContainer$(props) {
  let {
    sx,
    onFocus,
    onBlur,
    onClick,
    autoFocus,
    controlRef,
    invalid,
    disabled,
    placeholder,
    leftEnhancer,
    rightEnhancer,
    label,
    children,
    forceFocused = false,
    rootRef,
    _ref,
    cursor = "default",
    empty = true,
    showArrow = false,
    ...inputProps
  } = props;

  let [focused, setFocused] = useState(false);

  focused = focused || forceFocused;

  // let [empty, setEmpty] = useState(true);
  //
  // if (props.value) {
  //     empty = props.value === "";
  // }

  const internalControlRef = useRef(null);
  controlRef = controlRef || internalControlRef;

  const state = {
    focused,
    invalid,
    disabled,
    empty,
    placeholder
  };

  sx = typeof sx === "function" ? sx(state) : sx;
  const [css, customSx] = splitSx(sx);

  if (customSx.$labelInside) {
    state.label = label || placeholder || "Label";
  }

  const rootCss =
    typeof customSx.$root === "function"
      ? customSx.$root(state)
      : customSx.$root;

  const controlRaw = React.Children.only(children);

  const controlCss =
    typeof customSx.$control === "function"
      ? customSx.$control(state)
      : customSx.$control;

  useEffect(() => {
    if (autoFocus && controlRef.current.focus) {
      controlRef.current.focus();
    }
  }, []);

  const control = React.cloneElement(controlRaw, {
    onFocus: e => {
      setFocused(true);
      if (onFocus) {
        onFocus(e);
      }
    },
    onBlur: e => {
      setFocused(false);
      if (onBlur) {
        onBlur(e);
      }
    },
    disabled,
    placeholder,
    ...inputProps,
    sx: {
      ...controlCss,
      ...controlRaw.props.sx
    },
    _ref: controlRef,
    noFocus: true
  });

  let inputContainer;
  let inputContainerState = {
    ...state,
    control
  };

  let arrowContainer;

  if (showArrow) {
    const arrow = createElement(
      getElementSpec(customSx.$arrow, defaults.$arrow, state)
    );

    arrowContainer = createElement(
      getElementSpec(customSx.$arrowContainer, defaults.$arrowContainer, {
        ...state,
        arrow
      })
    );
  }

  if (showArrow === "inline") {
    inputContainerState.arrow = arrowContainer;
    arrowContainer = null;
  }

  if (sx.$labelInside) {
    inputContainerState.label = createElement(
      getElementSpec(customSx.$label, defaults.$label, state)
    );
  }

  inputContainerState.cursor = cursor;

  inputContainer = createElement(
    getElementSpec(
      customSx.$controlContainer,
      {
        ...defaults.$controlContainer(inputContainerState),
        __type: sx.$labelInside ? "label" : "div"
      },
      inputContainerState
    )
  );

  leftEnhancer =
    typeof leftEnhancer === "function" ? leftEnhancer(state) : leftEnhancer;
  const leftEnhancersContainerSpec = getElementSpec(
    customSx.$leftEnhancersContainer,
    defaults.$leftEnhancersContainer,
    { ...state, leftEnhancer }
  );
  const leftEnhancerContainer =
    leftEnhancer && createElement(leftEnhancersContainerSpec);

  rightEnhancer =
    typeof rightEnhancer === "function" ? rightEnhancer(state) : rightEnhancer;

  const rightEnhancer2 = Array.isArray(rightEnhancer)
    ? rightEnhancer
    : rightEnhancer
    ? [rightEnhancer]
    : [];

  if (showArrow === "enhancer") {
    rightEnhancer2.unshift(arrowContainer);
  }

  const rightEnhancersContainerSpec = getElementSpec(
    customSx.$rightEnhancersContainer,
    defaults.$rightEnhancersContainer,
    { ...state, rightEnhancer: rightEnhancer2 }
  );
  const rightEnhancerContainer =
    rightEnhancer2.length > 0 && createElement(rightEnhancersContainerSpec);

  return (
    <Box
      sx={[defaults.rootCss(state), { cursor }, rootCss, css]}
      _ref={_ref || rootRef} // TODO: rootRef is legacy, can be removed later
      onClick={(...args) => {
        if (onClick) {
          onClick(...args);
        }
        // console.log('on open');
        controlRef.current.focus();
      }}
    >
      {leftEnhancerContainer}
      {inputContainer}
      {rightEnhancerContainer}
    </Box>
  );
}

export default InputContainer$;
