import firebase from 'react-native-firebase';

import validaTipo from '../utils/validaTipo';

/**
 * Database
 *
 * @export
 * @class Database
 */
export default class Database {
  static async isTermsAccepted() {
    return true;
  }

  /**
   * getRef
   *
   * @static
   * @param {string} item
   * @returns {Object{firebase.database.ref}}
   * @memberof Database
   */
  static async getRef(item) {
    if (!validaTipo(item, 'string') || item.length === 0) {
      return false;
    }
    try {
      const db = firebase.database();
      const { uid } = firebase.auth().currentUser;
      const ref = db.ref(`users/${uid}/${item}`);

      return ref;
    } catch (e) {
      return false;
    }
  }

  /**
   * gravar
   *
   * @static
   * @param {string} chave
   * @param {any} dado
   * @returns {boolean}
   * @memberof Database
   */
  static async gravar(chave, dado) {
    if (!validaTipo(chave, 'string')) {
      return false;
    }
    if (!dado) {
      return false;
    }
    try {
      const ref = await this.getRef(chave);
      await ref.set(dado);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * recuperar
   *
   * @static
   * @param {string} chave
   * @returns {any}
   * @memberof Database
   */
  static async recuperar(chave) {
    if (!validaTipo(chave, 'string')) {
      return false;
    }
    try {
      const ref = await this.getRef(chave);
      const dado = await ref.once('value').then(snapshot => snapshot.val());
      return dado;
    } catch (e) {
      return false;
    }
  }

  /**
   * deletar
   *
   * @static
   * @param {string} chave
   * @returns {boolean}
   * @memberof Database
   */
  static async deletar(chave) {
    if (!validaTipo(chave, 'string')) {
      return false;
    }
    try {
      const ref = await this.getRef(chave);
      await ref.remove(chave);
      return true;
    } catch (e) {
      return false;
    }
  }
}
