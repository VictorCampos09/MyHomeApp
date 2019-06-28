import React, { Component } from 'react';
import { View } from 'react-native';
import { RkText } from 'react-native-ui-kitten';

import styles from '../../style/styles';

import Auth from '../../services/Auth';
import Termos from '../../services/Termos';
import Push from '../../services/Push';

const { NODE_ENV } = process.env;

/** **************************************************************************
 * Setar true ou false para início rápido em desenvolvimento                 *
 *************************************************************************** */
const iniciarRapido = true;

/**
 * SplashScreen
 *
 * @export
 * @class SplashScreen
 * @extends {Component}
 */
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inicioRapido: NODE_ENV === 'development' && iniciarRapido,
      erro: false,
    };
  }

  componentDidMount() {
    this.inicializacao();
  }

  componentWillUnmount() {
    if (this.unsubscriberAuth) {
      this.unsubscriberAuth();
    }
    if (this.unsubscriberPush) {
      this.unsubscriberPush();
    }
  }

  async inicializacao() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { inicioRapido } = this.state;

    try {
      setTimeout(
        async () => {
          this.unsubscriberAuth = Auth.onAuth(async usuario => {
            // Verificação de aceite dos termos pelo usuário
            const termoAceito = await Termos.isAceiteTermos();
            if (usuario) {
              // Caso haja usuário logado, adicionar um listener de Push Notification para que os mesmo possam ser exibidos
              this.unsubscriberPush = Push.listenerPush();

              if (termoAceito) {
                navigate('Calc');
              } else {
                navigate('Termos', { tela: 'Calc' });
              }
            } else if (termoAceito) {
              navigate('Login');
            } else {
              navigate('Termos', 'Login');
            }
          });
        },
        inicioRapido ? 0 : 200,
      );
    } catch (e) {
      await this.setState({ erro: true });
    }
  }

  render() {
    const { erro } = this.state;

    if (erro) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <RkText style={{ textAlign: 'center' }} rkType="danger medium">
            Houve um erro ao carregar a aplicação.
          </RkText>
          <RkText style={{ textAlign: 'center' }} rkType="danger medium">
            Tente limpar os arquivos armazenados pelo aplicativo antes de abri-lo novamente.
          </RkText>
        </View>
      );
    }
    return (
      <View style={styles.splash_view}>
        <RkText rkType="marca">Meu App de Teste</RkText>
      </View>
    );
  }
}
