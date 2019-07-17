/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useTheme } from "storefront-ui/Theme";

import { L } from "storefront-ui/Config";

import IconHistory from "./outline-history-24px.svg";
import IconGo from "./outline-call_made-24px.svg";

const SearchListItem = ({ focused, item, icon }) => {
  const theme = useTheme();

  return (
    <div
      css={css`
        background-color: ${focused ? "lightgrey" : "transparent"};
        ${L.margin.css("padding-left")}
        ${L.margin.css("padding-right")}
          height: 40px;
        display: flex;
        align-items: center;
        ${theme.fonts.body1.css}
        &:hover {
          background-color: lightgrey;
        }
        cursor: pointer;
        svg {
          margin-right: 0.5em;
        }
      `}
    >
      {icon === "history" && <IconHistory />}
      {icon === "go" && <IconGo />}
      {item.name}
    </div>
  );
};

export { SearchListItem };
