import LXZ from "../img/LXZ.png"
import LZX from "../img/LZX.png"
import XLZ from "../img/XLZ.png"
import ZLX from "../img/ZLX.png"
const ImgTabla = (props) => {
    switch (props.img) {
        case "LXZ":
            return (
                <>
                    <img src={LXZ} className="imgWidth50" />
                    Zc = {props.Zc}
                    <br></br>
                    La Hipotesis Orignial es cierta, pues Zc esta dento del rango (-1.96, 1.96)
                    
                </>
            )
            break;

        case "LZX":
            return (
                <>
                    <img src={LZX} className="imgWidth50" />
                    Zc = {props.Zc}
                    <br></br>
                    La Hipotesis Orignial es cierta, pues Zc esta dento del rango (-1.96, 1.96)
                </>
            )
            break;

        case "XLZ":
            return (
                <>
                    <img src={XLZ} className="imgWidth50" />
                    Zc = {props.Zc}
                    <br></br>
                    La Hipotesis Original no es cierta, pues Zc esta fuera del rango (-1.96, 1.96)
                </>
            )
            break;

        case "ZLX":
            return (
                <>
                    <img src={ZLX} className="imgWidth50" />
                    Zc = {props.Zc}
                    <br></br>
                    La Hipotesis Original no es cierta, pues Zc esta fuera del rango (-1.96, 1.96)
                </>
            )
            break;
    }
}
export default ImgTabla