/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getDjChart } from "../../reducers/djChartSlice";

const options = {
  onHover: (event, chartElement) => {
    if (chartElement.length > 0) {
      event.native.target.style.cursor = "pointer";
    }
    if (chartElement.length === 0) {
      event.native.target.style.cursor = "default";
    }
  },
  tension: 0.3,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      filter: function (toolTipItem) {
        return toolTipItem.datasetIndex === 1;
      },
      enabled: false,
      mode: "index",
      intersect: false,
      external: function (context) {
        // Tooltip Element
        let tooltipEl = document.getElementById("chartjs-tooltip");

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement("div");
          tooltipEl.id = "chartjs-tooltip";
          tooltipEl.style.backgroundColor = "white";
          tooltipEl.style.borderRadius = "10px";
          tooltipEl.innerHTML = "<div id='tooltipEl'></div>";
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        const tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove("above", "below", "no-transform");
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add("no-transform");
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
          const titleLines = tooltipModel.title || [];
          const bodyLines = tooltipModel.body.map(getBody);

          let innerHtml = "<div>";

          titleLines.forEach(function (title) {
            let style = "font-size:2rem;font-weight:700";
            let style2 = "font-size:1rem;color:gray;font-weight:300";
            const divElement =
              "<div style=" +
              style +
              ">" +
              context.tooltip.dataPoints[0].raw +
              "<span style=" +
              style2 +
              ">gigs</span>" +
              "</div>";
            innerHtml += divElement;
          });
          innerHtml += "</div>";

          let tableRoot = tooltipEl.querySelector("#tooltipEl");
          tableRoot.innerHTML = innerHtml;
        }

        const position = context.chart.canvas.getBoundingClientRect();

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = "absolute";
        tooltipEl.style.padding = "5px 30px";
        tooltipEl.style.left =
          position.left + window.pageXOffset + tooltipModel.caretX + -20 + "px";
        tooltipEl.style.top =
          position.top + window.pageYOffset + tooltipModel.caretY + -38 + "px";
        tooltipEl.classList.add("font-inter");
        tooltipEl.style.padding =
          tooltipModel.padding + "px " + tooltipModel.padding + "px";
        tooltipEl.style.pointerEvents = "none";
      },
    },
  },
  hover: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      gridLines: {
        tickMarkLength: 50,
      },
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 20,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      // min: 0,
      // max: 500,
      ticks: {
        // stepSize: 200,
        font: {
          size: 18,
        },
      },
    },
  },
};

const DjChart = () => {
  const [djChartData, setDjChartData] = useState({
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    datasets: [
      {
        type: "bar",
        label: "Bar Dataset",
        data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
        borderRadius: 10,
        backgroundColor: "rgba(0, 122, 255, 0.21)",
        barThickness:
          window.innerWidth <= 1250
            ? window.innerWidth <= 500
              ? 10
              : 30
            : window.innerWidth >= 1500
            ? 72
            : 60,
        hoverBackgroundColor: "rgba(0, 122, 255, 0.51)",
      },
      {
        type: "line",
        label: "Line Dataset",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: "rgba(0, 122, 255, 1)",
        pointHoverBackgroundColor: "rgba(0, 122, 255, 1)",
        pointerWidth: 5,
        pointRadius: 0,
        pointHoverRadius: 10,
      },
    ],
  });
  const { djChart } = useSelector((state) => state.djChart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getDjChart({ djId: user.data.user._id, accessToken: user.data.token })
    );
  }, [user, dispatch]);

  useEffect(() => {
    setDjChartData(djChart);
  }, [djChart]);

  return <Bar data={djChartData} options={options} />;
};

export default DjChart;
