/** @jsx jsx */
import SelectNative$ from "@commerce-ui/core/SelectNative";
import { jsx, splitSx } from "@commerce-ui/core";

import formStyles from "../form-styles";

const Index = props => {
  const [css, customSx] = splitSx(props.sx);

  return (
    <SelectNative$
      {...props}
      sx={{
        ...css,
        ...formStyles,
        $control: state => ({
          ...formStyles.$control(state),
          pr: "28px"
        })
      }}
    />
  );
};

export default Index;
