import { useState, useCallback } from 'react';

const useRuletaAmericana = () => {

    const initialValueApuestas = {
        color: {
            apuestas: [
                // {
                //     monto: 0,
                //     valor: null
                // }
            ],
            valores_validos: ['rojo', 'negro']
        },
        paridad: {
            apuestas: [
                // {
                //     monto: 0,
                //     valor: null
                // }
            ],
            valores_validos: ['par', 'impar']
        },
        alto_bajo: {
            apuestas: [
                // {
                //     monto: 0,
                //     valor: null
                // }
            ],
            valores_validos: ['bajo', 'alto']
        },
        docena: {
            apuestas: [
                // {
                //     monto: 0,
                //     valor: null
                // }
            ],
            valores_validos: [1, 2, 3]
        },
        columna: { monto: 0, valor: null, valores_validos: [1, 2, 3] },
        numero: []
    }

    const generarNumeros = () => {
        const numeros = [
            { valor: '0', color: 'verde' },
            { valor: '00', color: 'verde' }
        ];
        const rojos = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

        for (let i = 1; i <= 36; i++) {
            const color = rojos.has(i) ? 'rojo' : 'negro';
            numeros.push({ valor: i.toString(), color });
        }
        return numeros;
    };

    const [numeros] = useState(generarNumeros);

    const [apuestas, setApuestas] = useState(initialValueApuestas);



    const girar = () => {
        const index = Math.floor(Math.random() * numeros.length);
        return numeros[index];
        // return { valor: 12, color: "rojo" };
    };
    const apostar = useCallback((tipo, valor, monto) => {
        setApuestas(prev => {
            if (tipo === 'numero') {
                return {
                    ...prev,
                    numero: [...prev.numero, { valor, monto }],
                };
            } else {
                return {
                    ...prev,
                    [tipo]: {
                        ...prev[tipo],
                        apuestas: [...(prev[tipo]?.apuestas || []), { monto, valor }],
                    },
                };
            }
        });
    }, []);

    const resultado = (numeroActual) => {
        if (!numeroActual) {
            throw new Error('La ruleta no ha sido girada.');
        }

        const numero = numeroActual.valor;
        const color = numeroActual.color;
        const resultados = {
            numero: null,
            color: null,
            paridad: null,
            alto_bajo: null,
            docena: null,
            columna: null
        };

        // Evaluar apuestas
        for (const apuesta of apuestas.numero) {
            if (apuesta.valor == numero) {
                resultados.numero = { ganado: true, monto: apuesta.monto * 35 };
            } else {
                resultados.numero = { ganado: false, monto: 0 };
            }
        }

        for (const apuesta of apuestas.color.apuestas) {
            if (apuesta.valor === color) {
                resultados.color = { ganado: true, monto: apuesta.monto * 2 };
            }
        }

        if ((numero % 2 === 0 && apuestas.paridad.valor === 'par') || (numero % 2 !== 0 && apuestas.paridad.valor === 'impar')) {
            resultados.paridad = { ganado: true, monto: apuestas.paridad.monto * 2 };
        } else {
            resultados.paridad = { ganado: false, monto: 0 };
        }

        const num = parseInt(numero);
        if ((num >= 1 && num <= 18 && apuestas.alto_bajo.valor === 'bajo') || (num >= 19 && num <= 36 && apuestas.alto_bajo.valor === 'alto')) {
            resultados.alto_bajo = { ganado: true, monto: apuestas.alto_bajo.monto * 2 };
        } else {
            resultados.alto_bajo = { ganado: false, monto: 0 };
        }


        for (const apuesta of apuestas.docena.apuestas) {
            if (((numero >= 1 && numero <= 12) && apuesta.valor == 1)
                || ((numero >= 13 && numero <= 24) && apuesta.valor == 2)
                || ((numero >= 25 && numero <= 36) && apuesta.valor == 3)) {
                resultados.docena = { ganado: true, monto: apuesta.monto * 3 };
            }
        }

        const columnaIndex = (num - 1) % 3 + 1;
        if (apuestas.columna.valor === columnaIndex) {
            resultados.columna = { ganado: true, monto: apuestas.columna.monto * 3 };
        } else {
            resultados.columna = { ganado: false, monto: 0 };
        }

        // Reset apuestas
        setApuestas(initialValueApuestas);

        return {
            numero,
            mis_apuestas: apuestas,
            color,
            resultados
        };
    };

    return {
        numeros,
        apuestas,
        girar,
        apostar,
        resultado
    };
};

export default useRuletaAmericana;
