import { useState } from "react";
import "bulma/css/bulma.min.css";
import "./styles/App.css";

import FormMethod from "./components/FormMethod";
import { calcIterationsBiseccion } from "./services/biseccionService";
import TableBiseccion from "./components/TableBiseccion";
import { calcIterationsNewton } from "./services/newtonService";
import TableNewton from "./components/TableNewton";
import calcLagrange from "./services/lagrangeService";
import calcAproximacion from "./services/aproximacionPolinomialService";
import calcDiferencias from "./services/diferenciasDivididasService";

import { TableLagrange } from "./components/TableLagrange";
import { TableAproximacionPolinomial } from "./components/TableAproximacionPolinomial";
import { TableDiferenciasDivididas } from "./components/TableDiferenciasDivididas";

function App() {
    const [iterations, setIterations] = useState([]);
    const [method, setMethod] = useState(null);
    const [resultCoordenadas, setresultCoordenadas] = useState("");
    const [coordenadas, setCoordenadas] = useState([]);

    const getParams = (params) => {
        if (params.method.value === "biseccion") {
            setMethod(params.method.value);
            setIterations(
                calcIterationsBiseccion(
                    params.equation,
                    params.input1,
                    params.input2
                )
            );
        } else if (params.method.value === "newton") {
            setMethod(params.method.value);
            setIterations(calcIterationsNewton(params.equation, params.input1));
        } else if (params.method === "lagrange") {
            setMethod(params.method);
            setresultCoordenadas(calcLagrange(params.coordenadas));
            setCoordenadas(params.coordenadas);
        } else if (params.method === "aproximacion") {
            setMethod(params.method);
            setresultCoordenadas(
                calcAproximacion(params.coordenadas, params.input1)
            );
            setCoordenadas(params.coordenadas);
        } else if (params.method === "diferencias") {
            setMethod(params.method);
            setresultCoordenadas(calcDiferencias());
            setCoordenadas(params.coordenadas);
        } else {
            setIterations([]);
            setMethod(null);
            setCoordenadas([]);
        }
    };

    const clearTable = () => {
        setIterations([]);
        setMethod(null);
    };

    return (
        <div className="App">
            <section className="container has-background-link is-bold has-text-centered principal_banner is-fluid">
                <div className="hero-body">
                    <h1 className="title has-text-white	">Analisis Numerico</h1>
                    <h2 className="subtitle has-text-white	">
                        Metodos iterativos
                    </h2>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <h1 className="title">Metodo</h1>
                    <h2 className="subtitle">
                        Ingrese los datos del formulario
                    </h2>
                    <FormMethod getParams={getParams} clearTable={clearTable} />
                </div>
            </section>
            {method === "lagrange" && (
                <section className="footer">
                    <h1 className="title">Resultado</h1>
                    <div className="content ">
                        <TableLagrange coordenadas={coordenadas} />
                        <strong>Polinomio:</strong>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: resultCoordenadas.polinomio,
                            }}
                        ></div>
                        <strong>R2:{resultCoordenadas.r2}</strong>
                    </div>
                </section>
            )}

            {method === "aproximacion" && (
                <section className="footer">
                    <h1 className="title">Resultado</h1>
                    <div className="content ">
                        <TableAproximacionPolinomial
                            coordenadas={coordenadas}
                        />
                        <h2>Formula:{resultCoordenadas.formula}</h2>
                        <h2>R2:{resultCoordenadas.r2}</h2>
                    </div>
                </section>
            )}

            {method === "diferencias" && (
                <section className="footer">
                    <h1 className="title">Resultado</h1>
                    <div className="content ">
                        <TableDiferenciasDivididas
                            coordenadas={coordenadas.map((item) => {
                                return {
                                    x: item[0],
                                    y: item[1],
                                };
                            })}
                        />
                        <h2>Polinomio:</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: resultCoordenadas.polinomio,
                            }}
                        ></div>
                        <h2>R2:{resultCoordenadas.r2}</h2>
                    </div>
                </section>
            )}

            {!["lagrange", "aproximacion", "diferencias"].includes(method) && (
                <section className="footer">
                    <h1 className="title">Tabla</h1>
                    <div className="content ">
                        {method === "biseccion" && iterations.length > 0 && (
                            <TableBiseccion iterations={iterations} />
                        )}

                        {method === "newton" && iterations.length > 0 && (
                            <TableNewton iterations={iterations} />
                        )}

                        {(iterations?.length == 0 || !method) && (
                            <p>
                                <strong>No se hay datos</strong>
                            </p>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}

export default App;
