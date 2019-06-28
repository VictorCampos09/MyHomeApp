import firebase from 'react-native-firebase';

const { NODE_ENV } = process.env;
const DESENV = NODE_ENV === 'development';

/**
 * Admob
 *
 * @export
 * @class Admob
 */
export default class Admob {
  static ID_ADMOB = DESENV ? 'ca-app-pub-3940256099942544~3347511713' : 'PREENCHER';

  static ID_BANNER = DESENV ? 'ca-app-pub-3940256099942544/6300978111' : 'PREENCHER';

  static ID_INTER = DESENV ? 'ca-app-pub-3940256099942544/1033173712' : 'PREENCHER';

  /**
   * inicializar o serviço AdMob
   *
   * @returns {boolean}
   * @memberof admob
   */
  static async inicializar() {
    try {
      await firebase.admob().initialize(this.ID_ADMOB);
      // firebase.admob().openDebugMenu();
      return true;
    } catch (e) {
      // console.log(e);
      return false;
    }
  }

  /**
   * getBanner
   *
   * @todo enviar estatísticas de apresentações, cliques e erros.
   *
   * @param {*} [keywords=[]]
   * @param {string} [tamanho='BANNER']
   *    'BANNER'            - 320x50
   *    'FULL_BANNER'       - 468x60
   *    'LARGE_BANNER'      - 320x100
   *    'LEADERBOARD'       - 728x90
   *    'MEDIUM_RECTANGLE'  - 300x250
   *    'SMART_BANNER'      - ajustado dinamicamente
   * @returns {Component<Banner />, unitId, size, request }
   */
  static getBanner(tamanho = 'BANNER', keywords = []) {
    try {
      const { Banner } = firebase.admob;
      const { AdRequest } = firebase.admob;
      const request = new AdRequest();

      if (keywords.length > 0) {
        keywords.map(key => request.addKeyword(key));
      }

      const build = request.build();

      const objBanner = {
        Banner,
        unitId: this.ID_BANNER,
        size: tamanho,
        request: build,
      };

      return objBanner;
    } catch (e) {
      // console.log(e);
      return null;
    }
  }

  /**
   * loadIntersticial
   *
   * @param {*} [keywords=[]]
   * @returns {boolean}
   * @memberof admob
   */
  loadIntersticial(keywords = []) {
    try {
      const { AdRequest } = firebase.admob;
      const request = new AdRequest();

      if (keywords.length > 0) {
        keywords.map(key => request.addKeyword(key));
      }

      const build = request.build();

      this.intersticial = firebase.admob().interstitial(this.ID_INTER);
      this.intersticial.loadAd(build);
      if (this.intersticial.isLoaded) {
        this.intersticial.show();
        return true;
      }
      return false;
    } catch (e) {
      // console.log(e);
      return false;
    }
  }

  /**
   * isIntersticialLoaded
   *
   * @returns {boolean}
   * @memberof admob
   */
  isIntersticialLoaded() {
    try {
      return this.intersticial.isLoaded;
    } catch (e) {
      return false;
    }
  }

  /**
   * runIntersticial
   *
   * @param {boolean} [force=false]
   * @returns {boolean}
   * @memberof admob
   */
  runIntersticial(force = false) {
    try {
      if (this.intersticial.isLoaded) {
        this.intersticial.show();
        return true;
      }
      if (force) {
        this.intersticial.on('onAdLoaded', () => {
          this.intersticial.show();
        });
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
