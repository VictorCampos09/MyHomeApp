import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RkText } from 'react-native-ui-kitten';
import styles from '../../style/styles';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Carregando from '../../components/Carregando/Carregando';
import Banner from '../../components/Banner/Banner';
import Auth from '../../services/Auth';
import Calculadora from '../../services/Calculadora';

const style = StyleSheet.create({
  button: { padding: 20, paddingHorizontal: 30, marginVertical: 3, backgroundColor: '#CCC', borderRadius: 10 },
});

/**
 * CalculadoraFacil
 *
 * @export
 * @class CalculadoraFacil
 * @extends {React.Component}
 */
export default class CalculadoraFacil extends React.Component {
  static navigationOptions = ({ navigation }) => Cabecalho(navigation, 'Calculadora', true);

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      erro: false,
      erroMsg: '',
      num: '0',
    };
  }

  componentDidMount() {
    this.inicializar();
  }

  includeNumber = number => {
    const { num } = this.state;
    this.setState({ num: Calculadora.appendNum(num, number) });
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

    const { loading, erro, erroMsg, num } = this.state;
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
      <View style={{ flex: 1 }}>
        <Text
          style={{
            flexDirection: 'row',
            padding: 30,
            borderWidth: 1,
            borderColor: 'gray',
            marginHorizontal: 10,
            marginVertical: 15,
            borderRadius: 5,
          }}
        >
          {num}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => this.includeNumber(1)} style={style.button}>
            <Text>1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.includeNumber(2)} style={style.button}>
            <Text>2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.includeNumber(3)} style={style.button}>
            <Text>3</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => this.includeNumber(4)} style={style.button}>
            <Text>4</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.includeNumber(5)} style={style.button}>
            <Text>5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.includeNumber(6)} style={style.button}>
            <Text>6</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => this.includeNumber(7)} style={style.button}>
            <Text>7</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.includeNumber(8)} style={style.button}>
            <Text>8</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.includeNumber(9)} style={style.button}>
            <Text>9</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity style={{ padding: 20, paddingHorizontal: 25, marginVertical: 3, backgroundColor: 'red', borderRadius: 10 }}>
            <Text>CC</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.includeNumber(0)} style={style.button}>
            <Text>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.includeNumber('=')} style={style.button}>
            <Text>=</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.includeNumber(' + ')} style={style.button}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => navigate('App')} style={style.button}>
            <Text>Retorna tela</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
