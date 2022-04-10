export default  (input) => {
    input.addEventListener('input', (e) => {
        var entrada = e.target.value.split(','),
          parteEntera = entrada[0].replace(/\./g, ''),
          parteDecimal = entrada[1],
          salida = parteEntera.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
          
        e.target.value = salida + (parteDecimal !== undefined ? ',' + parteDecimal : '');
    }, false);
}
