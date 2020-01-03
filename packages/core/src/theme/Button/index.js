import Button$ from "@commerce-ui/core/Button2";
import Spinner from "../Spinner";

const Button = props => (
  <Button$
    {...props}
    css={[
      {
        // minWidth: "500px",
        height: "50px"
      },
      props.css
    ]}
    overrides={{
      foreground: ({ disabled }) => ({
        css: {
          pl: 3,
          pr: 3,
          pt: 2,
          pb: 2,
          overflow: "hidden",
          color: disabled ? "mono500" : "black",
          font: "body2",
          textAlign: "center"
        }
      }),
      background: ({ isHovered, disabled }) => ({
        css: {
          bg: disabled ? "mono300" : "mono200",
          opacity: isHovered ? 0.75 : 1,
          transition: "opacity .1s",
          borderRadius: 6
        }
      }),
      startEnhancer: {
        css: {
          mr: 2
        }
      },
      endEnhancer: {
        css: {
          ml: 2
        }
      },
      loader: {
        children: <Spinner />
      }
    }}
  />
);

export default Button;
