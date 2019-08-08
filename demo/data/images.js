const images = {
  landscape1: {
    src: [
      {
        url: "/static/images/landscape1.jpg",
        w: 2844,
        h: 1600
      }
    ],
    alt: "landscape1.jpg"
  },
  landscape2: {
    src: [
      {
        url: "/static/images/landscape2.jpg",
        w: 2667,
        h: 1000
      }
    ],
    alt: "landscape1.jpg"
  },
  landscape3: {
    src: [
      {
        url: "/static/images/landscape3.jpg",
        w: 2667,
        h: 1000
      }
    ],
    alt: "landscape1.jpg"
  },
  landscape4: {
    src: [
      {
        url: "/static/images/landscape4.jpg",
        w: 2667,
        h: 1000
      }
    ],
    alt: "landscape1.jpg"
  },
  landscape5: {
    src: [
      {
        url: "/static/images/landscape5.jpg",
        w: 2667,
        h: 1000
      }
    ],
    alt: "landscape1.jpg"
  },
  categories: (() => {
    let photos = {};

    ["baby", "bath", "body", "face", "hair", "oral"].map(name => {
      photos[name] = {
        alt: name,
        src: [
          {
            url: `/static/images/categories/${name}.jpg`,
            w: 2667,
            h: 1000
          }
        ]
      };
    });

    return photos;
  })(),
  boxes: (() => {
    let photos = {};

    for (let i = 1; i <= 10; i++) {
      let name = `full_box_${i < 10 ? "0" : ""}${i}`;

      photos[name] = {
        alt: name,
        src: [
          {
            url: `/static/images/boxes/${name}.jpg`,
            w: 3613,
            h: 1400
          }
        ]
      };

      name = `half_box_${i < 10 ? "0" : ""}${i}`;

      photos[name] = {
        alt: name,
        src: [
          {
            url: `/static/images/boxes/${name}.jpg`,
            w: 1792,
            h: 1400
          }
        ]
      };

      name = `mobile_box_${i < 10 ? "0" : ""}${i}`;

      photos[name] = {
        alt: name,
        src: [
          {
            url: `/static/images/boxes/${name}.jpg`,
            w: 748,
            h: 1000
          }
        ]
      };
    }

    return photos;
  })(),
  products: [
    {
      src: [
        {
          url: "/static/images/Airless_Bottle_Mockup_1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Airless_Bottle_Mockup_1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Amber_Mist_Bottle_Mockup_1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Amber_Mist_Bottle_Mockup_1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Amber_Winchester_Bottle_Mockup_150ml_1-1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Amber_Winchester_Bottle_Mockup_150ml_1-1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Baby_Oil_Bottle_Mockup_Orange_1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Baby_Oil_Bottle_Mockup_Orange_1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Baby_Oil_Bottle_Mockup_blue_1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Baby_Oil_Bottle_Mockup_blue_1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Boston_Bottle_Mockup_50ml_1-1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Boston_Bottle_Mockup_50ml_1-1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Bottle_with_Handle_Mockup_Dark_1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Bottle_with_Handle_Mockup_Dark_1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Bottle_with_Handle_Mockup_Light_1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Bottle_with_Handle_Mockup_Light_1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Coffee_Bag_Mockup_1-1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Coffee_Bag_Mockup_1-1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Coffee_Bag_Mockup_1-2.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Coffee_Bag_Mockup_1-2.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Coffee_Bag_Mockup_1-3.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Coffee_Bag_Mockup_1-3.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Cosmetic_Bottle_Mockup_Wooden_Cap_1-1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Cosmetic_Bottle_Mockup_Wooden_Cap_1-1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/EcoPaper_Sachete_Mockup_1ok.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "EcoPaper_Sachete_Mockup_1ok.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Foam_Bottle_Mockup_1ok.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Foam_Bottle_Mockup_1ok.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Frosted_Jar_Wooden_Cap_1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Frosted_Jar_Wooden_Cap_1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Jar_Mockup_11.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Jar_Mockup_11.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Mayonnaise_Jar_Mockup_1ok.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Mayonnaise_Jar_Mockup_1ok.jpg"
    },
    {
      src: [
        {
          url: "/static/images/OldStyle_Mustard_Jar_Mockup_1ok.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "OldStyle_Mustard_Jar_Mockup_1ok.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Olive_Bottle_Mockup_1ok-1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Olive_Bottle_Mockup_1ok-1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Olives_Jar_Mockup_1-2.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Olives_Jar_Mockup_1-2.jpg"
    },
    {
      src: [
        {
          url: "/static/images/PET_Bottle_100ml_Amber_1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "PET_Bottle_100ml_Amber_1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Paper_Bag_Eco_Paper_Mockup_1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Paper_Bag_Eco_Paper_Mockup_1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Peanut_Butter_Mockup_1ok.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Peanut_Butter_Mockup_1ok.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Round_Pet_Bottle_Color_1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Round_Pet_Bottle_Color_1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Sachet_Mockup_k_1-6.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Sachet_Mockup_k_1-6.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Spaghetti_Mockup_1-1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Spaghetti_Mockup_1-1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Tomato_Pasta_Jar_Mockup_1.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Tomato_Pasta_Jar_Mockup_1.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Tomato_Sauce_Bottle_Mockup_1oka.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Tomato_Sauce_Bottle_Mockup_1oka.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Virgin_Oil_Can_Mockup_1ok.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Virgin_Oil_Can_Mockup_1ok.jpg"
    },
    {
      src: [
        {
          url: "/static/images/Weck_Jar_Mockup_1_ok.jpg",
          w: 1200,
          h: 1600
        }
      ],
      alt: "Weck_Jar_Mockup_1_ok.jpg"
    }
  ]
};

export default images;
