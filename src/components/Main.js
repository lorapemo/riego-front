import React from "react";
import ChartSwitch from "./ChartSwitch"
import ReportGenerator from "./ReportGenerator";
import './Main.css'
import LogList from "./loadListByDate";
import "react-datepicker/dist/react-datepicker.css";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChart: "",
            data: [],
            startDate: '',
            endDate: ''
        }
    }
    setStartDate = (date) =>{
        this.setState({startDate: date})
    }
    setEndDate = (date) =>{
        this.setState({endDate: date})
    }
    changeCurrentChartToNivelTanque = () => {
        this.setState({ currentChart: "Nivel del Tanque" })
    }
    changeCurrentChartToTemperaturaAmbiente = () => {
        this.setState({ currentChart: "Temperatura Ambiente" })
    }
    changeCurrentChartToTemperaturaTanque = () => {
        this.setState({ currentChart: "Temperatura Tanque" })
    }
    changeCurrentChartToNivelHumedad = () => {
        this.setState({ currentChart: "Nivel de Humedad" })
    }
    changeCurrentChartToRiegosHoy = () => {
        this.setState({ currentChart: "Riegos de Hoy" })
    }
    changeCurrentChartToReporte = () =>{
        this.setState({ currentChart: "Reporte"})
    }
    setDataState = (neoData) => {
        this.setState({ data: neoData })
    }
    render() {
        return (
            <div id="" className="Main_Container">
                <div className="Main_Row">
                    <ChartSwitch startDate={this.state.startDate} endDate={this.state.endDate} currentChart={this.state.currentChart} data={this.state.data} />
                    <ReportGenerator setStartDate={this.setStartDate} setEndDate={this.setEndDate} startDate={this.state.startDate} endDate={this.state.endDate} currentChart={this.state.currentChart} data={this.data} setDataState={this.setDataState} changeCurrentChartToReporte={this.changeCurrentChartToReporte}/>
                </div>
                <div className="Main_Button_Container">
                    <LogList  startDate={this.state.startDate} endDate={this.state.endDate} changeCurrentChartToReporte={this.changeCurrentChartToReporte} currentChart={this.state.currentChart} setDataState={this.setDataState} changeCurrentChartToNivelTanque={this.changeCurrentChartToNivelTanque} changeCurrentChartToTemperaturaAmbiente={this.changeCurrentChartToTemperaturaAmbiente} changeCurrentChartToTemperaturaTanque={this.changeCurrentChartToTemperaturaTanque} changeCurrentChartToNivelHumedad={this.changeCurrentChartToNivelHumedad} changeCurrentChartToRiegosHoy={this.changeCurrentChartToRiegosHoy}/>
                    
                </div>
                
            </div>
        )
    }
}

export default Main;

