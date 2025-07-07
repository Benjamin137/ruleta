class Ruleta_Americana {

    _numeros = [];
    _numeroActual = {
        valor: null, // Valor del número actual
        color: null // Color del número actual
    };

    _apuestas = {
        color: {
            monto: 0,
            valor: null,
            valores_validos: ["rojo", "negro"] // valores apostados
        },
        paridad: {
            monto: 0,
            valor: null, // valor apostado: "par", "impar"
            valores_validos: ["par", "impar"] // valores apostados
        },
        alto_bajo: {
            monto: 0,
            valor: null, // valor apostado: "bajo" (1-18), "
            valores_validos: ["bajo", "alto"] // valores apostados
        },
        docena: {
            monto: 0,
            valor: null, // valor apostado: 1, 2, 3 (1-12, 13-24, 25-36)
            valores_validos: [1, 2, 3] // valores apostados
        },
        columna: {
            monto: 0,
            valor: null, // valor apostado: 1, 2, 3 (columna 1, 2, 3)  
            valores_validos: [1, 2, 3] // valores apostados
        },
        numero: {
            monto: 0,
            valor: null // valor apostado: número del 0 al 36
        }

    };

    constructor() {
        this._numeros = this._generarNumeros();
    }

    _generarNumeros() {
        const numeros = [];

        // Agregamos 0 y 00 (verdes)
        numeros.push({ valor: "0", color: "verde" });
        numeros.push({ valor: "00", color: "verde" });

        const rojos = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

        for (let i = 1; i <= 36; i++) {
            let color = rojos.has(i) ? "rojo" : "negro";
            numeros.push({ valor: i.toString(), color });
        }

        return numeros;
    }

    // Puedes añadir métodos como girar la ruleta
    girar() {
        const randomIndex = Math.floor(Math.random() * this._numeros.length);
        this._numeroActual = this._numeros[randomIndex];
    }

    // Obtener todos los números (opcional)
    obtenerNumeros() {
        return this._numeros;
    }

    apostarRojo(monto) {
        this._apuestas.color.monto += monto;
        this._apuestas.color.valor = "rojo"; // Apostar a rojo
    }

    apostarNegro(monto) {
        this._apuestas.color.monto += monto;
        this._apuestas.color.valor = "negro";
    }

    apostarPar(monto) {
        this._apuestas.paridad.monto += monto;
        this._apuestas.paridad.valor = "par"; // Apostar a par
    }

    apostarImpar(monto) {
        this._apuestas.paridad.monto += monto;
        this._apuestas.paridad.valor = "impar"; // Apostar a impar
    }

    apostarAlto(monto) {
        this._apuestas.alto_bajo.monto += monto;
        this._apuestas.alto_bajo.valor = "alto"; // Apostar a alto
    }

    apostarBajo(monto) {
        this._apuestas.alto_bajo.monto += monto;
        this._apuestas.alto_bajo.valor = "bajo"; // Apostar a bajo
    }

    apostar1thDocena(monto) {
        this._apuestas.docena.monto += monto;
        this._apuestas.docena.valor = 1; // Apostar a la primera docena (1-12)
    }

    apostar2thDocena(monto) {
        this._apuestas.docena.monto += monto;
        this._apuestas.docena.valor = 2; // Apostar a la segunda docena (13-24)
    }

    apostar3thDocena(monto) {
        this._apuestas.docena.monto += monto;
        this._apuestas.docena.valor = 3; // Apostar a la tercera docena (25-36)
    }

    apostarColumna1(monto) {
        this._apuestas.columna.monto += monto;
        this._apuestas.columna.valor = 1; // Apostar a la primera columna
    }
    apostarColumna2(monto) {
        this._apuestas.columna.monto += monto;
        this._apuestas.columna.valor = 2; // Apostar a la segunda columna
    }

    apostarColumna3(monto) {
        this._apuestas.columna.monto += monto;
        this._apuestas.columna.valor = 3; // Apostar a la tercera columna
    }


    apostarNumero(numero, monto) {
        if (numero < 0 || numero > 36) {
            throw new Error("Número inválido. Debe estar entre 0 y 36.");
        }
        this._apuestas.numero.monto += monto;
        this._apuestas.numero.valor = numero; // Apostar a un número específico
    }

    resultado() {
        if (!this._numeroActual) {
            throw new Error("La ruleta no ha sido girada.");
        }

        const numero = this._numeroActual.valor;
        const color = this._numeroActual.color;

        // Verificar apuestas
        const resultados = {
            numero: null,
            color: null,
            paridad: null,
            alto_bajo: null,
            docena: null,
            columna: null
        };

        // Verificar apuesta al número
        if (this._apuestas.numero.valor == numero) {
            resultados.numero = { ganado: true, monto: this._apuestas.numero.monto * 35 };
        } else {
            resultados.numero = { ganado: false, monto: 0 };
        }

        // Verificar apuesta de color
        if (this._apuestas.color.valor === color) {
            resultados.color = { ganado: true, monto: this._apuestas.color.monto * 2 };
        } else {
            resultados.color = { ganado: false, monto: 0 };
        }

        // Verificar apuesta de paridad
        if ((numero % 2 === 0 && this._apuestas.paridad.valor === "par") || (numero % 2 !== 0 && this._apuestas.paridad.valor === "impar")) {
            resultados.paridad = { ganado: true, monto: this._apuestas.paridad.monto * 2 };
        } else {
            resultados.paridad = { ganado: false, monto: 0 };
        }

        // Verificar apuesta alto/bajo
        if ((numero >= 1 && numero <= 18 && this._apuestas.alto_bajo.valor === "bajo") || (numero >= 19 && numero <= 36 && this._apuestas.alto_bajo.valor === "alto")) {
            resultados.alto_bajo = { ganado: true, monto: this._apuestas.alto_bajo.monto * 2 };
        } else {
            resultados.alto_bajo = { ganado: false, monto: 0 };
        }

        // Verificar apuesta de docena
        if ((numero >= 1 && numero <= 12 && this._apuestas.docena.valor === 1) ||
            (numero >= 13 && numero <= 24 && this._apuestas.docena.valor === 2) ||
            (numero >= 25 && numero <= 36 && this._apuestas.docena.valor === 3)) {
            
                resultados.docena = { ganado: true, monto: this._apuestas.docena.monto * 3 };

        } else {
            resultados.docena = { ganado: false, monto: 0 };
        }

        // Verificar apuesta de columna
        const columnaIndex = (numero - 1) % 3 + 1; // Determina la columna del número
        if (this._apuestas.columna.valor === columnaIndex) {
            resultados.columna = { ganado: true, monto: this._apuestas.columna.monto * 3 };
        }else {
            resultados.columna = { ganado: false, monto: 0 };
        }

        // Resetear apuestas después de calcular resultados
        for (const key in this._apuestas) {
            this._apuestas[key].monto = 0;
            this._apuestas[key].valor = null;
        }

        return {
            numero: numero,
            color: color,
            resultados: resultados
        };

    }



}

export default Ruleta_Americana;