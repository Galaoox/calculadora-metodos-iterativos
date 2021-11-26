export const TableAproximacionPolinomial = ({ coordenadas }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">P</th>
                    <th scope="col">T</th>
                    <th scope="col">T(c)</th>
                </tr>
            </thead>
            <tbody>
                {coordenadas.map((coordenada, index) => (
                    <tr key={index}>
                        <th scope="row">{coordenada.p}</th>
                        <th scope="row">{coordenada.t}</th>
                        <th scope="row">{coordenada.t}</th>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
