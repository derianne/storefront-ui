import React from "react";
import ReactDOM from "react-dom";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

import { rs } from "responsive-helpers";

const NotificationsContext = React.createContext(null);

import { useTheme } from "../Theme";

let instance;

function showNotification(jsx, options) {
  instance.show(jsx, options);
}

class NotificationsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: []
    };

    this.show = this.show.bind(this);
  }

  componentDidMount() {
    if (instance) {
      throw new Error(
        "[NotificationsContainer] There can be only one instance of NotificationsContainer in the application"
      );
    }

    instance = this;
  }

  show(element, options) {
    options = options || {};
    options.placement = options.placement || "topRight";
    options.placementMobile = options.placementMobile || "bottom";
    options.autoHideTimeout = options.autoHideTimeout || 3000;

    let notification = {
      options: options
    };

    const close = () => {
      this.setState(previousState => ({
        notifications: previousState.notifications.filter(
          n => n !== notification
        )
      }));
    };

    options._timer = setTimeout(close, options.autoHideTimeout);

    notification.element = (
      <div
        onMouseEnter={() => {
          clearTimeout(options._timer);
        }}
        onMouseLeave={() => {
          setTimeout(close, options.autoHideTimeout);
        }}
      >
        {typeof element === "function" ? element({ close }) : element}
      </div>
    );

    this.setState({
      notifications: [...this.state.notifications, notification]
    });
  }

  render() {
    const theme = {
      notifications: {
        topLeft: {
          x: 16,
          y: 16,
          spacer: 8,
          width: 300
        },
        topRight: {
          x: 16,
          y: 16,
          spacer: 8,
          width: 300
        },
        bottomLeft: {
          x: 16,
          y: 16,
          spacer: 8,
          width: 300
        },
        bottomRight: {
          x: 16,
          y: 16,
          spacer: 8,
          width: 300
        },
        mobileTop: {
          x: 0,
          y: 0,
          spacer: 0
        },
        mobileBottom: {
          x: 16,
          y: 16,
          spacer: 8
        }
      }
    };

    return (
      <div>
        {typeof window !== "undefined" && window.innerWidth >= 768 && (
          <>
            <div
              css={css`
                    position: fixed;
                    ${rs(theme.notifications.topLeft.y).css("top")}
                    ${rs(theme.notifications.topLeft.x).css("left")}
                    ${rs(theme.notifications.topLeft.width).css("width")}
                    > * {
                        ${rs(theme.notifications.topLeft.spacer).css(
                          "margin-bottom"
                        )}
                    }
                `}
            >
              {this.state.notifications
                .filter(n => n.options.placement === "topLeft")
                .map(n => n.element)}
            </div>

            <div
              css={css`
                    position: fixed;
                    ${rs(theme.notifications.topRight.y).css("top")}
                    ${rs(theme.notifications.topRight.x).css("right")}
                    ${rs(theme.notifications.topRight.width).css("width")}
                    > * {
                        ${rs(theme.notifications.topRight.spacer).css(
                          "margin-bottom"
                        )}
                    }
                `}
            >
              {this.state.notifications
                .filter(n => n.options.placement === "topRight")
                .map(n => n.element)}
            </div>

            <div
              css={css`
                    position: fixed;
                    ${rs(theme.notifications.bottomRight.y).css("bottom")}
                    ${rs(theme.notifications.bottomRight.x).css("right")}
                    ${rs(theme.notifications.bottomRight.width).css("width")}
                    > * {
                        ${rs(theme.notifications.bottomRight.spacer).css(
                          "margin-top"
                        )}
                    }
                `}
            >
              {this.state.notifications
                .filter(n => n.options.placement === "bottomRight")
                .map(n => n.element)}
            </div>

            <div
              css={css`
                    position: fixed;
                    ${rs(theme.notifications.bottomLeft.y).css("bottom")}
                    ${rs(theme.notifications.bottomLeft.x).css("left")}
                    ${rs(theme.notifications.bottomLeft.width).css("width")}
                    > * {
                        ${rs(theme.notifications.bottomLeft.spacer).css(
                          "margin-top"
                        )}
                    }
                `}
            >
              {this.state.notifications
                .filter(n => n.options.placement === "bottomLeft")
                .map(n => n.element)}
            </div>
          </>
        )}

        {typeof window !== "undefined" && window.innerWidth < 768 && (
          <>
            <div
              css={css`
                    position: fixed;
                    ${rs(theme.notifications.mobileBottom.y).css("bottom")}
                    ${rs(theme.notifications.mobileBottom.x).css("left")}
                    ${rs(theme.notifications.mobileBottom.x).css("right")}
                    > * {
                        ${rs(theme.notifications.mobileBottom.spacer).css(
                          "margin-top"
                        )}
                    }
                `}
            >
              {this.state.notifications
                .filter(n => n.options.placementMobile === "bottom")
                .map(n => n.element)}
            </div>

            <div
              css={css`
                    position: fixed;
                    ${rs(theme.notifications.mobileTop.y).css("top")}
                    ${rs(theme.notifications.mobileTop.x).css("left")}
                    ${rs(theme.notifications.mobileTop.x).css("right")}
                    > * {
                        ${rs(theme.notifications.mobileTop.spacer).css(
                          "margin-bottom"
                        )}
                    }
                `}
            >
              {this.state.notifications
                .filter(n => n.options.placementMobile === "top")
                .map(n => n.element)}
            </div>
          </>
        )}
      </div>
    );
  }
}

export { NotificationsContainer, showNotification };
