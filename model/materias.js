function Materia(nombre) {
    this.nombre = nombre;
    this.notas = [];
    this.equals = function(otra_materia) {
        if (this.nombre !== otra_materia.nombre || this.notas.length !== otra_materia.notas.length)
            return false;
        else
            for (j=0; j<this.notas.length; j++)
                if (this.notas[j] !== otra_materia.notas[j])
                    return false;
            return true;
    }
}

module.exports = Materia;