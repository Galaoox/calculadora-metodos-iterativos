import { rationalize } from 'mathjs';
let n = 0;
let i = [];
let j = [];
let coordenadas = [];
let li = [];

function getInitialValues(initialValues) {
    coordenadas = initialValues;
    n = coordenadas.length;
    i = Array.from(Array(n).keys());
    j = Array.from(Array(n).keys());
}

function calcLi() {
    for (let index = 0; index < n; index++) {
        let expressionNumerador = [];
        let expressionDenominador = [];
        j.filter(x => x != index).forEach((item) => {
            expressionNumerador.push(`(x - ${coordenadas[item]['x']})`);
            expressionDenominador.push(`(${coordenadas[index]['x']} - ${coordenadas[item]['x']})`);
        });
        const numerador = expressionNumerador.join(' * ');
        const denominador = expressionDenominador.join(' * ');

        const result = rationalize(`(${numerador}) / (${denominador})`);
        li.push(result.toString());
    }
}

function calcPolinomio() {
    let p = [];
    for (let index = 0; index < n; index++) {
        p.push(rationalize(`(${coordenadas[index]['y']}) * (${li[index]})`).toString());
    }
    console.log(p);
    console.log(rationalize(p.join(' + ')).toString());
}

export default function calcLagrange(initialValues) {
    getInitialValues(initialValues);
    calcLi();
    calcPolinomio();
}
