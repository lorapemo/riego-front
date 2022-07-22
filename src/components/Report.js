import ImgTabla from "./ImgTabla"
export default function Report(props) {



    let arregloTemperaturaTanque = []
    let arregloNivelHumedad = []
    let arregloTemperaturaAmbiente = []
    let rawTemperaturaTanque = []
    let rawNivelHumedad = []
    let rawTemperaturaAmbiente = []
    const getAllArreglos = () => {
        for (let i = 0; i < props.data.length; i++) {

            arregloTemperaturaTanque.push(props.data[i].temperatura_tanque)
            arregloNivelHumedad.push(props.data[i].nivel_humedad)
            arregloTemperaturaAmbiente.push(props.data[i].temperatura_ambiente)
        }
    }
    rawTemperaturaTanque = arregloTemperaturaTanque
    rawNivelHumedad = arregloNivelHumedad
    rawTemperaturaAmbiente = arregloTemperaturaAmbiente
    const getArrayJSON = (arreglo) => {
        let neoArreglo = []
        let rango = calcRango(arreglo)
        let intervalo = calcIntervalo(arreglo.length)
        let amplitud = calcAmplitud(rango, intervalo)

        for (let i = 0; i < arreglo.length; i++) {
            const jsonBase = {
                "id": i,
                "limI": calcLimI(Math.min(...arreglo), amplitud, i),
                "limS": calcLimS(Math.min(...arreglo), amplitud, i),
                "marcaClase": 0,
                "frecuencia": 0,

            }
            jsonBase.marcaClase = calcMarcaClase(jsonBase.limI, jsonBase.limS, amplitud, i)
            jsonBase.frecuencia = calcFrecuencia(arreglo, jsonBase.limI, jsonBase.limS, amplitud, i)

            if (i <= intervalo) {
                neoArreglo.push(jsonBase)
            }

        }
        return neoArreglo
    }
    let calcRango = (arreglo) => {
        const min = Math.min(...arreglo)
        const max = Math.max(...arreglo)
        return max - min
    }
    let calcIntervalo = (numeroElementos) => {
        let sturges = 1 + 3.322 * Math.log10(numeroElementos)
        let redondeo = Math.floor(sturges)
        if (redondeo % 2 == 1) {
            return redondeo
        }
        return redondeo + 1
    }
    let calcAmplitud = (rango, intervalo) => {
        return rango / intervalo
    }
    let calcLimI = (min, amplitud, iterador) => {
        let limI = min + (amplitud * iterador)
        limI = Math.round(limI * 100) / 100
        return limI
    }
    let calcLimS = (min, amplitud, iterador) => {
        let limS = min + amplitud + (amplitud * iterador)
        limS = Math.round(limS * 100) / 100
        return limS
    }
    let calcMarcaClase = (limI, limS) => {
        let marcaClase = (limI + limS) / 2
        marcaClase = Math.round(marcaClase * 100) / 100
        return marcaClase
    }
    let calcFrecuencia = (arreglo, limI, limS) => {
        let sumatoria = 0
        for (let i = 0; i < arreglo.length; i++) {
            if (limI <= arreglo[i] && arreglo[i] < limS) {
                sumatoria += 1
            }
        }
        return sumatoria
    }
    let media = (marcaClaseArreglo, frecuencaArreglo, numeroElementos) => {
        let sumatoria = 0

        for (let i = 0; i < marcaClaseArreglo.length; i++) {
            sumatoria += marcaClaseArreglo[i] * frecuencaArreglo[i]
        }
        return Math.round(sumatoria * 100 / numeroElementos) / 100
    }
    let calcVarianza = (marcaClaseArreglo, frecuencaArreglo, media, numeroElementos) => {
        let sumatoria = 0
        for (let i = 0; i < marcaClaseArreglo.length; i++) {
            sumatoria += frecuencaArreglo[i] * ((marcaClaseArreglo[i] - media) ** 2)
        }
        return Math.floor(sumatoria * 100 / (numeroElementos - 1)) / 100
    }
    let getMarcaClaseOrFrecuencia = (arreglo, objetivo) => {
        let neoArreglo = []
        switch (objetivo) {
            case "marcaClase":
                for (let i = 0; i < arreglo.length; i++) {
                    neoArreglo.push(arreglo[i].marcaClase)
                }
                break;
            case "frecuencia":
                for (let i = 0; i < arreglo.length; i++) {
                    neoArreglo.push(arreglo[i].frecuencia)
                }
                break;
        }
        return neoArreglo
    }
    let getIntervalo = (arreglo) => {
        if (arreglo.length > 0) {
            return Math.round((arreglo[0].limS - arreglo[0].limI) * 100) / 100
        }
        return 0
    }
    let getNumeroElementos = (arreglo) => {
        let sumatoria = 0
        for (let i = 0; i < arreglo.length; i++) {
            sumatoria += arreglo[i].frecuencia
        }
        return sumatoria
    }
    let calcTamanioMuestra = (desvEst, numeroElementos) => {
        let n = numeroElementos * desvEst ** 2 * 1.96 ** 2
        let aux = (numeroElementos - 1) * .05 ** 2 + desvEst ** 2 * 1.96 ** 2
        return Math.floor(n / aux)
    }
    let getMuestra = (arreglo, tamanioMuestra) => {
        let amplitud = Math.floor(arreglo.length / tamanioMuestra)
        let neoArreglo = []
        for (let i = 0; i < tamanioMuestra; i++) {
            neoArreglo.push(arreglo[amplitud * i])
        }
        return neoArreglo
    }
    let calZc = (mediaMuestra, media, desvEst, tamanioMuestra) => {
        return (mediaMuestra - media) / (desvEst / (tamanioMuestra ** .5))
    }
    let setImg = (Zc) => {
        let cadena = "000"
        if (Zc < -1.96) {
            cadena = "ZLX"
            return cadena
        }
        if (Zc > 1.96) {
            cadena = "XLZ"
            return cadena
        } if (Zc < 0) {
            cadena = "LZX"
            return cadena
        } else {
            cadena = "LXZ"
            return cadena
        }
    }

    getAllArreglos()

    arregloTemperaturaTanque = getArrayJSON(arregloTemperaturaTanque)
    arregloNivelHumedad = getArrayJSON(arregloNivelHumedad)
    arregloTemperaturaAmbiente = getArrayJSON(arregloTemperaturaAmbiente)
    ///////////////////////////////////////////////////
    let marcaClaseArregloTemperaturaTanque = getMarcaClaseOrFrecuencia(arregloTemperaturaTanque, "marcaClase")
    let frecuenciaArregloTemperaturaTanque = getMarcaClaseOrFrecuencia(arregloTemperaturaTanque, "frecuencia")
    let numeroElementosTemperaturaTanque = getNumeroElementos(arregloTemperaturaTanque)
    let mediaTemperaturaTanque = media(marcaClaseArregloTemperaturaTanque, frecuenciaArregloTemperaturaTanque, numeroElementosTemperaturaTanque)
    let varianzaTemperaturaTanque = calcVarianza(marcaClaseArregloTemperaturaTanque, frecuenciaArregloTemperaturaTanque, mediaTemperaturaTanque, numeroElementosTemperaturaTanque)
    let tamanioMuestraTemperaturaTanque = calcTamanioMuestra(varianzaTemperaturaTanque ** (1 / 2), numeroElementosTemperaturaTanque)

    let rawMuestraTemperaturaTanque = getMuestra(rawTemperaturaTanque, tamanioMuestraTemperaturaTanque)
    let arregloMuestraTemperaturaTanque = getArrayJSON(rawMuestraTemperaturaTanque)
    let marcaClaseArregloMuestraTemperaturaTanque = getMarcaClaseOrFrecuencia(arregloMuestraTemperaturaTanque, "marcaClase")
    let frecuenciaArregloMuestraTemperaturaTanque = getMarcaClaseOrFrecuencia(arregloMuestraTemperaturaTanque, "frecuencia")
    let numeroElementosMuestraTemperaturaTanque = getNumeroElementos(arregloMuestraTemperaturaTanque)
    let mediaMuestraTemperaturaTanque = media(marcaClaseArregloMuestraTemperaturaTanque, frecuenciaArregloMuestraTemperaturaTanque, numeroElementosMuestraTemperaturaTanque)
    let varianzaMuestraTemperaturaTanque = calcVarianza(marcaClaseArregloMuestraTemperaturaTanque, frecuenciaArregloMuestraTemperaturaTanque, mediaMuestraTemperaturaTanque, numeroElementosMuestraTemperaturaTanque)
    let desvEstMuestraTemperaturaTanque = varianzaMuestraTemperaturaTanque ** .5
    let zcTemperaturaTanque = calZc(mediaMuestraTemperaturaTanque, mediaTemperaturaTanque, desvEstMuestraTemperaturaTanque, tamanioMuestraTemperaturaTanque)
    let imgTemperaturaTanque = setImg(zcTemperaturaTanque)
    ///////////////////////////////////////////////////
    let marcaClaseArregloNivelHumedad = getMarcaClaseOrFrecuencia(arregloNivelHumedad, "marcaClase")
    let frecuenciaArregloNivelHumedad = getMarcaClaseOrFrecuencia(arregloNivelHumedad, "frecuencia")
    let numeroElementosNivelHumedad = getNumeroElementos(arregloNivelHumedad)
    let mediaNivelHumedad = media(marcaClaseArregloNivelHumedad, frecuenciaArregloNivelHumedad, numeroElementosNivelHumedad)
    let varianzaNivelHumedad = calcVarianza(marcaClaseArregloNivelHumedad, frecuenciaArregloNivelHumedad, mediaNivelHumedad, numeroElementosNivelHumedad)
    let tamanioMuestraNivelHumedad = calcTamanioMuestra(varianzaNivelHumedad ** (1 / 2), numeroElementosNivelHumedad)

    let rawMuestraNivelHumedad = getMuestra(rawNivelHumedad, tamanioMuestraNivelHumedad)
    let arregloMuestraNivelHumedad = getArrayJSON(rawMuestraNivelHumedad)
    let marcaClaseArregloMuestraNivelHumedad = getMarcaClaseOrFrecuencia(arregloMuestraNivelHumedad, "marcaClase")
    let frecuenciaArregloMuestraNivelHumedad = getMarcaClaseOrFrecuencia(arregloMuestraNivelHumedad, "frecuencia")
    let numeroElementosMuestraNivelHumedad = getNumeroElementos(arregloMuestraNivelHumedad)
    let mediaMuestraNivelHumedad = media(marcaClaseArregloMuestraNivelHumedad, frecuenciaArregloMuestraNivelHumedad, numeroElementosMuestraNivelHumedad)
    let varianzaMuestraNivelHumedad = calcVarianza(marcaClaseArregloMuestraNivelHumedad, frecuenciaArregloMuestraNivelHumedad, mediaMuestraNivelHumedad, numeroElementosMuestraNivelHumedad)
    let desvEstMuestraNivelHumedad = varianzaMuestraNivelHumedad ** .5
    let zcNivelHumedad = calZc(mediaMuestraNivelHumedad, mediaNivelHumedad, desvEstMuestraNivelHumedad, tamanioMuestraNivelHumedad)
    let imgNivelHumedad = setImg(zcNivelHumedad)

    ///////////////////////////////////////////////////
    let marcaClaseArregloTemperaturaAmbiente = getMarcaClaseOrFrecuencia(arregloTemperaturaAmbiente, "marcaClase")
    let frecuenciaArregloTemperaturaAmbiente = getMarcaClaseOrFrecuencia(arregloTemperaturaAmbiente, "frecuencia")
    let numeroElementosTemperaturaAmbiente = getNumeroElementos(arregloTemperaturaAmbiente)
    let mediaTemperaturaAmbiente = media(marcaClaseArregloTemperaturaAmbiente, frecuenciaArregloTemperaturaAmbiente, numeroElementosTemperaturaAmbiente)
    let varianzaTemperaturaAmbiente = calcVarianza(marcaClaseArregloTemperaturaAmbiente, frecuenciaArregloTemperaturaAmbiente, mediaTemperaturaAmbiente, numeroElementosTemperaturaAmbiente)
    let tamanioMuestraTemperaturaAmbiente = calcTamanioMuestra(varianzaTemperaturaAmbiente ** (1 / 2), numeroElementosTemperaturaAmbiente)

    let rawMuestraTemperaturaAmbiente = getMuestra(rawTemperaturaAmbiente, tamanioMuestraTemperaturaAmbiente)
    let arregloMuestraTemperaturaAmbiente = getArrayJSON(rawMuestraTemperaturaAmbiente)
    let marcaClaseArregloMuestraTemperaturaAmbiente = getMarcaClaseOrFrecuencia(arregloMuestraTemperaturaAmbiente, "marcaClase")
    let frecuenciaArregloMuestraTemperaturaAmbiente = getMarcaClaseOrFrecuencia(arregloMuestraTemperaturaAmbiente, "frecuencia")
    let numeroElementosMuestraTemperaturaAmbiente = getNumeroElementos(arregloMuestraTemperaturaAmbiente)
    let mediaMuestraTemperaturaAmbiente = media(marcaClaseArregloMuestraTemperaturaAmbiente, frecuenciaArregloMuestraTemperaturaAmbiente, numeroElementosMuestraTemperaturaAmbiente)
    let varianzaMuestraTemperaturaAmbiente = calcVarianza(marcaClaseArregloMuestraTemperaturaAmbiente, frecuenciaArregloMuestraTemperaturaAmbiente, mediaMuestraTemperaturaAmbiente, numeroElementosMuestraTemperaturaAmbiente)
    let desvEstMuestraTemperaturaAmbiente = varianzaMuestraTemperaturaAmbiente ** .5
    let zcTemperaturaAmbiente = calZc(mediaMuestraTemperaturaAmbiente, mediaTemperaturaAmbiente, desvEstMuestraTemperaturaAmbiente, tamanioMuestraTemperaturaAmbiente)
    let imgTemperaturaAmbiente = setImg(zcTemperaturaAmbiente)


    return (
        <div className="NonChart_Container" id="Reporte">

            <div className="RiegosHoy_Cuadro">
                <h1 className="NonChart_Title">Información Guardada</h1>
                <table >
                    <tbody>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Nivel<br></br>del<br></br>tanque</th>
                        <th>Temperatura<br></br>Tanque</th>
                        <th>Nivel<br></br>de<br></br>humedad</th>
                        <th>Temperatura<br></br>ambiente</th>
                        <th>Fue<br></br>riego</th>
                        {props.data.map(({ fecha, fue_riego, hora, id, nivel_humedad, nivel_tanque, temperatura_ambiente, temperatura_tanque }) => (
                            <tr key={id}>
                                <td>{fecha}</td>
                                <td>{hora}</td>
                                <td>{nivel_tanque}</td>
                                <td>{temperatura_tanque}</td>
                                <td>{nivel_humedad}</td>
                                <td>{temperatura_ambiente}</td>
                                <td>{fue_riego}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h1 className="NonChart_Title">Tabla de datos agrupados<br></br>Temperatura del tanque</h1>
                <table >
                    <tbody>
                        <th>LimI</th>
                        <th>LimS</th>
                        <th>Marca<br></br>de<br></br>Clase</th>
                        <th>Frecuencia</th>
                        {arregloTemperaturaTanque.map(({ id, limI, limS, marcaClase, frecuencia }) => (
                            <tr key={id}>
                                <td>{limI}</td>
                                <td>{limS}</td>
                                <td>{marcaClase}</td>
                                <td>{frecuencia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                Usando la Tabla de Datos Agrupados de la Temperatura del Tanque<br></br> podemos calcular la media de los datos, resultando en: {mediaTemperaturaTanque}
                <br></br>
                <br></br>
                <table >
                    <tbody>
                        <th>LimI</th>
                        <th>LimS</th>
                        <th>Marca<br></br>de<br></br>Clase</th>
                        <th>Frecuencia</th>
                        {arregloMuestraTemperaturaTanque.map(({ id, limI, limS, marcaClase, frecuencia }) => (
                            <tr key={id}>
                                <td>{limI}</td>
                                <td>{limS}</td>
                                <td>{marcaClase}</td>
                                <td>{frecuencia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                Se usara una muestra de {tamanioMuestraTemperaturaTanque} elementos.
                <br></br>
                El promedio de la muestra es de {mediaMuestraTemperaturaTanque}
                <br></br>
                La varianza de la muestra es de {varianzaMuestraTemperaturaTanque}
                <br></br>
                La hipotesis original (H0) establece que la la Temperatura del Tanque es igual a {mediaTemperaturaTanque}
                <br></br>
                La hipotesis alternativa (H1) establece que la Temperatura del Tanque es diferente a {mediaTemperaturaTanque}
                <br></br>
                Se considera el margen de error igual al 5% (.05).
                <br></br>
                Se considera al nivel de confianza igual al 95% (.95).
                <br></br>
                <br></br>
                <ImgTabla img={imgTemperaturaTanque} Zc={zcTemperaturaTanque} />
                <br></br>

                <h1 className="NonChart_Title">Tabla de datos agrupados<br></br>Nivel de Humedad</h1>
                <table >
                    <tbody>
                        <th>LimI</th>
                        <th>LimS</th>
                        <th>Marca<br></br>de<br></br>Clase</th>
                        <th>Frecuencia</th>
                        {arregloNivelHumedad.map(({ id, limI, limS, marcaClase, frecuencia }) => (
                            <tr key={id}>
                                <td>{limI}</td>
                                <td>{limS}</td>
                                <td>{marcaClase}</td>
                                <td>{frecuencia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                Usando la Tabla de Datos Agrupados de la Nivel de Humedad <br></br>podemos calcular la media de los datos, resultando en: {mediaNivelHumedad}
                <br></br>
                <br></br>
                <table >
                    <tbody>
                        <th>LimI</th>
                        <th>LimS</th>
                        <th>Marca<br></br>de<br></br>Clase</th>
                        <th>Frecuencia</th>
                        {arregloMuestraNivelHumedad.map(({ id, limI, limS, marcaClase, frecuencia }) => (
                            <tr key={id}>
                                <td>{limI}</td>
                                <td>{limS}</td>
                                <td>{marcaClase}</td>
                                <td>{frecuencia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                Se usara una muestra de {tamanioMuestraNivelHumedad} elementos.
                <br></br>
                El promedio de la muestra es de {mediaMuestraNivelHumedad}
                <br></br>
                La varianza de la muestra es de {varianzaMuestraNivelHumedad}
                <br></br>
                La hipotesis original (H0) establece que la la Nivel de Humedad es igual a {mediaNivelHumedad}
                <br></br>
                La hipotesis alternativa (H1) establece que la Nivel de Humedad es diferente a {mediaNivelHumedad}
                <br></br>
                Se considera el margen de error igual al 5% (.05).
                <br></br>
                Se considera al nivel de confianza igual al 95% (.95).
                <br></br>
                <br></br>
                <ImgTabla img={imgNivelHumedad} Zc={zcNivelHumedad} />
                <br></br>

                <h1 className="NonChart_Title">Tabla de datos agrupados<br></br>Temperatura Ambiente</h1>
                <table >
                    <tbody>
                        <th>LimI</th>
                        <th>LimS</th>
                        <th>Marca<br></br>de<br></br>Clase</th>
                        <th>Frecuencia</th>
                        {arregloTemperaturaAmbiente.map(({ id, limI, limS, marcaClase, frecuencia }) => (
                            <tr key={id}>
                                <td>{limI}</td>
                                <td>{limS}</td>
                                <td>{marcaClase}</td>
                                <td>{frecuencia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                Usando la Tabla de Datos Agrupados de la Temperatura Ambiente<br></br> podemos calcular la media de los datos, resultando en: {mediaTemperaturaAmbiente}
                <br></br>
                <br></br>
                <table >
                    <tbody>
                        <th>LimI</th>
                        <th>LimS</th>
                        <th>Marca<br></br>de<br></br>Clase</th>
                        <th>Frecuencia</th>
                        {arregloMuestraTemperaturaAmbiente.map(({ id, limI, limS, marcaClase, frecuencia }) => (
                            <tr key={id}>
                                <td>{limI}</td>
                                <td>{limS}</td>
                                <td>{marcaClase}</td>
                                <td>{frecuencia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                Se usara una muestra de {tamanioMuestraTemperaturaAmbiente} elementos.
                <br></br>
                El promedio de la muestra es de {mediaMuestraTemperaturaAmbiente}
                <br></br>
                La varianza de la muestra es de {varianzaMuestraTemperaturaAmbiente}
                <br></br>
                La hipotesis original (H0) establece que la la Temperatura Ambiente es igual a {mediaTemperaturaAmbiente}
                <br></br>
                La hipotesis alternativa (H1) establece que la Temperatura Ambiente es diferente a {mediaTemperaturaAmbiente}
                <br></br>
                Se considera el margen de error igual al 5% (.05).
                <br></br>
                Se considera al nivel de confianza igual al 95% (.95).
                <br></br>
                <br></br>
                <ImgTabla img={imgTemperaturaAmbiente} Zc={zcTemperaturaAmbiente} />
                <br></br>

            </div>
        </div>
    )
}