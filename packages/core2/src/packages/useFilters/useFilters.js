import React, { useState } from "react";

import {
  normalizeSelectValue,
  useSelectState_controlled
} from "../useSelectState";

const normalizeData = item => {
  const ret = {
    ...item
  };

  if (ret.type === "select") {
    ret.value = normalizeSelectValue(ret.options, ret.value, true);
  } else {
    ret.value = null; // TODO: do this
  }
  return ret;
};

const areEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

function getValuesObject(data) {
  let obj = {};
  data.forEach(item => {
    obj[item.id] = item.value;
  });

  return obj;
}

function useFilters({ data, onChange }) {
  const [internalData_, setInternalData] = useState(data);
  const [committedData_, setCommittedData] = useState(data);

  // internalData is normalized internalData_
  const internalData = internalData_.map(item => normalizeData(item));
  const committedData = committedData_.map(item => normalizeData(item));

  // const [values, setValues] = useState(getValuesObject(data));
  //
  // const normalizedValues = {};

  // data.forEach(filter => {
  //   if (filter.type === "select") {
  //     const controller = useSelectState_controlled({
  //       options: filter.options,
  //       allowEmpty: true,
  //       value: values[filter.id]
  //     });
  //
  //     normalizedValues[filter.id] = controller.valueObject.id;
  //   }
  //   else {
  //     normalizedValues[filter.id] = null;
  //   }
  // });

  const setValue = (id, newValue, isSoft = false) => {
    let newData = [];

    internalData.forEach(item => {
      if (item.id === id) {
        let newItem = {
          ...item,
          value: newValue
        };

        newData.push(newItem);
      } else {
        newData.push({
          ...item
        });
      }
    });

    setInternalData(newData);
    if (!isSoft) {
      setCommittedData(newData);
      onChange(internalData);
    }
  };

  let isAnyDirty = false;

  const filters = internalData.map((item, index) => {
    const isDirty = !areEqual(item.value, committedData[index].value);
    if (isDirty) {
      isAnyDirty = true;
    }

    return {
      ...item,
      selectProps: (item.type === "select" || item.type === "multiselect") && {
        options: item.options,
        allowEmpty: true,
        value: item.value === undefined ? null : item.value,
        onChange: newVal => setValue(item.id, newVal)
      },
      clearButtonProps: {
        onClick: () => {
          setValue(item.id, null);
        }
      },
      isDirty
    };
  });

  return {
    filters,
    setValue,
    commit: () => {
      setCommittedData(internalData_);
      onChange(internalData);
    },
    isDirty: isAnyDirty
  };
}

export default useFilters;
