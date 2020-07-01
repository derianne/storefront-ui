import React, { useState, useEffect } from "react";

import Box from "@commerce-ui/core/Box";
import Button from "@commerce-ui/core/Button";

import { useOptionPicker } from "@commerce-ui/core/OptionPicker";

import Container from "@commerce-ui/core/Container";
import Grid from "@commerce-ui/core/Grid";
import HorizontalStack from "@commerce-ui/core/HorizontalStack";

import ButtonText from "@commerce-ui/core/ButtonText2";
import IconTick from "./icons/IconTick";
import IconCart from "./icons/IconCart";
import IconArrowDown from "./icons/IconArrowDown";

import MenuLayout from "@commerce-ui/core/MenuLayout";

import useScrollSegment from "@commerce-ui/core/useScrollSegment";
import useScrollDirection from "@commerce-ui/core/useScrollDirection";

import { useNotificationSystem } from "@commerce-ui/core/NotificationSystem";
import Dialog from "@commerce-ui/core/Dialog";

import ProductCard from "./ProductCard";

import ScrollableStack, {
  useScrollableStack
} from "@commerce-ui/core/ScrollableStack";

function Announcemenet(props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bg: "main",
        color: "white",
        font: "body2",
        height: 40
      }}
    >
      {props.children}
    </Box>
  );
}

function MyButton(props) {
  return (
    <ButtonText
      sx={{
        font: "body",
        color: "main"
      }}
      gap={"s3"}
      iconSize={20}
      {...props}
    />
  );
}

function SelectButton(props) {
  return <MyButton rightIcon={<IconArrowDown />} {...props} />;
}

function FiltersBar({ isStuck }) {
  const notificationSystem = useNotificationSystem();

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 50,
          bg: "white",
          borderBottom: t =>
            isStuck ? `1px solid ${t.colors.neutral}` : "none"
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Dialog
            width={["90vw", null, null, "50vw"]}
            anchoredTo={"window"}
            button={<SelectButton>Color</SelectButton>}
          >
            <Notification />
          </Dialog>

          <Box sx={{ width: 16 }} />
          <SelectButton>Size</SelectButton>
          <Box sx={{ width: 16 }} />
          <SelectButton>Category</SelectButton>
          <Box sx={{ width: 16 }} />
          <SelectButton>Price</SelectButton>
        </Box>

        <SelectButton
          onClick={() => {
            notificationSystem.show({
              content: ({ close }) => <Notification onClose={close} />,
              placement: "topRight",
              timeout: 5000
            });
          }}
        >
          Sort
        </SelectButton>
      </Box>
    </Container>
  );
}

function SmallMenu({ width = "auto", wrapWithContainer = false, ...props }) {
  const content = (
    <Box
      sx={{
        p: "s9",
        backgroundColor: "white",
        boxShadow: "0 0px 14px rgba(0, 0, 0, 0.15)"
      }}
    >
      <Grid cols={1} rowGap={"s5"}>
        <Box sx={{ font: "body" }}>First item</Box>
        <Box sx={{ font: "body" }}>Second item</Box>
        <Box sx={{ font: "body" }}>Third item</Box>
        <Box sx={{ font: "body" }}>Lorem ipsum dolor sit amet</Box>
      </Grid>
    </Box>
  );

  const rootStyles = {
    width,
    position: "relative"
  };

  if (wrapWithContainer) {
    return <Container sx={rootStyles}>{content}</Container>;
  }

  return <Box sx={rootStyles}>{content}</Box>;
}

function Notification({ width, height, onClose }) {
  return (
    <Box
      sx={{
        p: "s7",
        backgroundColor: "white",
        boxShadow: "0 0px 14px rgba(0, 0, 0, 0.15)",
        font: "body",
        width,
        height
      }}
    >
      Notification | <MyButton onClick={onClose}>Close</MyButton>
    </Box>
  );
}

function MenuBar(props) {
  return (
    <Box
      sx={{
        borderBottomColor: "neutral",
        borderBottomWidth: 1,
        borderBottomStyle: "solid"
      }}
    >
      {" "}
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 70,
            bg: "white",
            position: "relative"
          }}
        >
          <Box sx={{ width: 160, height: 16, border: "1px dotted black" }} />

          <Box
            sx={{
              position: "absolute",
              left: 0,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <MenuLayout.Dialog
              button={<MyButton>Link 1</MyButton>}
              offsetY={10}
            >
              <SmallMenu />
            </MenuLayout.Dialog>
            <Box sx={{ width: 16 }} />
            <MenuLayout.Dialog
              button={<MyButton>Link 2</MyButton>}
              offsetY={10}
            >
              <SmallMenu />
            </MenuLayout.Dialog>
            <Box sx={{ width: 16 }} />
            <MenuLayout.Dialog
              button={<MyButton>Link 3</MyButton>}
              anchoredTo={"window"}
            >
              <SmallMenu width={"100vw"} />
            </MenuLayout.Dialog>
            <Box sx={{ width: 16 }} />
            <MenuLayout.Dialog
              button={<MyButton>Link 4</MyButton>}
              anchoredTo={"window"}
            >
              <SmallMenu width={"100vw"} wrapWithContainer={true} />
            </MenuLayout.Dialog>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function TitleSection(props) {
  return (
    <Container sx={{ my: "s12" }}>
      <Box as={"h1"} sx={{ font: "heading", textAlign: "center" }}>
        {props.children}
      </Box>
    </Container>
  );
}

function ProductsGrid(props) {
  return (
    <Container sx={{ pb: "s12" }}>
      <Grid cols={3} rowGap={"s10"}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Grid>
    </Container>
  );
}

export const mango = () => {
  const direction = useScrollDirection();
  const isNotAtTop = useScrollSegment({
    from: 700
  });

  const menuOpen = !isNotAtTop || (isNotAtTop && !direction);

  const scrollableStack = useScrollableStack({ length: 8 });

  return (
    <MenuLayout
      contentAbove={<Announcemenet>Some example announcement</Announcemenet>}
      offset={70}
    >
      <MenuLayout.MenuBar takesSpace={false} open={menuOpen}>
        <MenuBar />
      </MenuLayout.MenuBar>

      <TitleSection>PLP Name</TitleSection>

      <MenuLayout.MenuBarSticky>
        {({ stuck }) => <FiltersBar isStuck={stuck} />}
      </MenuLayout.MenuBarSticky>

      <ProductsGrid />

      <TitleSection>Slider</TitleSection>

      <Container margin={[0, 0, "containerMargin"]}>
        <ScrollableStack
          itemsVisible={[1.5, 2.5, 4]}
          gap={30}
          previousButton={{
            hideOnTouch: true,
            button: <MyButton>Previous</MyButton>,
            offset: -30
          }}
          nextButton={<MyButton>Next</MyButton>}
          innerMargin={["5vw", null, 0]}
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ScrollableStack>
      </Container>

      <TitleSection>Slider with custom arrows</TitleSection>

      <Container margin={[0, 0, "containerMargin"]}>
        <Box sx={{ mb: "s5" }}>
          <MyButton {...scrollableStack.previousButtonProps}>Previous</MyButton>{" "}
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{" "}
          <MyButton {...scrollableStack.nextButtonProps}>Next</MyButton>
        </Box>

        <ScrollableStack
          itemsVisible={[1.5, 2.5, 4]}
          gap={30}
          innerMargin={["5vw", null, 0]}
          controller={scrollableStack}
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ScrollableStack>
      </Container>
    </MenuLayout>
  );
};

export default {
  title: "demo.menu"
};
