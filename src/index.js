import Image from "./core-main/Image/Image";
import ImageZoomable from "./core-main/Image/ImageZoomable";

import Color from "./core-main/Color";
import Font from "./core-main/Font";
import Layout from "./core-main/Layout";
import Ease from "./core-main/Ease";
import { RangeSet } from "responsive-helpers";

import Container from "./core-main/Container/Container";
import { Grid, GridItem } from "./core-main/Grid/Grid";

import ProductPhotos, { useProductPhotos } from "./core-main/ProductPhotos/ProductPhotos";

import SwipeableItemsContainer, { useSwipeableItemsContainer } from "./core-main/SwipeableItemsContainer/SwipeableItemsContainer";

import ImageMosaic, { useImageMosaic } from "./core-main/ImageMosaic/ImageMosaic";

import Dots from "./core-main/Dots/Dots";

import StickyColumn from "./core-main/StickyColumn/StickyColumn";

import MediaQuery from "./core-main/MediaQuery/MediaQuery";

import Overlay from "./core-main/Overlay/Overlay";

import Accordion from "./core-main/Accordion/Accordion";
import AccordionRaw from "./core-main/Accordion/AccordionRaw";
import ItemListAccordion from "./core-main/ItemListAccordion/ItemListAccordion";

import FiltersColumn from "./core-main/Filters/FiltersColumn/FiltersColumn";

import ButtonNaked from "./core-main/ButtonNaked/ButtonNaked";

const defaultSpacings = {
    s1: 10,
    s2: 20,
    s3: 30,
    s4: 40,
    s5: 50,
    s6: 70,
    s7: 100,
    s8: 150,
    s9: 220
};


const defaultColors = {
    white: new Color("white"),
    black: new Color("black"),
};

let Fonts = {};
let F = Fonts;

let Spacings = defaultSpacings;
let S = Spacings;

let Ranges = RangeSet.main;
let R = Ranges;

let Colors = defaultColors;
let C = Colors;

Layout.main = new Layout({
    colNumber: 24,
    container: "90vw",
    gutter: 10
});

let L = Layout.main;

function applyConfig(config) {
    if (config.fonts) {
        Fonts = config.fonts;
        F = Fonts;
    }

    if (config.colors) {
        Colors = config.colors;
        C = Colors;
    }

    if (config.spacings) {
        Spacings = config.spacings;
        S = Spacings;
    }

    if (config.ranges) {
        RangeSet.main = new RangeSet(config.ranges);
        Ranges = RangeSet.main;
        R = Ranges;
    }

    if (config.layout) {
        Layout.main = new Layout(config.layout);
        L = Layout.main;
    }
}

export {
    Image,
    ImageZoomable,

    Color,
    Font,
    Ease,

    Fonts, F, Spacings, S, Ranges, R, Colors, C, L,

    applyConfig,

    Container, Grid, GridItem,

    ProductPhotos,
    useProductPhotos,

    ImageMosaic,
    useImageMosaic,

    SwipeableItemsContainer, useSwipeableItemsContainer,

    Dots,

    StickyColumn,

    MediaQuery,

    Overlay,

    AccordionRaw,
    Accordion,

    ItemListAccordion,

    FiltersColumn,

    ButtonNaked
}
