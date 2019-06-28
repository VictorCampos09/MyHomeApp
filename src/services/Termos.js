import AsyncStorage from '@react-native-community/async-storage';

import db from './Database';

/**
 * Termos
 *
 * @export
 * @class Termos
 */
export default class Termos {
  /**
   * Cria uma instância singleton da classe Termos.
   * @memberof Termos
   */
  constructor() {
    if (!Termos.instance) {
      Termos.instance = this;
    }

    return Termos.instance;
  }

  /**
   * isAceiteTermos
   *
   * @static
   * @returns {boolean}
   * @memberof Termos
   */
  static async isAceiteTermos() {
    try {
      const { aceiteLocal } = JSON.parse(await AsyncStorage.getItem('aceiteTermos'));
      const aceiteUsuario = await db.recuperar('aceiteTermo');

      if (aceiteLocal || aceiteUsuario) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * isAceiteTemosLocal
   *
   * @static
   * @returns {boolean}
   * @memberof Termos
   */
  static async isAceiteTermosLocal() {
    try {
      const { aceiteLocal } = JSON.parse(await AsyncStorage.getItem('aceiteTermos'));

      if (aceiteLocal) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * isAceiteTermosUsuario
   *
   * @static
   * @returns {boolean}
   * @memberof Termos
   */
  static async isAceiteTermosUsuario() {
    try {
      const aceiteUsuario = await db.recuperar('aceiteTermo');

      if (aceiteUsuario) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * aceitarTermos
   *
   * @static
   * @returns {boolean}
   * @memberof Termos
   */
  async aceitarTermos() {
    try {
      const data = new Date();
      this.aceiteRecente = true;
      const aceite = { aceiteLocal: true };
      const obj = JSON.stringify(aceite);
      await AsyncStorage.setItem('aceiteTermos', obj);
      await db.gravar('aceiteTermo', true);
      await db.gravar('aceiteTermoData', data);
      return true;
    } catch (error) {
      return false;
    }
  }
}
