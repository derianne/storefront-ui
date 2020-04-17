import React, { useState } from "react";
import { jsx, rs } from "@commerce-ui/core";

import Box from "@commerce-ui/core/Box";
import { useTheme } from "@commerce-ui/core/Theme";
import MenuLayout from "@commerce-ui/core/MenuLayout";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const VeryLongContent = props => (
  <Box sx={{ m: [16, null, 50], maxWidth: 500 }}>
    {props.children}
    {[...Array(20)].map((e, i) => (
      <Box as={"p"} sx={{ mt: 20 }} key={i}>
        {LOREM}
      </Box>
    ))}
  </Box>
);

export const basic = () => {
  const [menu1Open, setMenu1Open] = useState(true);
  const [menu2Open, setMenu2Open] = useState(true);
  const [menu3Open, setMenu3Open] = useState(true);

  return (
    <MenuLayout offset={150}>
      <MenuLayout.MenuBar open={menu1Open}>
        <Box sx={{ bg: "lightblue", height: 50 }} />
      </MenuLayout.MenuBar>

      <MenuLayout.MenuBar open={menu2Open}>
        <Box sx={{ bg: "coral", height: 50 }} />
      </MenuLayout.MenuBar>

      <MenuLayout.MenuBar open={menu3Open}>
        <Box sx={{ bg: "antiquewhite", height: 50 }} />
      </MenuLayout.MenuBar>

      <VeryLongContent>
        {/*<Box sx={{position: "relative", border: "1px dotted black"}}>*/}
        {/*<Box sx={{transform: "translateY(-100%)"}}>*/}
        {/*<Box sx={{bg: "antiquewhite", height: 50}}>*/}
        {/*</Box>*/}
        {/*<Box sx={{position: "absolute", width: "100%", top: "100%", zIndex: -1}}>*/}
        {/*<Box sx={{transform: "translateY(-100%)"}}>*/}
        {/*<Box sx={{bg: "coral", height: 50}}>*/}
        {/*</Box>*/}
        {/*</Box>*/}
        {/*</Box>*/}
        {/*</Box>*/}
        {/*</Box>*/}
        <button onClick={() => setMenu1Open(!menu1Open)}>Menu 1 toggle</button>
        &nbsp;
        <button onClick={() => setMenu2Open(!menu2Open)}>Menu 2 toggle</button>
        &nbsp;
        <button onClick={() => setMenu3Open(!menu3Open)}>Menu 3 toggle</button>
        &nbsp;
        <button
          onClick={() => {
            setMenu2Open(!menu2Open);
            setMenu3Open(!menu3Open);
          }}
        >
          Toggle 2 & 3
        </button>
      </VeryLongContent>
    </MenuLayout>
  );
};

export default {
  title: "MenuLayout"
};
