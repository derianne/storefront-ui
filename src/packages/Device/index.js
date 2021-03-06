import MobileDetect from "mobile-detect";

import React, { useContext } from "react";
import PropTypes from "prop-types";

import MediaQuery from "../MediaQuery";
import { Range } from "responsive-helpers";

const DeviceContext = React.createContext({
  device: null
});

function useDevice() {
  const { device } = useContext(DeviceContext);
  return device;
}

const Device = ({ mobile, desktop, children }) => {
  if (mobile === false && desktop === false) {
    throw new Error(
      "[Device] Either mobile or desktop flag must be set to true"
    );
  } else if (mobile === true && desktop === true) {
    throw new Error("[Device] You can't set both desktop and mobile");
  }

  const device = useDevice(); // if device === null => SSR disabled.

  // if (!device) {
  //   throw new Error(
  //     "[Device] configuration error! window is undefined (your code is probably running in node.js - tests or SSR) and DeviceProvider is not defined."
  //   );
  // }

  let canShow =
    (mobile && device === "mobile") || (desktop && device === "desktop");

  let range;

  if (mobile) {
    range = new Range("mobile", 0, 767);
  } else if (desktop) {
    range = new Range("desktop", 768, undefined);
  }

  return (
    <MediaQuery range={range} prerender={canShow}>
      {children}
    </MediaQuery>
  );
};

function DeviceProvider({ userAgent, mobile, desktop, children }) {
  let isMobile;

  if (userAgent) {
    const md = new MobileDetect(userAgent);
    isMobile = md.phone() !== null;
  } else {
    if (mobile) {
      isMobile = true;
    } else if (desktop) {
      isMobile = false;
    } else {
      throw new Error(
        "[DeviceProvider] You must either pass userAgent or mobile or desktop property"
      );
    }
  }

  return (
    <DeviceContext.Provider value={{ device: isMobile ? "mobile" : "desktop" }}>
      {children}
    </DeviceContext.Provider>
  );
}

Device.defaultProps = {
  mobile: false,
  desktop: false
};

Device.propTypes = {
  children: PropTypes.any,
  mobile: PropTypes.bool,
  desktop: PropTypes.bool
};

export default Device;
export { DeviceProvider, useDevice };
