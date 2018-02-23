/* BlueGraphTheme.js
 * Based on code for Victory Themes, modified by Liv Phillips for Energy App Comps, 2018
 * Styles graphs.
 */

import { assign } from "lodash";

import CurrFont from './../styling/CurrentFont';

// *
// * Colors
// *
const colors = [
  "#0B5091",
  "#447BB0",
  "#04305A",
  "#98BDE1",
  "#FEF9E7",
  "#FDEDEC",
  "#E9F7EF",
  "#FDFEFE"
];

const carletonBlue = "#0B5091";

// *
// * Typography
// *
const sansSerif = "'Gill Sans', 'Gill Sans MT', 'Ser­avek', 'Trebuchet MS', sans-serif";
const fontRegular = CurrFont+'-regular';
const fontBold = CurrFont+'-bold';
const letterSpacing = "normal";
const fontSize = 14;
// *
// * Layout
// *
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: colors
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: fontRegular,
  fontSize: 10,
  letterSpacing: 'normal',
  padding: 0,
  fill: carletonBlue,
  stroke: "transparent",
};

const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);
// *
// * Strokes
// *
const strokeLinecap = "round";
const strokeLinejoin = "round";
const strokeDasharray = "10, 5";

export default {
  area: assign({
    style: {
      data: {
        fill: carletonBlue
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  axis: assign({
    style: {
      axis: {
        fill: "transparent",
        stroke: carletonBlue,
        strokeWidth: 1,
        strokeLinecap,
        strokeLinejoin
      },
      axisLabel: assign({}, centeredLabelStyles, {
        padding: 30,
        fontFamily: fontBold,
        weight: 'bold',
        fontSize: 11

      }),
      grid: {
        fill: "transparent",
        stroke: "#C8D2D9",
        strokeDasharray,
        strokeLinecap,
        strokeLinejoin
      },
      ticks: {
        fill: "transparent",
        padding: 10,
        size: 1,
        stroke: "#C8D2D9",
        strokeWidth: 2,
        strokeLinecap,
        strokeLinejoin
      },
      tickLabels: baseLabelStyles
    }
  }, baseProps),
  bar: assign({
    style: {
      data: {
        fill: carletonBlue,
        padding: 10,
        stroke: "transparent",
        strokeWidth: 0,
        width: 12
      },
      labels: baseLabelStyles
    }
  }, baseProps),
  candlestick: assign({
    style: {
      data: {
        stroke: carletonBlue,
        strokeWidth: 1
      },
      labels: centeredLabelStyles
    },
    candleColors: {
      positive: "#ffffff",
      negative: carletonBlue
    }
  }, baseProps),
  chart: baseProps,
  errorbar: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: carletonBlue,
        strokeWidth: 2
      },
      labels: centeredLabelStyles
    }
  }, baseProps),
  group: assign({
    colorScale: colors
  }, baseProps),
  line: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: carletonBlue,
        strokeWidth: 2
      },
      labels: assign({}, baseLabelStyles, {
        textAnchor: "start"
      })
    }
  }, baseProps),
  pie: {
    style: {
      data: {
        padding: 10,
        stroke: "transparent",
        strokeWidth: 1
      },
      labels: assign({}, baseLabelStyles, {
        padding: 20
      })
    },
    colorScale: colors,
    width: 400,
    height: 400,
    padding: 50
  },
  scatter: assign({
    style: {
      data: {
        fill: carletonBlue,
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: baseLabelStyles
    }
  }, baseProps),
  stack: assign({
    colorScale: colors
  }, baseProps),
  tooltip: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: centeredLabelStyles,
      flyout: {
        stroke: carletonBlue,
        strokeWidth: 1,
        fill: "#f0f0f0"
      }
    },
    flyoutProps: {
      cornerRadius: 10,
      pointerLength: 10
    }
  }, baseProps),
  voronoi: assign({
    style: {
      data: {
        fill: "transparent",
        stroke: "transparent",
        strokeWidth: 0
      },
      labels: centeredLabelStyles
    }
  }, baseProps)
};
