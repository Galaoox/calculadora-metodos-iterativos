
export default function calcular(arreglo, a) {
    let elemento0;
    let elemento1;
    let sumatoria = 0;
    let resultado = [];
    for (let index = 0; index < arreglo.length; index++) {
        const element = arreglo[index + 1];
        sumatoria = sumatoria + arreglo[index].t;
        if (arreglo[index].p <= a && element.p >= a) {
            elemento0 = arreglo[index];
            elemento1 = element;
        }
    }
    let promedio = sumatoria / arreglo.length;
    for (let index = 0; index < arreglo.length; index++) {
        resultado.push(Math.pow(arreglo[index].t - promedio, 2));
    }
    let r2 = resultado.reduce((a, b) => a + b, 0);
    let formula = (elemento1.t - elemento0.t) / (elemento1.p - elemento0.p) * (a - elemento0.p) + elemento0.t;
    // if (formula && r2) {
    //     document.getElementById("resultado").innerHTML = `Temperatura = ${formula}`;
    //     document.getElementById("r2").innerHTML = `R2 = ${r2}`;
    // }
    return {
        r2,
        formula
    }
}