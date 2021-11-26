import { useState } from "react";

function FormLagrange({ getValues }) {
    const [coordenadas, setCoordenadas] = useState([""]);

    const decreatCoordenadas = () => {
        let newCoordenadas = [...coordenadas];
        newCoordenadas.pop();
        setCoordenadas(newCoordenadas);
    };
    const increaseCoordenadas = () => {
        let newCoordenadas = [...coordenadas, ""];
        setCoordenadas(newCoordenadas);
    };

    const handleChangeCoordenadas = (event, index) => {
        const newCoordenadas = [...coordenadas];
        newCoordenadas[index] = event.trim();
        setCoordenadas(newCoordenadas);
        getValues(newCoordenadas);
    };

    return (
        <>
            <h1>Coordenadas</h1>
            <div className="buttons">
                <button
                    type="button"
                    className="button is-danger"
                    onClick={decreatCoordenadas}
                >
                    -
                </button>
                <button
                    type="button"
                    className="button is-primary"
                    onClick={increaseCoordenadas}
                >
                    +
                </button>
            </div>
            <div className="columns">
                {coordenadas.map((coordenada, index) => (
                    <div className="column" key={index}>
                        <div className="field">
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="x , y"
                                    value={coordenada}
                                    onChange={(e) =>
                                        handleChangeCoordenadas(
                                            e.target.value,
                                            index
                                        )
                                    }
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default FormLagrange;
