import React from "react";

export const TableLagrange = ({ coordenadas }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">X</th>
                    <th scope="col">Y</th>
                </tr>
            </thead>
            <tbody>
                {coordenadas.map((coordenada, index) => (
                    <tr key={index}>
                        <th scope="row">{coordenada.x}</th>
                        <th scope="row">{coordenada.y}</th>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
