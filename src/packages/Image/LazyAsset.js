import React from "react";
import PropTypes from "prop-types";
import VisibilitySensor from "react-visibility-sensor";

import { RangeMap } from "responsive-helpers";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

/**
 * What does Image do?
 * 1. Supports lazy loading out of the box (not crucial in ecommerce in a lot of cases)
 * 2. Seamless video integration (with lazyloading built-in too) -> with taking into account image fallback (play button, low battery, etc.)
 * 3. Images take up all the space they need with modes into account (cover / contain / aspect-ratio).
 * 4. IE fallbacks
 * 5. Easy changing of modes in responsiveness (full CSS, like <picture tag />).
 * 6. Background color / background image placeholder -> easy.
 *
 *
 *
 *
 * TODO: "mode" support for video in Edge/IE and for images for IE.
 * TODO: "video" already loaded (if already loaded in browser)
 * TODO: "media" should support video. Right now video it's not supported for "media" prop.
 * TODO: onLoad callbacks
 * TODO: contain mode should work well with placeholders, extraContent and background (lower priority)
 */
const styles = {
  LazyAsset: {
    position: "relative"
  },
  LazyAsset__Wrapper: {
    position: "relative",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  LazyAsset__WrapperOverflow: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    overflow: "hidden"
  },
  img: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectPosition: "50% 50%",

    // IE fallback
    backgroundPosition: "center center",
    backgroundSize: "cover"
  }
};

class LazyAsset extends React.Component {
  constructor(props) {
    super(props);
    // this.state.status explained
    // 0 - props.load = false. There was actually nothing done with image so far
    // 1 - props.load = true. Image is set to be downloaded but is not loading yet (when props.loadWhenInViewPort = true and image is not in viewport)
    // 2 - props.load = true. Image is being downloaded (srcset for <img> is set).
    // 3 - props.load = true. Image is downloaded.
    this.state = {
      status: props.load === true ? 3 : 0,
      visible: false
    };

    this.image = React.createRef();
    this.wrapper = React.createRef();
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);

    this.randomId = Math.random()
      .toString(36)
      .substr(2, 9);
  }

  _extractMediaFromInputParameters() {
    if (this.props.media) {
      // We check if mode, images are set locally. If not, we take it from main options. If not there -> error.
      this.props.media.forEach(entry => {
        if (!entry.images && !this.props.images) {
          throw new Error('LazyAsset doesnt have "images" given');
        } else if (!entry.images) {
          entry.images = this.props.images;
        }

        if (!entry.mode && !this.props.mode) {
          throw new Error('LazyAsset doesnt have "mode" given');
        } else if (!entry.mode) {
          entry.mode = this.props.mode;
        }

        if (!entry.media) {
          throw new Error(
            'LazyAsset doesnt have "media" given in "media" array'
          );
        }
      });

      return this.props.media;
    } else {
      return [
        {
          media: "screen",
          images: this.props.images,
          mode: this.props.mode
        }
      ];
    }
  }

  _getSrcset(images) {
    let result = "";
    images.forEach(image => {
      result += `${image.url} ${image.w}w, `;
    });
    return result;
  }

  _getSrcset__(variant) {
    let result = "";
    this.findVariant(variant).srcset.forEach(img => {
      result += `${img.url} ${img.w}w, `;
    });
    return result;
  }

  handleImageLoaded() {
    this.setState({
      status: 3
    });
  }

  handleVisibilityChange(visible) {
    this.setState({
      visible: visible,
      status:
        this.state.status === 1 &&
        visible &&
        this.wrapper.current.clientWidth > 0
          ? 2
          : this.state.status
    });
  }

  componentDidUpdate(prevProps) {
    /* handle setting load*/
    if (this.props.load && this.state.status === 0) {
      this.setState({
        status:
          (this.state.visible || !this.props.loadWhenInViewport) &&
          this.wrapper.current.clientWidth > 0
            ? 2
            : 1
      });
    }
  }

  componentDidMount() {
    // If image is loaded before onLoad event makes it to be registered
    if (
      this.image.current &&
      this.image.current.complete &&
      this.image.current.naturalWidth > 0 &&
      this.state.status === 2
    ) {
      this.setState({
        status: 3
      });
    }
  }

  findVariant(variant) {
    console.log("HEJ");
    return this.props.image.variants.find(v => v.name === variant);
  }

  render() {
    // let variant = this.props.variant;
    // let mode = this.props.mode;
    // let isPicture = false;
    //
    // if (typeof variant === "object" || typeof mode === "object") {
    //     isPicture = true;
    //
    //     variant = new RangeMap(this.props.variant);
    //     mode = new RangeMap(this.props.mode);
    //
    //     let rangeMap = variant.crosssect(mode).forEach((value, range) => {
    //         console.log(range, value.val1, value.val2);
    //     });
    // }
    //

    let isPicture = !!this.props._responsiveProps;

    let rangeMap = new RangeMap(
      this.props._responsiveProps || {
        variant: this.props.variant,
        mode: this.props.mode,
        backgroundPosition: this.props.backgroundPosition
      }
    );

    // Defaults for _responsive
    rangeMap.forEach((val, range) => {
      val.variant = val.variant || "natural";
      val.mode = val.mode || "natural";
      val.backgroundPosition = val.backgroundPosition || "center";
    });

    const wrapperStyles__ = `
                position: relative;
                width: 100%;
                backgroundSize: cover;
                backgroundRepeat: no-repeat;
            
                ${rangeMap.css(
                  ({ variant, mode }) => `
                    background-color: ${
                      mode !== "contain" && this.props.backgroundColor
                        ? this.props.backgroundColor
                        : "transparent"
                    };
                    background-image: ${
                      mode !== "contain" && this.props.placeholder
                        ? this.props.placeholder
                        : "none"
                    };
                    padding-bottom: ${
                      mode === "natural"
                        ? `${(1 / this.findVariant(variant).aspectRatio) *
                            100}%`
                        : "0"
                    };
                    height: ${mode === "natural" ? "auto" : "100%"};
                `
                )}
          `;

    console.log(wrapperStyles__);

    const imageStyles__ = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;,
                objectPosition: 50% 50%;
        
                backgroundPosition: center center; /* IE fallback */
                backgroundSize: cover;
                
                ${rangeMap.css(
                  ({ variant, mode, backgroundPosition }) => `
                    object-fit: ${mode === "contain" ? "contain" : "cover"};
                    object-position: ${backgroundPosition};
                `
                )}`;

    console.log(this.props.image);

    let imgTag__;

    if (isPicture) {
      let sources = [];
      rangeMap.forEach((val, range) =>
        sources.push(
          <source
            srcSet={
              this.state.status >= 2
                ? this._getSrcset__(this.props.variant)
                : ""
            }
            sizes={this.props.sizes}
            media={range.mediaQuery}
          />
        )
      );

      imgTag__ = (
        <picture>
          {sources}
          {rangeMap.forEach((val, range) => (
            <source
              srcSet={
                this.state.status >= 2
                  ? this._getSrcset__(this.props.variant)
                  : ""
              }
              sizes={this.props.sizes}
              media={range.mediaQuery}
            />
          ))}

          <img
            alt={this.props.alt}
            src={this.props.fallbackSrc}
            css={css`
              ${imageStyles__}
            `}
            ref={this.image}
            onLoad={this.handleImageLoaded}
            draggable={this.props.draggable}
          />
        </picture>
      );
    } else {
      console.log(this._getSrcset__(this.props.variant));
      imgTag__ = (
        <img
          ref={this.image}
          css={css`
            ${imageStyles__}
          `}
          sizes={this.props.sizes}
          alt={this.props.alt}
          srcSet={
            this.state.status >= 2 ? this._getSrcset__(this.props.variant) : ""
          }
          onLoad={this.handleImageLoaded}
          draggable={this.props.draggable}
        />
      );
    }

    // TODO: to be continued!!!

    // different modes for different resolutions!
    // let styleTag = null;
    // let imgTag = null;
    // let wrapperStyles = {};
    // let imgStyles = {};
    //
    // // Extra styles like placeholder or backgroundColor
    //
    // // In case media parameter is given
    // if (this.props.media) {
    //     let media = this._extractMediaFromInputParameters();
    //
    //     let responsiveStyle = "";
    //     media.forEach(entry => {
    //         responsiveStyle += `@media ${entry.media} {
    //         ${`.w-${this.randomId} {`}
    //             ${
    //             entry.mode === "natural"
    //                 ? `padding-bottom: ${(entry.images[0].h /
    //                 entry.images[0].w) *
    //                 100}%;`
    //                 : "padding-bottom: initial;"
    //             }
    //             ${
    //             entry.mode === "natural"
    //                 ? "height: auto;"
    //                 : "height: 100%;"
    //             }
    //
    //             ${
    //             entry.mode !== "contain" && this.props.backgroundColor
    //                 ? `background-color: ${this.props.backgroundColor}`
    //                 : "background-color: transparent;"
    //             }
    //             ${
    //             entry.mode !== "contain" && this.props.placeholder
    //                 ? `background-image: ${this.props.placeholder}`
    //                 : `background-image: none`
    //             }
    //
    //         }
    //         ${`.i-${this.randomId}`} {
    //             ${
    //             entry.mode === "contain"
    //                 ? "object-fit: contain;"
    //                 : "object-fit: cover"
    //             }
    //             ${
    //             entry.backgroundPosition
    //                 ? `object-position: ${entry.backgroundPosition}`
    //                 : ""
    //             };
    //         }
    //     }
    //     `;
    //     });
    //
    //     styleTag = (
    //         <style dangerouslySetInnerHTML={{__html: responsiveStyle}}/>
    //     );
    //
    //     imgTag = (
    //         <picture>
    //             {[...media].reverse().map(entry => (
    //                 <source
    //                     srcSet={
    //                         this.state.status >= 2 ? this._getSrcset(entry.images) : ""
    //                     }
    //                     sizes={this.props.sizes}
    //                     media={entry.media}
    //                 />
    //             ))}
    //             <img
    //                 alt={this.props.alt}
    //                 src={this.props.fallbackSrc}
    //                 className={`i-${this.randomId}`}
    //                 style={styles.img}
    //                 ref={this.image}
    //                 onLoad={this.handleImageLoaded}
    //                 draggable={this.props.draggable}
    //             />
    //         </picture>
    //     );
    // } else {
    //     if (this.props.backgroundColor && this.props.mode !== "contain") {
    //         wrapperStyles.backgroundColor = this.props.backgroundColor;
    //     }
    //
    //     if (this.props.placeholder && this.props.mode !== "contain") {
    //         wrapperStyles.backgroundImage = `url(${this.props.placeholder})`;
    //     }
    //
    //     let aspectRatio;
    //
    //     if (this.props.images) {
    //         aspectRatio = this.props.images[0].h / this.props.images[0].w;
    //     } else if (this.props.videos) {
    //         aspectRatio = this.props.videos[0].h / this.props.videos[0].w;
    //     }
    //
    //     if (this.props.mode === "natural") {
    //         wrapperStyles.paddingBottom = `${aspectRatio * 100}%`;
    //         wrapperStyles.height = "auto";
    //         imgStyles.objectFit = "cover";
    //     } else if (this.props.mode === "cover") {
    //         wrapperStyles.height = "100%";
    //         imgStyles.objectFit = "cover";
    //     } else if (this.props.mode === "contain") {
    //         wrapperStyles.height = "100%";
    //         imgStyles.objectFit = "contain";
    //     }
    //
    //     imgStyles.objectPosition = this.props.backgroundPosition;
    //
    //     if (this.props.images) {
    //         imgTag = (
    //             <img
    //                 ref={this.image}
    //                 style={{...styles.img, ...imgStyles}}
    //                 sizes={this.props.sizes}
    //                 alt={this.props.alt}
    //                 srcSet={
    //                     this.state.status >= 2 ? this._getSrcset(this.props.images) : ""
    //                 }
    //                 onLoad={this.handleImageLoaded}
    //                 className={`i-${this.randomId}`}
    //                 draggable={this.props.draggable}
    //             />
    //         );
    //     } else if (this.props.videos) {
    //         imgTag = (
    //             <video
    //                 ref={this.image}
    //                 style={{...styles.img, ...imgStyles}}
    //                 autoPlay
    //                 muted
    //                 loop
    //                 playsInline
    //                 onCanPlay={this.handleImageLoaded}
    //                 className={`i-${this.randomId}`}
    //                 draggable={this.props.draggable}
    //                 title={this.props.alt}
    //             >
    //                 {this.state.status >= 2 &&
    //                 this.props.videos.map(video => (
    //                     <source key={video.url} type={video.type} src={video.url}/>
    //                 ))}
    //             </video>
    //         );
    //     }
    // }

    // const content = (
    //     <div
    //         ref={this.wrapper}
    //         className={`LazyAsset__Wrapper w-${this.randomId}`}
    //         style={{...styles.LazyAsset__Wrapper, ...wrapperStyles}}
    //     >
    //         <div
    //             className={"LazyAsset__WrapperOverflow"}
    //             style={{
    //                 ...styles.LazyAsset__WrapperOverflow,
    //                 transition: `opacity ${this.props.animationTime}s`,
    //                 opacity: this.state.status === 3 ? 1 : 0
    //             }}
    //         >
    //             {imgTag}
    //         </div>
    //         {styleTag}
    //         {this.props.children}
    //     </div>
    // );

    const content = (
      <div
        ref={this.wrapper}
        css={css`
          ${wrapperStyles__}
        `}
      >
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            transition: opacity ${this.props.animationTime}s;
            opacity: ${this.state.status === 3 ? 1 : 0};
          `}
        >
          {imgTag__}
        </div>
        {this.props.children}
      </div>
    );

    return (
      <div
        css={css`
          position: relative;
        `}
        style={this.props.style}
      >
        {this.props.loadWhenInViewport && (
          <VisibilitySensor
            onChange={this.handleVisibilityChange}
            partialVisibility={true}
            offset={this.props.offset}
          >
            {content}
          </VisibilitySensor>
        )}

        {!this.props.loadWhenInViewport && content}
      </div>
    );
  }
}

LazyAsset.propTypes = {
  mode: PropTypes.oneOf(["cover", "natural", "contain"]),
  images: PropTypes.arrayOf(PropTypes.object),
  videos: PropTypes.arrayOf(PropTypes.object),
  media: PropTypes.arrayOf(PropTypes.object),

  fallbackSrc: PropTypes.string,

  className: PropTypes.string,
  style: PropTypes.object,

  animationTime: PropTypes.number,
  placeholder: PropTypes.string,
  loadWhenInViewport: PropTypes.bool,
  sizes: PropTypes.string,
  alt: PropTypes.string,
  load: PropTypes.bool,
  backgroundColor: PropTypes.string,
  offset: PropTypes.object,
  draggable: PropTypes.bool,
  backgroundPosition: PropTypes.string
};

LazyAsset.defaultProps = {
  className: "",
  style: {},
  animationTime: 1,
  loadWhenInViewport: false,
  sizes: "1px",
  images: null,
  videos: null,
  load: false,
  backgroundColor: "lightgrey",
  backgroundPosition: "center",
  offset: { top: 0, bottom: 0 },
  draggable: false,
  _responsiveProps: null
};

export default LazyAsset;
