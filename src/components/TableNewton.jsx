const TableNewton = ({ iterations }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">I</th>
                    <th scope="col">XI-1</th>
                    <th scope="col">XI</th>
                    <th scope="col">F(XI-1)</th>
                    <th scope="col">F'(XI-1)</th>
                    <th scope="col">E</th>
                </tr>
            </thead>
            <tbody>
                {iterations.map((iteration, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <th scope="row">{iteration["xi-1"]}</th>
                        <th scope="row">{iteration["xi"]}</th>
                        <th scope="row">{iteration["f(Xi1)"]}</th>
                        <th scope="row">{iteration["f’(Xi1)"]}</th>
                        <th scope="row">{iteration["E"]}</th>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableNewton;
