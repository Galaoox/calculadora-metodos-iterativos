import { useState } from "react";
import { parse } from "mathjs";
import Select from "react-select";

const FormMethod = ({ getParams, clearTable }) => {
    const rulesFields = {
        biseccion: {
            input1: {
                label: "Valor: a",
                placeholder: "Ingrese el valor de a",
            },
            input2: {
                label: "Valor: b",
                placeholder: "Ingrese el valor de b",
            },
        },
        newton: {
            input1: {
                label: "Valor: X0",
                placeholder: "Ingrese el valor de X0",
            },
        },
    };

    const [form, setForm] = useState({
        input1: "",
        input2: "",
        method: "",
        equation: "",
    });

    const [input1, setInput1] = useState(null);

    const [input2, setInput2] = useState(null);

    const options = [
        { value: "biseccion", label: "Biseccion" },
        { value: "newton", label: "Newton Raphson" },
        { value: "jacobi", label: "Jacobi" },
        { value: "gauss", label: "Gauss - seides" },
    ];

    const handleChangeForm = (value, field) => {
        setForm({ ...form, [field]: value });
    };

    const handleChangeMethod = (e) => {
        clearFormFieldsExceptMethod(e);
        validateMethodFields(e);
        clearTable();
    };

    const validateMethodFields = (e = null) => {
        const rule = rulesFields[e?.value];
        setInput1(rule?.input1 ? rule.input1 : null);
        setInput2(rule?.input2 ? rule.input2 : null);
    };

    const clearFormFieldsExceptMethod = (value) => {
        setForm({
            input1: "",
            input2: "",
            equation: form.equation,
            method: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validEquation = true;
        try {
            parse(form.equation);
        } catch (error) {
            validEquation = false;
        }
        if (validEquation) {
            getParams({
                ...form,
                input1: Number(form.input1),
                input2: Number(form.input2),
            });
        }
    };

    const clear = () => {
        clearTable();
        setForm({
            input1: "",
            input2: "",
            method: "",
            equation: "",
        });
        validateMethodFields();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-content">
                    <div className="content">
                        <div className="field">
                            <label className="label">Ecuacion</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Ingrese la ecuacion"
                                    value={form.equation}
                                    onChange={(e) =>
                                        handleChangeForm(
                                            e.target.value,
                                            "equation"
                                        )
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Metodo</label>
                            <div className="control">
                                <Select
                                    options={options}
                                    placeholder="Seleccione un metodo"
                                    value={form.method}
                                    onChange={handleChangeMethod}
                                    required
                                />
                            </div>
                        </div>
                        {input1 && (
                            <>
                                <div className="field">
                                    <label className="label">
                                        {input1.label}
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="number"
                                            placeholder={input1.placeholder}
                                            value={form.input1}
                                            required
                                            onChange={(e) =>
                                                handleChangeForm(
                                                    e.target.value,
                                                    "input1"
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {input2 && (
                            <>
                                <div className="field">
                                    <label className="label">
                                        {input2.label}
                                    </label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="number"
                                            placeholder={input2.placeholder}
                                            required
                                            value={form.input2}
                                            onChange={(e) =>
                                                handleChangeForm(
                                                    e.target.value,
                                                    "input2"
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <footer className="card-footer">
                    <button
                        type="submit"
                        className="button is-fullwidth is-link"
                    >
                        Calcular
                    </button>
                    <button
                        type="button"
                        className="button is-fullwidth is-danger"
                        onClick={clear}
                    >
                        Limpiar
                    </button>
                </footer>
            </div>
        </form>
    );
};

export default FormMethod;
