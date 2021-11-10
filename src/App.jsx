import { useState } from "react";
import "bulma/css/bulma.min.css";
import "./styles/App.css";

import FormMethod from "./components/FormMethod";
import { calcIterationsBiseccion } from "./services/biseccionService";
import TableBiseccion from "./components/TableBiseccion";
import { calcIterationsNewton } from "./services/newtonService";
import TableNewton from "./components/TableNewton";
import calcLagrange from "./services/lagrangeService";

function App() {
    const [iterations, setIterations] = useState([]);
    const [method, setMethod] = useState(null);

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
            calcLagrange(params.coordenadas);
        } else {
            setIterations([]);
            setMethod(null);
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
        </div>
    );
}

export default App;
