import firebase from 'react-native-firebase';

/**
 * Auth
 *
 * @export
 * @class Auth
 */
export default class Auth {
  static iosClientId = '';

  /**
   * getUsuario
   *
   * @static
   * @returns {firebase.user}
   * @memberof Auth
   */
  static getUsuario() {
    return firebase.auth().currentUser;
  }

  /**
   * onAuth
   *
   * @static
   * @param {*} callback
   * @memberof Auth
   */
  static onAuth(callback) {
    firebase.auth().onAuthStateChanged(user => {
      callback(user);
    });
  }

  /**
   * conectar
   *
   * @static
   * @param {*} email
   * @param {*} senha
   * @returns {boolean}
   * @throws {Object{erro}}
   * @memberof Auth
   */
  static async conectarComEmailESenha(email, senha) {
    const erro = {};
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, senha)
        .catch(error => {
          erro.code = error.code;

          switch (error.code) {
            case 'auth/invalid-email':
              erro.msg = 'Email/senha inválido(a).';
              break;

            case 'auth/user-disabled':
              erro.msg = 'Esta conta está desabilitada no momento.';
              break;

            case 'auth/user-not-found':
              erro.msg = 'Email/senha inválido(a).';
              break;

            case 'auth/wrong-password':
              erro.msg = 'Email/senha inválido(a).';
              break;

            default:
              erro.msg = 'Houve uma falha na comunicação. Por favor, tente novamente.';
          }
        });

      if (erro.code) {
        throw erro;
      }
      return true;
    } catch (e) {
      erro.msg = e.msg || e.errorMessage;
      throw erro;
    }
  }

  static async cadastrarComEmail(nome, email, senha, repetirSenha) {
    const erro = {};
    if (senha !== repetirSenha) {
      return false;
    }
    try {
      const cadastro = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .catch(error => {
          erro.code = error.code;

          switch (error.code) {
            case 'auth/invalid-email':
              erro.msg = 'Endereço de email inválido.';
              break;

            case 'auth/email-already-in-use':
              erro.msg = 'Email já cadastrado.';
              break;

            case 'auth/operation-not-allowed':
              erro.msg = 'Operação não permitida no momento. Tente novamente mais tarde.';
              break;

            case 'auth/weak-password':
              erro.msg = 'Senha muito simples. Tente usar uma senha com pelo menos 6 caracteres entre letras e números.';
              break;

            default:
              erro.msg = 'Ocorreu um erro desconhecido ou a aplicação está indisponível neste momento. Por favor, tentar novamente mais tarde.';
          }
        });

      if (!cadastro) {
        erro.code = 1;
        erro.msg = 'Houve um problema com a conexão. Por favor, tente novamente.';
      }
      if (erro.code) {
        throw erro;
      }

      // Atualiza o nome do usuário
      const user = firebase.auth().currentUser;
      await user.updateProfile({ displayName: nome });

      return true;
    } catch (e) {
      erro.msg = e.msg || e.errorMessage;
      throw erro;
    }
  }

  /**
   * recuperarSenha
   *
   * @static
   * @param {*} email
   * @returns {boolean}
   * @memberof Auth
   */
  static async recuperarSenha(email) {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * sair
   *
   * @static
   * @memberof Auth
   */
  static async sair() {
    await firebase.auth().signOut();
  }
}
