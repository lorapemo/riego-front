import React, { useState } from "react";
import './ReportGenerator.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";

import {BotonGenerarReporte} from "./loadListByDate"
const placeHolderBoton1 = (value) => {
    if (value) {
        return value
    }
    return "Selecciona fecha inicial"
}

const placeHolderBoton2 = (value) => {
    if (value) {
        return value
    }
    return "Selecciona fecha final"
}






const Boton1 = forwardRef(({ value, onClick }, ref) => (
    <button className="Date_picker" onClick={onClick} ref={ref} >
        {placeHolderBoton1(value)}
    </button>
));

const Boton2 = forwardRef(({ value, onClick }, ref) => (
    <button className="Date_picker" onClick={onClick} ref={ref} >
        {placeHolderBoton2(value)}
    </button>
));





const ReportGenerator = (props) => {
    
    return (
        <div className="Contenedor_date_picker">
            <div className="Box_date_picker">
                <div className="">
                    <DatePicker
                        selected={props.startDate}
                        onChange={(date) => props.setStartDate(date)}
                        selectsStart
                        startDate={props.startDate}
                        endDate={props.endDate}
                        customInput={<Boton1 />}
                    />
                </div>
                <div className="">
                    <DatePicker
                        selected={props.endDate}
                        onChange={(date) => props.setEndDate(date)}
                        selectsEnd
                        startDate={props.startDate}
                        endDate={props.endDate}
                        minDate={props.startDate}
                        customInput={<Boton2 />}
                    />
                </div>
            </div>
            {props.data}
            <BotonGenerarReporte startDate={props.startDate} endDate={props.endDate} setDataState={props.setDataState} currentChart={props.currentChart} changeCurrentChartToReporte={props.changeCurrentChartToReporte} />


        </div>
    );
};
export default ReportGenerator;
