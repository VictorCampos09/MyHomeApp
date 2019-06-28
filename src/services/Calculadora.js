/**
 * Database
 *
 * @export
 * @class Database
 */
export default class Calculadora {
  /**
   * Cria uma instância singleton da classe Calculadora.
   *
   * @static
   * @param {'string'} dado
   * @returns {'string'} retorno
   * @memberof Calculadora
   */
  static appendNum(primeiro, dado) {
    if (primeiro === '0') {
      primeiro = '';
    }
    const value = `${primeiro}${dado}`;
    return value;
  }

  static clearNum() {
    const retorno = '0';
    return retorno;
  }

  static corrigeNum(primeiro) {
    const retorno = `${primeiro}`.substr(0, `${primeiro}`.length - 1);
    return `${retorno}`;
  }

  static calculaResultado(operacoes) {
    let result;
    result = eval((result = operacoes));
    //   const valores = operacoes.split(' ');
    //  valores.forEach((element, indice, array) => {
    //   if (!result) {
    //     result = element;
    //   }
    //   if (indice % 2 !== 0 && !(indice > array.length - 1)) {
    //     switch (element) {
    //       case '+':
    //         result = parseFloat(result) + parseFloat(array[indice + 1]);
    //         break;
    //       case '-':
    //         result = parseFloat(result) - parseFloat(array[indice + 1]);
    //         break;
    //       case '/':
    //         result = parseFloat(result) / parseFloat(array[indice + 1]);
    //         break;
    //       case '*':
    //         result = parseFloat(result) * parseFloat(array[indice + 1]);
    //         break;
    //       default:
    //         result;
    //     }
    //   }
    // });
    return result;
  }
}
