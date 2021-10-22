const TableBiseccion = ({ iterations }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">I</th>
                    <th scope="col">a</th>
                    <th scope="col">b</th>
                    <th scope="col">p</th>
                    <th scope="col">f(p)</th>
                    <th scope="col">f(a)</th>
                    <th scope="col">f(b)</th>
                </tr>
            </thead>
            <tbody>
                {iterations.map((iteration, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <th scope="row">{iteration["a"]}</th>
                        <th scope="row">{iteration["b"]}</th>
                        <th scope="row">{iteration["p"]}</th>
                        <th scope="row">{iteration["f(p)"]}</th>
                        <th scope="row">{iteration["f(a)"]}</th>
                        <th scope="row">{iteration["f(b)"]}</th>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableBiseccion;
