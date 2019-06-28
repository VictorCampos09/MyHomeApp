import React from 'react';
import { View, ScrollView } from 'react-native';
import { RkText, RkButton } from 'react-native-ui-kitten';

import styles from '../../style/styles';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Carregando from '../../components/Carregando/Carregando';
import Banner from '../../components/Banner/Banner';
import Auth from '../../services/Auth';

/**
 * AppScreen
 *
 * @export
 * @class AppScreen
 * @extends {React.Component}
 */
export default class AppScreen extends React.Component {
  static navigationOptions = ({ navigation }) => Cabecalho(navigation, 'My Home App', true);

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      erro: false,
      erroMsg: '',
    };
  }

  componentDidMount() {
    this.inicializar();
  }

  async inicializar() {
    /** ********************************************************************************
     *  IMPORTANTE
     ********************************************************************************* */
    /** ********************************************************************************
     *  É necessária a verfificação se existe um usuário logado para continuar a
     *  processar os Componentes filhos que dependem de informação da Database
     * ******************************************************************************** */
    const user = Auth.getUsuario();
    if (!user) {
      const msg = 'Usuário não logado. Por favor, abra a aplicação novamente.';
      this.setState({ loading: false, erro: true, erroMsg: msg });
      return false;
    }
    /** ********************************************************************************
     *  É necessária a verfificação de aceite dos termos na primeira tela de rota
     *  da aplicação.
     *  Informar à tela de termos para onde voltar após a concordância
     * ******************************************************************************** */
    /** ******************************************************************************** */
    this.setState({ loading: false });
    return true;
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;

    const { loading, erro, erroMsg } = this.state;
    if (loading) {
      return <Carregando />;
    }
    if (erro) {
      return (
        <View style={styles.container_full}>
          <ScrollView style={styles.tela_fixa} contentContainerStyle={styles.scroll_content}>
            <RkText style={styles.welcome} rkType="info">
              {erroMsg}
            </RkText>
          </ScrollView>
          <Banner />
        </View>
      );
    }
    return (
      <View style={styles.container_full}>
        <ScrollView style={styles.tela} contentContainerStyle={styles.scroll_content}>
          <RkText style={styles.welcome}>Segunda Tela!</RkText>
          <RkButton rkType="primary small outline" onPress={() => navigate('App')}>
            Retornar para a tela inicial
          </RkButton>
        </ScrollView>
        <Banner />
      </View>
    );
  }
}
