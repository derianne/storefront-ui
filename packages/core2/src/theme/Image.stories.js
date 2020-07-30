import React from "react";

import Image from "@commerce-ui/core/Image2";
import Box from "@commerce-ui/core/Box";

import StoryWrapper from "@commerce-ui/core/StoryWrapper";

import { catImage } from "./images";

export const basic = () => (
  <Box sx={{ maxWidth: "800px" }}>
    <StoryWrapper
      stories={[
        {
          name: "Standard, natural aspect ratio (default)",
          component: <Image image={catImage} />
        },
        {
          name:
            "Alternative alternative aspectRatio (portrait), defined in theme",
          component: <Image image={catImage} aspectRatio={"portrait"} />
        },
        {
          name: "Image with size set explicitly (objectFit: cover (default))",
          component: (
            <Box sx={{ height: 200 }} fitW fitH>
              <Image image={catImage} />
            </Box>
          )
        },
        {
          name: "Image with size set explicitly (objectFit: contain)",
          component: (
            <Box sx={{ border: "1px solid black", height: 800 }} fitW fitH>
              <Image image={catImage} objectFit={"contain"} />
            </Box>
          )
        },
        {
          // IMPORTANT!!! Even low images have this inside-element that makes padding-bottom and height. It allows for image to show up even without explicitly setting height. HOWEVER, in flex containers it  might make troubles. There should be a flag to explicitly remove this element (for contain / cover modes)
          name:
            "Image with size set explicitly very vertical (objectFit: contain), low image",
          component: (
            <Box sx={{ border: "1px solid black", height: 200 }} fitW fitH>
              <Image image={catImage} objectFit={"contain"} />
            </Box>
          )
        },
        {
          name:
            "Image with size set explicitly (objectFit: contain + objectPosition)",
          component: (
            <Box sx={{ border: "1px solid black", height: 800 }} fitW fitH>
              <Image
                image={catImage}
                objectFit={"contain"}
                objectPosition={"left top"}
              />
            </Box>
          )
        },
        {
          name: "Responsive aspectRatio (portrait for xs, natural for lg)",
          component: (
            <Image
              image={catImage}
              aspectRatio={["portrait", null, "natural"]}
            />
          )
        },
        {
          name: "Responsive aspectRatio mode and position",
          component: (
            <Box
              sx={{ border: "1px solid black", height: [400, null, 800] }}
              fitW
              fitH
            >
              <Image
                image={catImage}
                aspectRatio={["portrait", null, "natural"]}
                objectFit={["cover", null, "contain"]}
                objectPosition={["top left", null, "bottom right"]}
              />
            </Box>
          )
        },
        {
          name: "Add a Box on the image",
          component: (
            <Image image={catImage}>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bg: "rgba(255, 0, 0, 0.5)"
                }}
              />
            </Image>
          )
        },
        {
          name: "Explicit aspect ratio",
          component: (
            <Image image={catImage} aspectRatio={[5, null, 4, null, 3]} />
          )
        },
        {
          name: "Empty image",
          component: <Image image={{}} backgroundColor={"antiquewhite"} />
        },
        {
          name: "Empty image (with aspect ratio)",
          component: (
            <Image
              image={{}}
              aspectRatio={[5, null, 4, null, 3]}
              backgroundColor={"antiquewhite"}
            />
          )
        },
        {
          name: "No padding-bottom",
          component: (
            <Box sx={{ border: "1px solid black", height: 800 }} fitW fitH>
              <Image
                image={catImage}
                objectFit={"contain"}
                ignoreBottomPadding
              />
            </Box>
          )
        }
      ]}
    />
  </Box>
);

export default {
  title: "approved.Image"
};
