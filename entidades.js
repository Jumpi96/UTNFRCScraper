function Materia(nombre) {
    this.nombre = nombre;
    this.notas = [];
    this.equals = function(otra_materia) {
        if (this.nombre !== otra_materia.nombre)
            return false;
        else
            for (i=0; i<this.notas.length; i++)
                if (this.notas[i] !== otra_materia.notas[i])
                    return false;
            return true;
    }
}

module.exports = Materia;