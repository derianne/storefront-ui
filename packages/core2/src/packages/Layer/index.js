/** @jsx jsx */
import React, { useState, useEffect, useRef } from "react";
import { Layer, TetherBehavior } from "../base/layer/index.js";
import {
  fromPopperPlacement,
  getEndPosition,
  getPopoverMarginStyles,
  getStartPosition
} from "../base/popover/utils";
import {
  createElement,
  getElementSpec,
  responsiveValueCurrent,
  jsx
} from "../index";
import Box from "../Box";

const mountNode = () => {
  if (typeof document !== "undefined") {
    return document.getElementById("__layers__");
  }
};

const centered = ({
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  animationTime,
  animationEase,
  backgroundColor,
  shouldShow
}) => ({
  anchored: false,
  background: {
    backgroundColor,
    transition: `opacity ${animationTime}s ${animationEase}`,
    opacity: shouldShow ? 1 : 0
  },
  contentWrapper: {
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight
  },
  content: {
    transition: `all ${animationTime}s ${animationEase}`,
    opacity: shouldShow ? 1 : 0
  }
});

const slide = ({
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  animationTime,
  animationEase,
  backgroundColor,
  axis,
  fromStart,
  shouldShow
}) => ({
  anchored: false,
  background: {
    backgroundColor,
    transition: `opacity ${animationTime}s ${animationEase}`,
    opacity: shouldShow ? 1 : 0
  },
  contentWrapper: {
    position: "absolute",
    top: (axis === "Y" && fromStart) || axis === "X" ? 0 : "auto",
    bottom: axis === "Y" && !fromStart ? 0 : "auto",
    left: (axis === "X" && fromStart) || axis === "Y" ? 0 : "auto",
    right: axis === "X" && !fromStart ? 0 : "auto",
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight
  },
  content: {
    transition: `all ${animationTime}s ${animationEase}`,
    transform: shouldShow
      ? "none"
      : `translate${axis}(${fromStart ? "-" : ""}100%)`,
    opacity: shouldShow ? 1 : 0
  }
});

const popoverRootDefault = ({
  children,
  isOpen,
  isVisible,
  popoverOffset,
  showArrow,
  placement,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight
}) => ({
  boxSizing: "border-box",
  position: "absolute",
  top: 0,
  left: 0,
  transition: isVisible ? "all .1s ease-out" : "none",
  opacity: isVisible && isOpen ? 1 : 0,
  transform:
    isVisible && isOpen
      ? getEndPosition(popoverOffset)
      : getStartPosition(popoverOffset, placement, showArrow),
  ...getPopoverMarginStyles(showArrow, placement),
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  __children: children
});

function Layer$(props) {
  const [isMounted, setMounted] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isLayerMounted, setLayerMounted] = useState(false);

  let { onClose, isOpen, anchoredTo, sx = {} } = props;

  let {
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    animationTime,
    animationEase,
    backgroundColor,
    root = {},
    placement
  } = Object.assign({ ...sx }, props); // backward compatibility. Now props are recommended.

  let closeTimeout = 0;

  const animateStartTimer = useRef(null);
  const animateOutTimer = useRef(null);

  // Popover
  const popperRef = useRef(null);
  const arrowRef = useRef(null);
  const [arrowOffset, setArrowOffset] = useState({ left: 0, top: 0 });
  const [popoverPlacement, setPopoverPlacement] = useState("bottomLeft");
  const [popoverOffset, setPopoverOffset] = useState({ left: 0, top: 0 });

  const clearTimers = () => {
    clearTimeout(animateOutTimer.current);
    cancelAnimationFrame(animateStartTimer.current);
  };

  const show = () => {
    clearTimers();
    animateStartTimer.current = requestAnimationFrame(() => {
      setVisible(true);
    });
  };

  const hide = () => {
    animateOutTimer.current = setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  const shouldShow = isVisible && isOpen;
  anchoredTo = responsiveValueCurrent(anchoredTo) || "window";

  const isAnchored = anchoredTo && anchoredTo !== "window";
  const currentPlacement = responsiveValueCurrent(placement);

  const current = {
    isAnchored,
    anchoredTo,
    placement: currentPlacement,
    width:
      typeof width === "function"
        ? width({
            anchorRect:
              (anchoredTo.current &&
                anchoredTo.current.getBoundingClientRect()) ||
              new DOMRect()
          })
        : width || "auto",
    height:
      typeof height === "function"
        ? height({
            anchorRect:
              (anchoredTo.current &&
                anchoredTo.current.getBoundingClientRect()) ||
              new DOMRect()
          })
        : height || "auto",
    minWidth: minWidth || 0,
    minHeight: minHeight || 0,
    maxWidth: maxWidth || "10000px",
    maxHeight: maxHeight || "10000px",
    animationTime: animationTime || 0.3,
    animationEase: animationEase || "cubic-bezier(0.19, 1, 0.22, 1)",
    backgroundColor: backgroundColor || "rgba(0,0,0,0.3)",
    shouldShow
  };

  useEffect(
    () => {
      if (isOpen) {
        if (!current.isAnchored) {
          show();
        }
      } else {
        hide();
      }
    },
    [isOpen]
  );

  useOnClickOutside([popperRef.current, arrowRef.current], () => {
    if (!isOpen) {
      return;
    }
    if (current.isAnchored) {
      if (onClose) {
        onClose();
      }
    }
  });

  useEffect(() => {
    setMounted(true);
  });

  if (!isMounted) {
    return null;
  }

  if (!current.isAnchored) {
    if (!isOpen && !isVisible) {
      return null;
    }

    let styles;

    switch (currentPlacement) {
      case "left":
        styles = slide({
          ...current,
          height: "100%",
          axis: "X",
          fromStart: true
        });
        break;
      case "right":
        styles = slide({
          ...current,
          height: "100%",
          axis: "X",
          fromStart: false
        });
        break;
      case "top":
        styles = slide({
          ...current,
          width: "100%",
          axis: "Y",
          fromStart: true
        });
        break;
      case "bottom":
        styles = slide({
          ...current,
          width: "100%",
          axis: "Y",
          fromStart: false
        });
        break;
      default:
        // "center"
        styles = centered(current);
    }

    return (
      <Layer mountNode={mountNode()}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bg: "rgba(0,0,0,0.5)",
              zIndex: "-1",
              ...styles.background
            }}
            onClick={onClose}
          />

          <Box
            sx={{
              ...styles.contentWrapper
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: "inherit",
                minWidth: "inherit",
                maxHeight: "inherit",
                maxWidth: "inherit",
                ...styles.content,
                ...root
              }}
            >
              {typeof props.children === "function"
                ? props.children({
                    anchored: current.isAnchored,
                    close: () => {
                      if (onClose) {
                        onClose();
                      }
                    }
                  })
                : props.children}
            </Box>
          </Box>
        </Box>
      </Layer>
    );
  }

  if (!isOpen) {
    return null;
  }

  const onPopperUpdate = (normalizedOffsets, data) => {
    const placement = fromPopperPlacement(data.placement) || "top";
    // this.setState({
    //     arrowOffset: normalizedOffsets.arrow,
    //     popoverOffset: normalizedOffsets.popper,
    //     placement
    // });

    setPopoverOffset(normalizedOffsets.popper);
    setPopoverPlacement(placement);
    setArrowOffset(normalizedOffsets.arrowOffset);

    // Now that element has been positioned, we can animate it in
    // this.animateInTimer = setTimeout(this.animateIn, ANIMATE_IN_TIME);

    show();

    return data;
  };

  const getSharedProps = () => {
    return {
      showArrow: false,
      arrowOffset: arrowOffset,
      popoverOffset: popoverOffset,
      placement: popoverPlacement,
      isVisible: isVisible,
      isOpen: isOpen,
      anchorWidth: anchoredTo.current && anchoredTo.current.clientWidth
    };
  };

  const renderPopover = () => {
    // UPDATED CODE:

    const state = {
      ...getSharedProps(),
      anchored: !!current.isAnchored,
      close: () => {
        if (onClose) {
          onClose();
        }
      }
    };

    const children =
      typeof props.children === "function"
        ? props.children(state)
        : props.children;

    // const bodyProps = this.getPopoverBodyProps();

    const popoverRootSpec = getElementSpec(root, popoverRootDefault, {
      ...state,

      width: current.width,
      height: current.height,
      minWidth: current.minWidth,
      maxWidth: current.maxWidth,
      minHeight: current.minHeight,
      maxHeight: current.maxHeight,
      children
    });

    const popoverRoot = createElement(popoverRootSpec, {
      ref: popperRef
      // ...bodyProps
    });

    return popoverRoot;
  };

  // onMount and onUnmount are necessary to create rerender. Rerender makes popperRef to become not-null and TetherBehaviour depends on that
  return (
    <Layer
      mountNode={mountNode()}
      onMount={() => setLayerMounted(true)}
      onUnmount={() => setLayerMounted(false)}
    >
      <TetherBehavior
        anchorRef={anchoredTo.current}
        arrowRef={arrowRef.current}
        popperRef={popperRef.current}
        // Remove the `ignoreBoundary` prop in the next major version
        // and have it replaced with the TetherBehavior props overrides
        popperOptions={{
          modifiers: {
            preventOverflow: { enabled: !props.ignoreBoundary }
          }
        }}
        onPopperUpdate={onPopperUpdate}
        placement={currentPlacement || "bottomLeft"}
      >
        {renderPopover()}
      </TetherBehavior>
    </Layer>
  );
}

function useOnClickOutside(nodes, callback) {
  useEffect(() => {
    const onDocumentClick = evt => {
      const target = evt.target;

      for (const i in nodes) {
        const node = nodes[i];

        if (!node) {
          continue;
        }

        if (node === target || node.contains(target)) {
          return;
        }
      }

      if (callback) {
        callback(evt);
      }
    };

    document.addEventListener("mousedown", onDocumentClick);

    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
    };
  });
}

// Layer with Button
function Layer$$({
  button,
  anchoredTo = "button",
  closeOnEsc = true,
  onClose,
  ...restProps
}) {
  const [isOpen, setOpen] = useState(false);
  const buttonRef = useRef(null);

  // TODO: Make this not only array
  if (Array.isArray(anchoredTo)) {
    anchoredTo = anchoredTo.map(x => (x === "button" ? buttonRef : x));
  } else {
    anchoredTo = anchoredTo === "button" ? buttonRef : anchoredTo;
  }

  console.log("is open", isOpen);

  useEffect(() => {
    const onDocumentKeyPress = evt => {
      if (!closeOnEsc) {
        return;
      }

      if (evt.key !== "Escape") {
        return;
      }

      // Ignore events that have been `event.preventDefault()` marked.
      if (event.defaultPrevented) {
        return;
      }

      setOpen(false);

      if (onClose) {
        onClose();
      }
    };

    document.addEventListener("keyup", onDocumentKeyPress);

    return () => {
      document.removeEventListener("keyup", onDocumentKeyPress);
    };
  });

  if (!button) {
    return <Layer$ {...restProps} anchoredTo={anchoredTo} />;
  }

  return React.cloneElement(button, {
    onClick: () => {
      setOpen(true);
    },
    buttonRef,
    selected: isOpen,
    __portals__: (
      <Layer$
        {...restProps}
        anchoredTo={anchoredTo}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
          if (onClose) {
            onClose();
          }
        }}
      />
    )
  });
}

export default Layer$$;
