import React from 'react';
import { View } from 'react-native';
import { RkText, RkButton } from 'react-native-ui-kitten';
import { WebView } from 'react-native-webview';
import RNExitApp from 'react-native-exit-app';

import styles from '../../style/styles';
import Termos from '../../services/Termos';
import htmlTermos from '../../assets/html/termoshtml';

/**
 * TermosScreen
 *
 * @export
 * @class TermosScreen
 * @extends {React.Component}
 */
export default class TermosScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async concordar() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const tela = navigation.getParam('tela', 'Login');
    const termo = new Termos();
    await termo.aceitarTermos();

    navigate(tela, { aceiteRecente: true });
  }

  habilitarBotoes() {
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container_background}>
        <View style={styles.termos_view}>
          <RkText rkType="primary header">TERMOS DE USO E PRIVACIDADE</RkText>
          <View style={{ flex: 1, width: '100%', marginTop: 10, paddingHorizontal: 5 }}>
            <WebView source={{ html: htmlTermos }} originWhitelist={['*']} onLoadEnd={() => this.habilitarBotoes()} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
          <RkButton style={{ marginVertical: 16 }} rkType="outline small stretch" onPress={() => RNExitApp.exitApp()}>
            DISCORDO
          </RkButton>
          <RkButton style={{ marginVertical: 16 }} disabled={loading} rkType="primary small stretch" onPress={() => this.concordar()}>
            CONCORDO
          </RkButton>
        </View>
      </View>
    );
  }
}
