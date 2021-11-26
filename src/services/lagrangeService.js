import { rationalize } from 'mathjs';
let n = 0;
let i = [];
let j = [];
let coordenadas = [];
let li = [];
let promedioY = 0;
let valoresXEvaluados = [];

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
    return rationalize(p.join(' + '));
}

function calcularR2(polinomio) {
    promedioY = coordenadas.reduce((sum, item) => sum + item.x, 0) / n;
    valoresXEvaluados = coordenadas.map(item => polinomio.evaluate({ x: item.x }));
    let yr = coordenadas.map((coordenada) => {
        return (coordenada.y - promedioY) ** 2;
    })
    let yc = valoresXEvaluados.map((valor) => {
        return (valor - promedioY) ** 2;
    })

    return (yr.reduce((sum, item) => sum + item, 0) / yc.reduce((sum, item) => sum + item, 0));
}

function reset() {
    n = 0;
    i = [];
    j = [];
    coordenadas = [];
    li = [];
    promedioY = 0;
    valoresXEvaluados = [];
}

export default function calcLagrange(initialValues) {
    getInitialValues(initialValues);
    calcLi();
    const result = calcPolinomio();
    const r2 = calcularR2(result);
    reset();
    let options = { parenthesis: 'keep', implicit: 'hide' }
    return {
        polinomio: result.toHTML(options),
        r2
    };
}

