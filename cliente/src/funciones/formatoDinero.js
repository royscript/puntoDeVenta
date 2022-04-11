const formatoDinero =  (valor) => {
  if(valor== null) return 0;
  if(isNaN(valor)) return 0;
  if(valor.length==0) return 0;
  if(valor=="") return 0;
  if(valor==" ") return 0;
  var entrada = String(valor).split(','),
    parteEntera = entrada[0].replace(/\./g, ''),
    parteDecimal = entrada[1],
    salida = parteEntera.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return salida + (parteDecimal !== undefined ? ',' + parteDecimal : '');
}
export default formatoDinero;