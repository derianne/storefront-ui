import { ButtonText$ } from "@commerce-ui/core/Button2";
import Spinner from "../../Spinner";
import { jsx, splitSx } from "@commerce-ui/core";
import IconArrowDown from "../../svg/keyboard_arrow_down.svg";

const Button = props => {
  const [css, customSx] = splitSx(props.sx);

  return (
    <ButtonText$
      {...props}
      sx={{
        minHeight: "50px",
        minWidth: "200px",
        ":hover": {
          borderColor: "black"
        },
        transition: "all .1s",

        ...css,

        // minWidth: "500px",
        $foreground: ({ disabled }) => ({
          pl: 3,
          pr: 2,
          pt: 2,
          pb: 2,
          font: "label",
          color: disabled ? "mono300" : "white",
          justifyContent: "center",
          lineHeight: 1,
          textAlign: "center"
        }),
        $background: ({ isHovered, disabled }) => ({
          bg: disabled ? "mono700" : "black",
          opacity: isHovered ? 0.97 : 1,
          transition: "opacity .1s",
          borderRadius: "4px"
        }),
        $loader: {
          __children: <Spinner />
        },
        $startEnhancerContainer: {
          color: "white",
          mr: 2
        },
        $endEnhancerContainer: {
          ml: 2
          // display: "flex",
          // flexAlign: "center",
          // alignItems: "center",
          // color: "white"
        }
      }}
    />
  );
};

export default Button;
