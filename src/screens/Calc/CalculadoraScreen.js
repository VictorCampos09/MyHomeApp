import React from 'react';
import { View, ScrollView } from 'react-native';
import { RkText, RkButton } from 'react-native-ui-kitten';
import styles from '../../style/styles';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Carregando from '../../components/Carregando/Carregando';
import Banner from '../../components/Banner/Banner';
import Auth from '../../services/Auth';
import Calculadora from '../../services/Calculadora';

/**
 * CalculadoraScreen
 *
 * @export
 * @class CalculadoraScreen
 * @extends {React.Component}
 */
export default class CalculadoraScreen extends React.Component {
  static navigationOptions = ({ navigation }) => Cabecalho(navigation, 'Calculadora', true);

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      erro: false,
      erroMsg: '',
      operacoes: '0',
    };
  }

  componentDidMount() {
    this.inicializar();
  }

  MostraNumero = number => {
    const { operacoes } = this.state;
    this.setState({ operacoes: Calculadora.appendNum(operacoes, number) });
  };

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

    const { loading, erro, erroMsg, operacoes } = this.state;
    if (loading) {
      return <Carregando />;
    }
    if (erro) {
      return (
        <View style={styles.container_full}>
          <ScrollView style={styles.tela_fixa} contentContainerStyle={styles.scroll_content}>
            <RkText style={styles.welcome} rkType="info small">
              {erroMsg}
            </RkText>
          </ScrollView>
          <Banner />
        </View>
      );
    }

    return (
      <View style={styles.container_full}>
        <RkText style={{ alignSelf: 'center' }}>Calculadora!</RkText>
        <View style={styles.tela} contentContainerStyle={styles.scroll_content}>
          <View style={styles.VisorCalc}>
            <RkText rkType="primary">{operacoes} </RkText>
          </View>
          <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, borderColor: 'gray' }} contentStyle={{ fontSize: 20 }}>
            <RkButton rkType="info" onPress={() => this.MostraNumero(1)}>
              1
            </RkButton>
            <RkButton rkType="info" onPress={() => this.MostraNumero(2)}>
              2
            </RkButton>
            <RkButton rkType="info" onPress={() => this.MostraNumero(3)}>
              3
            </RkButton>
          </View>
          <View style={{ flexDirection: 'row', padding: 10, borderRadius: 14, borderColor: 'gray' }} contentStyle={{ fontSize: 20 }}>
            <RkButton rkType="info" Styles={{ padding: '50' }} onPress={() => this.MostraNumero(4)}>
              4
            </RkButton>
            <RkButton rkType="info" onPress={() => this.MostraNumero(5)}>
              5
            </RkButton>
            <RkButton rkType="info" onPress={() => this.MostraNumero(6)}>
              6
            </RkButton>
          </View>
          <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, borderColor: 'gray' }} contentStyle={{ fontSize: 20 }}>
            <RkButton rkType="info" onPress={() => this.MostraNumero(7)}>
              7
            </RkButton>
            <RkButton rkType="info" onPress={() => this.MostraNumero(8)}>
              8
            </RkButton>
            <RkButton rkType="info" onPress={() => this.MostraNumero(9)}>
              9
            </RkButton>
          </View>
          <View style={{ flexDirection: 'row', padding: 10, borderRadius: 10, borderColor: 'gray' }} contentStyle={{ fontSize: 20 }}>
            <RkButton rkType="info" style={{ backgroundColor: 'gray' }} onPress={() => this.setState({ operacoes: '' })}>
              CC
            </RkButton>
            <RkButton rkType="info" onPress={() => this.MostraNumero(0)}>
              0
            </RkButton>
            <RkButton rkType="Danger" onPress={() => this.setState({ operacoes: Calculadora.corrigeNum(operacoes) })}>
              er
            </RkButton>
          </View>
          <View style={{ flexDirection: 'row', padding: 20 }} contentStyle={{ fontSize: 20 }}>
            <RkButton rkType="info small" onPress={() => this.MostraNumero(' + ')}>
              +
            </RkButton>
            <RkButton rkType="info small" onPress={() => this.MostraNumero(' - ')}>
              -
            </RkButton>
            <RkButton rkType="info small" onPress={() => this.MostraNumero(' / ')}>
              /
            </RkButton>
            <RkButton rkType="info small" onPress={() => this.MostraNumero(' * ')}>
              *
            </RkButton>
          </View>
          <View style={{ flexDirection: 'row', alingItens: 'center' }}>
            <RkButton
              rkType="Success"
              style={{ backgroundColor: 'green' }}
              onPress={() => this.setState({ operacoes: Calculadora.calculaResultado(operacoes) })}
            >
              =
            </RkButton>
            <View style={{ flexDirection: 'row' }} />
          </View>
          <RkButton rkType="primary small outline" onPress={() => navigate('App')}>
            Retornar para a tela inicial
          </RkButton>
        </View>
        <Banner />
      </View>
    );
  }
}
