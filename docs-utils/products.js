import {
  productPhotos2,
  productPhotos3,
  productPhotos4,
  productPhotos5
} from "../data/images";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sizes = ["XS", "S", "M", "L"];

const products = [
  {
    name: "Assymetric Tie Dress",
    price: {
      regular: "99",
      discount: "69",
      currency: {
        code: "EUR",
        symbol: "€"
      }
    },
    description: "ThemeLink-line Dresses",
    badges: [
      {
        label: "-30%",
        type: "discount"
      },
      {
        label: "Sustainability",
        type: "feature"
      }
    ],
    images: productPhotos2,
    href: "assymetric-tie-dress",
    variant: sizes[getRandomInt(0, 3)]
  },

  {
    name: "Long ThemeLink-line Jersey Dress",
    price: {
      regular: "99",
      discount: null,
      currency: {
        code: "EUR",
        symbol: "€"
      }
    },
    description: "Jersey Dresses",
    images: productPhotos3,
    href: "long-a-line-jersey-dress",
    variant: sizes[getRandomInt(0, 3)]
  },
  {
    name: "Bubble-shaped Jersey Dress Very Long Product Name",
    price: {
      regular: "129",
      discount: null,
      currency: {
        code: "EUR",
        symbol: "€"
      }
    },
    description: "Jersey Dresses",
    badges: [
      {
        label: "Sustainability",
        type: "feature"
      }
    ],
    images: productPhotos4,
    href: "bubble-shaped-jersey-dress",
    variant: sizes[getRandomInt(0, 3)]
  },
  {
    name: "Shaped ThemeLink-line Cotton Dress",
    price: {
      regular: "99",
      discount: "79",
      currency: {
        code: "EUR",
        symbol: "€"
      }
    },
    description: "Evening & Occasion Dresses Very Long Description",
    badges: [
      {
        label: "-20%",
        type: "discount"
      }
    ],
    images: productPhotos5,
    href: "shaped-a-line-cotton-dress",
    variant: sizes[getRandomInt(0, 3)]
  }
];

export default products;
