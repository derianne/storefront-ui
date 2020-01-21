/** @jsx jsx */
import Counter$ from "@commerce-ui/core/Counter";
import { jsx, splitSx } from "@commerce-ui/core";
import { Button$ } from "@commerce-ui/core/Button2";

const Counter = props => {
  const [css, customSx] = splitSx(props.sx);

  return (
    <Counter$
      {...props}
      sx={{
        ...css,
        $root: ({ focused }) => ({
          border: focused ? "1px solid black" : "1px solid lightgrey"
        }),
        $buttonIncrease: {
          __type: Button$,
          width: "44px",
          height: "44px",
          $foreground: {
            fontSize: "20px",
            lineHeight: 1,
            textAlign: "center"
          }
        },
        $buttonDecrease: {
          __type: Button$,
          width: "44px",
          height: "44px",
          $foreground: {
            fontSize: "20px",
            lineHeight: 1,
            textAlign: "center"
          }
        },
        $input: {
          font: "body",
          width: "44px"
        }
      }}
    />
  );
};

export default Counter;
