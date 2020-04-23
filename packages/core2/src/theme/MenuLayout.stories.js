import React, { useState, useRef } from "react";

import Box from "@commerce-ui/core/Box";
import { useTheme } from "@commerce-ui/core/Theme";
import MenuLayout from "@commerce-ui/core/MenuLayout";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const VeryLongContent = props => (
  <Box sx={{ p: [16, null, 32], maxWidth: 700, bg: "#f1f1f1" }}>
    {props.children}
    {[...Array(10)].map((e, i) => (
      <Box as={"p"} sx={{ mt: 20 }} key={i}>
        {LOREM}
      </Box>
    ))}
  </Box>
);

const MenuBar = ({ color, textRef }) => (
  <Box
    sx={{
      position: "relative",
      bg: color,
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      opacity: 0.5
    }}
  >
    <Box as={"p"} ref={textRef}>
      Menu bar content lorem ipsum dolro sit amet
    </Box>
  </Box>
);

export const basic = () => {
  const [menu1Open, setMenu1Open] = useState(true);
  const [menu2Open, setMenu2Open] = useState(true);
  const [menu3Open, setMenu3Open] = useState(true);
  const [menu4Open, setMenu4Open] = useState(true);

  const [layer1Open, setLayer1Open] = useState(false);
  const textRef = useRef(null);

  const contentWithButtons = (
    <VeryLongContent>
      <button onClick={() => setMenu1Open(!menu1Open)}>Menu 1 toggle</button>
      &nbsp;
      <button onClick={() => setMenu2Open(!menu2Open)}>Menu 2 toggle</button>
      &nbsp;
      <button onClick={() => setMenu3Open(!menu3Open)}>Menu 3 toggle</button>
      &nbsp;
      <button onClick={() => setMenu4Open(!menu4Open)}>Menu 4 toggle</button>
      &nbsp;
      <button
        onClick={() => {
          setMenu2Open(!menu2Open);
          setMenu3Open(!menu3Open);
        }}
      >
        Toggle 2 & 3
      </button>
      &nbsp;
      <button onClick={() => setLayer1Open(!layer1Open)}>Toggle layer 1</button>
    </VeryLongContent>
  );

  return (
    <MenuLayout
      offset={0}
      contentAbove={
        <Box sx={{ bg: "black", color: "white", p: 40, width: "100%" }}>
          {LOREM} {LOREM} {LOREM}
        </Box>
      }
    >
      <MenuLayout.MenuBar open={menu1Open} takesSpace={true}>
        <MenuBar color={"lightblue"} textRef={textRef} />

        <MenuLayout.Layer
          open={layer1Open}
          posX={"right"}
          offsetY={10}
          offsetX={20}
          anchoredTo={textRef}
        >
          <Box sx={{ p: 40, bg: "red", width: "100%" }}>Dupa</Box>
        </MenuLayout.Layer>
      </MenuLayout.MenuBar>

      <MenuLayout.MenuBar open={menu2Open} takesSpace={false}>
        <MenuBar color={"coral"} />
      </MenuLayout.MenuBar>

      <MenuLayout.MenuBar open={menu3Open} takesSpace={false}>
        <MenuBar color={"antiquewhite"} />
      </MenuLayout.MenuBar>

      {contentWithButtons}

      <MenuLayout.MenuBarSticky open={menu4Open}>
        <MenuBar color={"royalblue"} />
      </MenuLayout.MenuBarSticky>

      {contentWithButtons}

      <Box sx={{ position: "relative", transform: "translateY(-100%)" }}>
        <MenuBar color={"red"} />
      </Box>
      <br />
      <br />

      {contentWithButtons}
    </MenuLayout>
  );
};

export default {
  title: "MenuLayout"
};
