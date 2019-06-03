import Color from "../Color";

class Font {
  constructor(css) {
    this._css = css;
  }

  get css() {
    return this._css;
  }
}

Font.prototype.toString = function() {
  return this._css;
};

export default Font;
