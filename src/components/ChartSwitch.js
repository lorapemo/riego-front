import React, { useEffect } from "react";
import './ChartSwitch.css';
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import RiegosHoy from "./RiegosHoy";
import Report from "./Report";

function ChartSwitch(props) {

    switch (props.currentChart) {
        case "Temperatura Ambiente":
            return (
                <div className="ChartSwitch_Container">
                    <div className="Cuadro">
                        <LineChart data={props.data} currentChart={props.currentChart} />
                    </div>
                </div>
            )
            break;
        case "Temperatura Tanque":
            return (
                <div className="ChartSwitch_Container">
                    <div className="Cuadro">
                        <LineChart data={props.data} currentChart={props.currentChart} />
                    </div>
                </div>
            )
            break;
        case "Nivel del Tanque":
            return (
                <div className="ChartSwitch_Container">
                    <div className="Cuadro">
                        <BarChart data={props.data} currentChart={props.currentChart} />
                    </div>
                </div>
            )
        case "Nivel de Humedad":
            return (
                <div className="ChartSwitch_Container">
                    <div className="Cuadro">
                        <BarChart data={props.data} currentChart={props.currentChart} />
                    </div>
                </div>
            )
        case "Riegos de Hoy":
            return (
                <RiegosHoy data={props.data} currentChart={props.currentChart} />
            )
        case "Reporte":
            return (
                <Report startDate={props.startDate} endDate={props.endDate} data={props.data} currentChart={props.currentChart} />
            )
    }

}
export default ChartSwitch;