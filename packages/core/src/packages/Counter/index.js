/** @jsx jsx */
import React, { useState, useRef } from "react";
import { getElementSpec, jsx, createElement, splitSx } from "../index";

import ButtonRaw2 from "../ButtonRaw2";
import InputRaw$ from "../InputRaw";

const defaults = {
  $buttonDecrease: {
    __type: ButtonRaw2,
    __children: "-"
  },
  $buttonIncrease: {
    __type: ButtonRaw2,
    __children: "+"
  },
  $root: ({ focused }) => ({
    position: "relative",
    display: "inline-flex",
    verticalAlign: "top",
    overflow: "hidden",
    flexDirection: "row"
  }),
  $input: ({}) => ({
    __type: InputRaw$,
    textAlign: "center"
  })
};

function useCounter(props = {}) {
  let { step = 1, initialValue, max = 999, selectOptionsAmount = 20 } = props;

  const [amount, setAmount] = useState(initialValue || step);
  const [inputValue, setInputValue] = useState(initialValue || step);

  const inputRef = useRef(null);

  const setValue = number => {
    let newVal = number;
    if (isNaN(newVal)) {
      newVal = 0;
    }

    newVal = Math.max(newVal, step);
    newVal = Math.min(newVal, max);

    // Check if multiple of step
    const rest = newVal % step;
    if (rest != 0) {
      newVal = newVal - rest;
    }

    setAmount(newVal);
    setInputValue(newVal);
  };

  const buttonIncrementProps = {
    onClick: () => {
      setValue(amount + step);
    }
  };

  const buttonDecrementProps = {
    onClick: () => {
      setValue(amount - step);
    }
  };

  const inputProps = {
    value: inputValue,
    onChange: e => {
      setInputValue(e.target.value);
    },
    onBlur: () => {
      setValue(parseInt(inputValue));
    },
    inputRef: inputRef
  };

  // select
  const selectOptions = [];
  for (let i = 1; i <= selectOptionsAmount; i++) {
    selectOptions.push(i * step);
  }

  const maxSelectAmount = selectOptionsAmount * step;
  const moreOption = `${maxSelectAmount}+`;
  selectOptions.push(moreOption);

  const selectProps = {
    options: selectOptions,
    value: amount > maxSelectAmount ? moreOption : amount,
    onChange: val => {
      if (val === moreOption) {
        inputRef.current.focus();
        console.log("...");
      } else {
        setValue(val);
      }
      // console.log('on change!', val);
    }
  };

  return {
    buttonIncrementProps,
    buttonDecrementProps,
    inputProps,
    selectProps,
    setValue
  };
}

function Counter$(props) {
  let { sx = {} } = props;

  const [focused, setFocused] = useState(false);

  const state = {
    focused
  };

  sx = typeof sx === "function" ? sx(state) : sx;
  const [css, customSx] = splitSx(sx);

  const rootCss =
    typeof customSx.$root === "function"
      ? customSx.$root(state)
      : customSx.$root;

  const onFocus = e => {
    setFocused(true);
  };

  const onBlur = e => {
    setFocused(false);
  };

  const buttonDecrease = createElement(
    getElementSpec(customSx.$buttonDecrease, defaults.$buttonDecrease, state, {
      onFocus,
      onBlur
    })
  );
  const buttonIncrease = createElement(
    getElementSpec(customSx.$buttonIncrease, defaults.$buttonIncrease, state, {
      onFocus,
      onBlur
    })
  );
  const input = createElement(
    getElementSpec(customSx.$input, defaults.$input, state),
    {
      type: "number",
      onFocus,
      onBlur
    }
  );

  return (
    <div sx={css}>
      <div sx={[defaults.$root(state), rootCss]}>
        {buttonDecrease}
        {input}
        {buttonIncrease}
      </div>
    </div>
  );
}

export default Counter$;
export { useCounter };
