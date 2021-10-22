import { parse } from "mathjs";
import { messageAlert } from "./sharedService";

let eq;

const validateErrorBiseccion = (iterations) => Math.abs(iterations.at(-1)['f(p)']) < 0.000001;

const f = (x) => eq.evaluate({ x: x });

const validateHasRaiz = (iterations, iteration) => {
    if (!iterations.length && Math.sign(iteration['f(a)']) === Math.sign(iteration['f(b)'])) {
        throw "SinRaiz";
    }
}

const calBiseccion = (a, b, iterations) => {
    let iteration = {
        'a': null,
        'b': null,
        'p': null,
        'f(p)': null,
        'f(a)': null,
        'f(b)': null,
    };
    if (!iterations.length) {
        iteration['a'] = a; iteration['b'] = b;
    } else {
        const lastIteration = iterations.at(-1);
        if (lastIteration["f(a)"] * lastIteration["f(p)"] < 0) {
            iteration['a'] = lastIteration['a'];
            iteration['b'] = lastIteration['p'];
        }
        if (lastIteration["f(b)"] * lastIteration["f(p)"] < 0) {
            iteration['b'] = lastIteration['b'];
            iteration['a'] = lastIteration['p'];
        }
        validateHasRaiz(iterations, lastIteration);
    }

    iteration['f(a)'] = f(iteration['a']);
    iteration['f(b)'] = f(iteration['b']);
    validateHasRaiz(iterations, iteration);
    iteration['p'] = (iteration['a'] + iteration['b']) / 2;
    iteration['f(p)'] = f(iteration['p']);
    return iteration;
}

export function calcIterationsBiseccion(equation, a, b) {
    let error = false;
    let iterations = [];
    eq = parse(equation);
    while (!error) {
        try {
            iterations.push(calBiseccion(a, b, iterations));
            error = validateErrorBiseccion(iterations);
        } catch (exception) {
            if (exception === 'SinRaiz') {
                messageAlert('error', 'No hay raiz entre los dos puntos');
                error = true;
            } else {
                error = true;
                // no se puede manejar esta excepción, así que se vuelve a <lanzar></lanzar>
            }
        }

    }
    return iterations;
}


