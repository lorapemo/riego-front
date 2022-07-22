import "./RiegosHoy.css"

export default function RiegosHoy(props) {
    return(
        <div id="RiegosHoy" className="NonChart_Container">
            <h1 className="NonChart_Title">{props.currentChart}</h1>
            <div className="RiegosHoy_Cuadro">
                {props.data.map(({hora, id})=>(
                    <div className="RiegosHoy_Elemento" key={id}>{hora}</div>
                ))}
            </div>
        </div>
    )
}