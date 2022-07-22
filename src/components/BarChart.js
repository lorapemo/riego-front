import React from "react";
import { Chart } from "react-google-charts";
import './Chart.css';

export const optionsDesktop = {
  backgroundColor: "#F5F0BB",
  series: [{ color: "#73A9AD", lineWidth: 5 }],
  chartArea: { width: "80%" },
  hAxis: {textStyle: { color: "#73A9AD", fontSize: 22 }, },
  vAxis: {textStyle: { color: "#73A9AD", fontSize: 22  }, },
  legend: "none"
};
export const optionsMobile = {
  backgroundColor: "#F5F0BB",
  series: [{ color: "#73A9AD", lineWidth: 5 }],
  chartArea: { width: "80%" },
  hAxis: {textStyle: { color: "#73A9AD", fontSize: 11 }},
  vAxis: {textStyle: { color: "#73A9AD", fontSize: 11  }},
  legend: "none"
};
export default function App(props) {
  let tamanio = window.innerWidth
  if (tamanio <= 912) {
    return (
      <div className="ChartContainer">
        <div>
          <h1 className="ChartTitle">{props.currentChart}</h1>
        </div>
        <div className="Chart">
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="514.08px"
            data={props.data}
            options={optionsMobile}
          />
        </div>
      </div>
    );
  }
  return (
    <div >
      <div className="ChartTitleContainer">
        <h1 className="ChartTitle">{props.currentChart}</h1>
      </div>
      <div className="Chart">
        <Chart
          chartType="ColumnChart"
          width={window.innerWidth/1.5}
          height={window.innerHeight/1.5}
          data={props.data}
          options={optionsDesktop}
        />
      </div>
    </div>
  );
}
