import React, { useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";
import { getBtfgraph } from "../redux/helpers/api_functions";
export default function Chart(props) {
  const [change, setChanged] = React.useState(true);
  useEffect(() => {
    var chartref = document.getElementById("chart");
    var chart = createChart(chartref, {
      height: 300,
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      localization: {
        priceFormatter: (d) => d.toFixed(4),
      },
    });
    var areaSeries = chart.addAreaSeries({
      topColor: "rgba(33, 150, 243, 0.56)",
      bottomColor: "rgba(33, 150, 243, 0.04)",
      lineColor: "rgba(33, 150, 243, 1)",
      lineWidth: 2,
    });
    var darkTheme = {
      chart: {
        layout: {
          backgroundColor: "transparent",
          lineColor: "transparent",
          textColor: "#D9D9D9",
        },
        watermark: {
          color: "rgba(0, 0, 0, 0)",
        },
        crosshair: {
          color: "#758696",
        },
        grid: {
          vertLines: {
            color: "transparent",
          },
          horzLines: {
            color: "transparent",
          },
        },
      },
      series: {
        topColor: "rgba(32, 226, 47, 0.56)",
        bottomColor: "rgba(32, 226, 47, 0.04)",
        lineColor: "rgba(32, 226, 47, 1)",
      },
    };

    const lightTheme = {
      chart: {
        layout: {
          backgroundColor: "#FFFFFF",
          lineColor: "#2B2B43",
          textColor: "#191919",
        },
        watermark: {
          color: "rgba(0, 0, 0, 0)",
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            color: "#f0f3fa",
          },
        },
      },
      series: {
        topColor: "rgba(33, 150, 243, 0.56)",
        bottomColor: "rgba(33, 150, 243, 0.04)",
        lineColor: "rgba(33, 150, 243, 1)",
      },
    };
    var themesData = {
      Dark: darkTheme,
      Light: lightTheme,
    };
    function syncToTheme(theme) {
      chart.applyOptions(themesData[theme].chart);
      areaSeries.applyOptions(themesData[theme].series);
    }

    getBtfgraph()
      .then((d) => {
        areaSeries.setData(d);
        chart.timeScale().fitContent();
        setChanged(!change);
      })
      .catch((e) => {
        console.log(e);
      });

    syncToTheme("Dark");
  }, []);
  return <div id="chart"></div>;
}
