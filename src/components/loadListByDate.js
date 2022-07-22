
import { useEffect } from 'react';

import nivel_tanque from "../img/nivel_tanque.png";
import nivel_humedad from "../img/nivel_humedad.png";
import temperatura_tanque from "../img/temperatura_tanque.png";
import temperatura_ambiente from "../img/temperatura_ambiente.png";
import fechas_riego from "../img/fechas_riego.png";
import './Main.css'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const delay = ms => new Promise(res => setTimeout(res, ms));

const exportPdf = async() => {
    await delay(500);
    let prevH = document.querySelector("#Reporte").offsetHeight  
    let prevW = document.querySelector("#Reporte").offsetWidth 
    console.log("prevH "+ prevH)
    document.getElementById("Reporte").style.height = "auto";
    {console.log(prevH + " - " + document.getElementById("Reporte").style.height)}
    let idImprimir = "Reporte"
    let el = document.querySelector("#"+idImprimir)
    
    const pdf = new jsPDF('p', 'mm', [prevW,prevH]);
    
    var height = pdf.internal.pageSize.getHeight();
    console.log("prevH "+prevH)
    
    
    html2canvas(el).then(canvas => {

        
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0,  );
        
        pdf.save("download.pdf");

    });
    await delay(500);
    document.getElementById("Reporte").style.height = "";
}
const chartDataGenerator = async (data, currentChart, props) => {
    console.log(currentChart)
    if (currentChart !== "") {
        localStorage.setItem('currentChart', currentChart)
        
    } else {
        currentChart = localStorage.getItem('currentChart')
        console.log("localStorage: " + localStorage.getItem('currentChart'))
        switch (currentChart) {
            case "Nivel del Tanque":
                props.changeCurrentChartToNivelTanque()
                break;
            case "Temperatura Ambiente":
                props.changeCurrentChartToTemperaturaAmbiente()
                break;
            case "Temperatura Tanque":
                props.changeCurrentChartToTemperaturaTanque()
                break;
            case "Nivel de Humedad":
                props.changeCurrentChartToNivelHumedad()
                break;
            case "Riegos de Hoy":
                props.changeCurrentChartToRiegosHoy()
                break;
            case "Reporte":
                props.changeCurrentChartToReporte()

                break;
        }
    }
    
    let rawData = await data
    
    let neoData = []
    switch (currentChart) {
        case "Temperatura Ambiente":
            neoData.push(["Hora", "Temperatura °c"])
            for (let i = 0; i < rawData.length; i++) {
                let cadena = rawData[i].hora

                let cadenaAux = cadena.split(":")

                cadena = cadenaAux[0] + "\n" + cadenaAux[1]

                if (parseInt(cadenaAux[0]) < 12) {
                    cadena = cadena + "\nAM"
                } else {
                    cadena = cadena + "\nPM"
                }
                neoData.push([cadena, rawData[i].temperatura_ambiente])
            }
            break;
        case "Temperatura Tanque":
            neoData.push(["Hora", "Temperatura °c"])
            for (let i = 0; i < rawData.length; i++) {
                let cadena = rawData[i].hora
                let cadenaAux = cadena.split(":")
                cadena = cadenaAux[0] + "\n" + cadenaAux[1]
                if (parseInt(cadenaAux[0]) < 12) {
                    cadena = cadena + "\nAM"
                } else {
                    cadena = cadena + "\nPM"
                }
                neoData.push([cadena, rawData[i].temperatura_tanque])
            }
            break;
        case "Nivel del Tanque":
            neoData.push(["Hora", "Temperatura °c"])
            for (let i = 0; i < rawData.length; i++) {
                let cadena = rawData[i].hora
                let cadenaAux = cadena.split(":")
                cadena = cadenaAux[0] + "\n" + cadenaAux[1]
                if (parseInt(cadenaAux[0]) < 12) {
                    cadena = cadena + "\nAM"
                } else {
                    cadena = cadena + "\nPM"
                }
                neoData.push([cadena, rawData[i].nivel_tanque])
            }
            break;
        case "Nivel de Humedad":
            neoData.push(["Hora", "Temperatura °c"])
            for (let i = 0; i < rawData.length; i++) {
                let cadena = rawData[i].hora
                let cadenaAux = cadena.split(":")
                cadena = cadenaAux[0] + "\n" + cadenaAux[1]
                if (parseInt(cadenaAux[0]) < 12) {
                    cadena = cadena + "\nAM"
                } else {
                    cadena = cadena + "\nPM"
                }
                neoData.push([cadena, rawData[i].nivel_humedad])
            }
            break;
        case "Riegos de Hoy":
            
            for (let i = rawData.length - 1; i >= 0; i--) {

                let cadena = rawData[i].hora
                let cadenaAux = cadena.split(":")
                cadena = cadenaAux[0] + ":" + cadenaAux[1]
                if (parseInt(cadenaAux[0]) < 12) {
                    cadena = cadena + "\tAM"
                } else {
                    cadena = cadena + "\tPM"
                }
                const jsonVar = {
                    "hora": cadena,
                    "id": i
                }
                if (rawData[i].fue_riego) {
                    neoData.push(jsonVar)
                }
            }
            break
            /////////////////////////////////////////////////
        case "Reporte":
            
            for (let i = 0; i < rawData.length; i++) {
                let neoFecha = rawData[i].fecha.match(/.{1,10}/g)[0]
                let cadena = rawData[i].hora
                let cadenaAux = cadena.split(":")
                cadena = cadenaAux[0] + ":" + cadenaAux[1]
                let neoFueRiego = ""
                if (parseInt(cadenaAux[0]) < 12) {
                    cadena = cadena + "\tAM"
                } else {
                    cadena = cadena + "\tPM"
                }
                if(rawData[i].fue_riego){
                    neoFueRiego = "Si"
                }else{
                    neoFueRiego = "No"
                }
                rawData[i].fecha = neoFecha
                rawData[i].hora = cadena
                rawData[i].fue_riego = neoFueRiego
            }
            neoData = rawData
            
            break;
    }

    props.setDataState(neoData)

}

const loadCurrentData = async (props) => {
    
    let date = new Date()
    date.setDate(date.getDate() - 1);
    console.log(date)
    let data
    if (localStorage.getItem("currentChart" )!== "Reporte" ) {
        data = await loadLogsByDate(date)
        data = data.rows
    } else {
        data = await loadDataByDateRange(props.startDate, props.endDate)
        
    }


    
    
    let neoData
    let esNonChart = false
    if (localStorage.getItem("currentChart") === "Riegos de Hoy" || localStorage.getItem("currentChart") === "Reporte") {
        esNonChart = true
    }
    
    if (data.length > 12 && !esNonChart) {
        neoData = data.slice(data.length - 12)

    } else {
        neoData = data

    }
    return neoData
}

const loadLogsByDate = async (date) => {
    date = date.toISOString().split('T')[0]
    console.log(date)
    const response = await fetch(`http://localhost:4000/log/${date}`)
    const data = await response.json()

    return data
};

async function loadDataByDateRange(startDate, endDate) {
    
    
    if(startDate){
         localStorage.setItem("startDate", startDate)
    }else{
        startDate = localStorage.getItem("startDate")
    }

    if(endDate){
        localStorage.setItem("endDate", endDate)
    }else{
        endDate = localStorage.getItem("endDate")
    }
    let neoStartDate = startDate.toISOString().split('T')[0]
    let neoEndDate = endDate.toISOString().split('T')[0]
    const prueba = await fetch(` http://localhost:4000/logInDateRange/${neoStartDate}/${neoEndDate}`);
    let dataPrueba = await prueba.json()
    const neoData = dataPrueba.rows
    
    return neoData
}
export default function LogList(props) {

    const changeCurrentChartToNivelTanque = () => {
        props.changeCurrentChartToNivelTanque()
        chartDataGenerator(loadCurrentData(props), "Nivel del Tanque", props)
        window.scrollTo(0, 0)
    }
    const changeCurrentChartToTemperaturaTanque = () => {
        props.changeCurrentChartToTemperaturaTanque()
        chartDataGenerator(loadCurrentData(props), "Temperatura Tanque", props)
        window.scrollTo(0, 0)
    }
    const changeCurrentChartToNivelHumedad = () => {
        props.changeCurrentChartToNivelHumedad()
        chartDataGenerator(loadCurrentData(props), "Nivel de Humedad", props)
        window.scrollTo(0, 0)
    }
    const changeCurrentChartToTemperaturaAmbiente = () => {
        props.changeCurrentChartToTemperaturaAmbiente()
        chartDataGenerator(loadCurrentData(props), "Temperatura Ambiente", props)
        window.scrollTo(0, 0)
    }
    const changeCurrentChartToRiegosHoy = () => {
        props.changeCurrentChartToRiegosHoy()
        chartDataGenerator(loadCurrentData(props), "Riegos de Hoy", props)
        window.scrollTo(0, 0)
    }



    useEffect(() => {

        chartDataGenerator(loadCurrentData(props), props.currentChart, props)
        const interval = setInterval(() => {
            chartDataGenerator(loadCurrentData(props), props.currentChart, props)
        }, 60000);

    }, []);

    return (
        <div className='Main_Row' id='Segundo_row'>
            <button onClick={changeCurrentChartToNivelTanque} style={{ backgroundColor: '#C4DFAA', border: "0px" }}>
                <div className="Main_img" >
                    <img src={nivel_tanque} alt="nivel_tanque" />
                </div>
            </button>
            <button onClick={changeCurrentChartToTemperaturaTanque} style={{ backgroundColor: '#C4DFAA', border: "0px" }}>
                <div className="Main_img" >
                    <img src={temperatura_tanque} alt="temperatura_tanque" />
                </div>
            </button>
            <button onClick={changeCurrentChartToNivelHumedad} style={{ backgroundColor: '#C4DFAA', border: "0px" }}>
                <div className="Main_img">
                    <img src={nivel_humedad} alt="nivel_humedad" />
                </div>
            </button>
            <button onClick={changeCurrentChartToTemperaturaAmbiente} style={{ backgroundColor: '#C4DFAA', border: "0px" }}>
                <div className="Main_img">
                    <img src={temperatura_ambiente} alt="temperatura_ambiente" />
                </div>
            </button>
            <button onClick={changeCurrentChartToRiegosHoy} style={{ backgroundColor: '#C4DFAA', border: "0px" }}>
                <div className="Main_img">
                    <img src={fechas_riego} alt="fechas_riego" />
                </div>
            </button>
        </div>
    )
}


const manejadorReportGen = async (props) => {
    
    props.changeCurrentChartToReporte()
    localStorage.setItem('currentChart', "Reporte")
    chartDataGenerator(loadCurrentData(props), "Reporte", props)
    window.scrollTo(0, 0)
    //props.setDataState(await loadDataByDateRange(props.startDate, props.endDate))


    exportPdf()
}
export const BotonGenerarReporte = (props) => {
    return (
        <button onClick={(e) => manejadorReportGen(props)} disabled={!props.startDate || !props.endDate} style={{ backgroundColor: '#C4DFAA', border: "0px" }}>
            <div className="Date_picker">
                Generar Reporte
            </div>
        </button>
    )
}