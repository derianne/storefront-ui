/** @jsx jsx */
import React, { useState, useLayoutEffect, useRef } from "react";
import { jsx, createElement, getElementSpec, splitSx } from "..";
import InputRaw$ from "../InputRaw";
import InputContainer from "../InputContainer";

function Input$(props) {
  let { onChange, ...restProps } = props;

  let [empty, setEmpty] = useState(true);

  if (props.value) {
    empty = props.value === "";
  }

  const onChangeEvent = e => {
    if (!e.target.value || e.target.value === "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <InputContainer
      {...props}
      empty={empty}
      label={props.label || props.placeholder}
    >
      <InputRaw$
        sx={{ width: "100%", height: "100%" }}
        onChange={onChangeEvent}
      />
    </InputContainer>
  );
}

export default Input$;
