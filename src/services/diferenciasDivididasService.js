import { rationalize } from "mathjs";

function calcR2(polinomio, coor) {
    console.log(polinomio, coor);
    let promedioY = coor.reduce((sum, item) => sum + item.x, 0) / coor.length;
    let valoresXEvaluados = coor.map(item => polinomio.evaluate({ x: item.x }));
    let yr = coor.map((coordenada) => {
        return (coordenada.y - promedioY) ** 2;
    })
    let yc = valoresXEvaluados.map((valor) => {
        return (valor - promedioY) ** 2;
    })

    return (yr.reduce((sum, item) => sum + item, 0) / yc.reduce((sum, item) => sum + item, 0));
}

const coordenadas = [
    [-2, -18],
    [-1, -5],
    [0, -2],
    [2, -2],
    [3, 7],
    [6, 142]
]

function calcDiferencia(fx1, fx2, x1, x2) {
    const diferencia = (fx2 - fx1) / (x2 - x1);
    return diferencia;
}

function calcDiferenciaRecursiva(diferencias = [[]]) {
    if (diferencias.length === 1) {
        coordenadas.forEach(([x1, fx1], index) => {
            if (index !== coordenadas.length - 1) {
                const [x2, fx2] = coordenadas[index + 1];
                const diferencia = (fx2 - fx1) / (x2 - x1);
                diferencias.at(-1).push(diferencia);
            }
        });
    } else {
        diferencias[diferencias.length - 2].forEach((fx1, index) => {
            if (index !== diferencias[diferencias.length - 2].length - 1) {
                const fx2 = diferencias[diferencias.length - 2][index + 1];
                const [x1] = coordenadas[index];
                const [x2] = coordenadas[(index + 1) + diferencias.length - 1];
                const diferencia = (fx2 - fx1) / (x2 - x1);
                diferencias.at(-1).push(diferencia);
            }
        });

    }
    if (diferencias.at(-1).length === 1) {
        return diferencias;
    }
    diferencias.push([]);
    return calcDiferenciaRecursiva(diferencias);
}

function getValueA(diferencias) {
    return diferencias.map(diferencia => diferencia[0]);
}

function calcPolinomio() {
    const diferencias = calcDiferenciaRecursiva();
    const p = [];
    const listA = getValueA(diferencias);
    const firstStep = rationalize(`${coordenadas[0][1]} + ${listA[0]}(x - ${coordenadas[0][0]})`).toString();
    for (let index = 1; index < 3; index++) {
        let step = listA[index];
        for (let i = 0; i <= index; i++) {
            if (i == 2) {
                step += `(x)`;
            } else {
                step += `(x-${coordenadas[i][0]})`;
            }
        }

        p.push(`${step}`);
    }
    const resultP = rationalize(`${p.join(' + ')}`).toString();
    return rationalize(`${firstStep} + ${p.join(' + ')}`);
    //-18+13(x+2)-5(x+2)(x+1)+(x+2)(x+1)(x)
}

export default function calcDiferenciasDividas() {
    const polinomio = calcPolinomio();
    const r2 = calcR2(polinomio, coordenadas.map((item) => {
        return { x: item[0], y: item[1] }
    }));
    let options = { parenthesis: 'keep', implicit: 'hide' }

    return { polinomio: polinomio.toHTML(options), r2 };
}

