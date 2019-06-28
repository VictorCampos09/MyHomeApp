// Função para validar endereços de e-mail através de REGEX

const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line

/**
 * validaEmail
 *
 * @param {*} email
 * @returns {boolean}
 */
const validaEmail = email => {
  if (typeof email === 'string') {
    if (email.toString().match(reg)) {
      return true;
    }
  }
  return false;
};

export default validaEmail;
