class Jugador{

    monto = 0;
    nombre = "";
    _ultimaApuesta = null;

    constructor(nombre, montoInicial) {
        this.nombre = nombre;
        this.monto = montoInicial;
    }

    apostar(monto) {
        if (monto > this.monto) {
            throw new Error("Monto apostado excede el saldo del jugador.");
        }
        this.monto -= monto;
        this._ultimaApuesta = monto;
        return monto;
    }

    recibirGanancias(monto) {
        this.monto += monto;
    }

    doblarApuesta() {
        if (this._ultimaApuesta === null || this.monto < this._ultimaApuesta * 2) {
            throw new Error("No se puede doblar la apuesta.");
        }
        this.monto -= this._ultimaApuesta; // Retirar la apuesta actual
        this._ultimaApuesta *= 2; // Doblar la apuesta
        return this._ultimaApuesta;
    }
}

export default Jugador;