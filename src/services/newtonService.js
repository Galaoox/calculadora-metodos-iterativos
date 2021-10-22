import { parse, derivative } from 'mathjs';
import { messageAlert } from './sharedService';

let eq;
const validateErrorNewton = (iterations) => iterations.at(-1)['E'] < 0.000001;

const calcF = (lastX) => eq.evaluate({ x: lastX });
const calcFp = (lastX) => derivative(eq, 'x').evaluate({ x: lastX });
const calcXi = (lastX, f, fp) => lastX - (f / fp);
const calcE = (xi, lastX) => Math.abs((xi - lastX) / xi);



const calNewton = (x0, lastIteration) => {
    let lastX = lastIteration && lastIteration['xi'] ? lastIteration['xi'] : x0;
    const f = calcF(lastX);
    const fp = calcFp(lastX);
    const xi = calcXi(lastX, f, fp);
    const E = calcE(xi, lastX);
    if (E == Number.POSITIVE_INFINITY || E == Number.NEGATIVE_INFINITY) {
        throw 'IsInfinity';
    }
    return {
        'xi-1': lastX,
        'xi': xi,
        'f(Xi1)': f,
        "f’(Xi1)": fp,
        'E': E
    };
}


export function calcIterationsNewton(equation, x0) {
    let error = false;
    let iterations = [];
    eq = parse(equation);
    while (!error) {
        try {
            iterations.push(calNewton(x0, iterations.at(-1)));
            error = validateErrorNewton(iterations);
        } catch (exception) {
            if (exception == 'IsInfinity') {
                messageAlert('error', 'El valor de E da infinito');
                error = true;
            }
        }
    }
    return iterations;
}