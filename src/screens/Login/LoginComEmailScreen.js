import React from 'react';
import { View, ScrollView, Keyboard } from 'react-native';
import { RkText, RkTextInput, RkButton } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';

import Auth from '../../services/Auth';
import styles from '../../style/styles';
import RodapeCorporativo from '../../components/RodapeCorporativo/RodapeCorporativo';
import Carregando from '../../components/Carregando/Carregando';

/**
 * LoginComEmailScreen
 *
 * @export
 * @class LoginComEmailScreen
 * @extends {React.Component}
 */
export default class LoginComEmailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      loading: false,
      erro: false,
      erroMsg: '',
    };
  }

  async conectar() {
    const { email, senha } = this.state;

    // fecha o teclado, caso esteja aberto
    Keyboard.dismiss();

    this.setState({ loading: true, erro: false });
    try {
      if (!email || email.length < 1) {
        const e = { msg: 'Informe o email para continuar.' };
        throw e;
      }
      if (!senha || senha.length < 1) {
        const e = { msg: 'Informe a senha para continuar.' };
        throw e;
      }
      await Auth.conectarComEmailESenha(email, senha);
    } catch (e) {
      this.setState({ loading: false, erro: true, erroMsg: e.msg });
    }
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const { email, senha, loading, erro, erroMsg } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.tela_fixa}
          contentContainerStyle={styles.scroll_content}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="handled"
        >
          <RkText style={{ marginVertical: 20 }} rkType="primary header">
            Entrar com email e senha
          </RkText>
          <RkTextInput
            style={{ height: 40, marginHorizontal: 16 }}
            inputStyle={{ height: 40 }}
            labelStyle={{ marginLeft: 12, width: 16, textAlign: 'center' }}
            label={<Icon name="envelope" />}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            rkType="rounded"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={text => this.setState({ email: text })}
            value={email}
          />
          <RkTextInput
            secureTextEntry
            style={{ height: 40, marginHorizontal: 16 }}
            inputStyle={{ height: 40 }}
            labelStyle={{ marginLeft: 12, width: 16, textAlign: 'center' }}
            label={<Icon name="lock" />}
            placeholder="Senha"
            rkType="rounded"
            onChangeText={text => this.setState({ senha: text })}
            value={senha}
            onSubmitEditing={() => this.conectar()}
          />
          <RkButton style={{ marginVertical: 16 }} disabled={loading} rkType="primary small stretch" onPress={() => this.conectar()}>
            CONTINUAR
          </RkButton>
          <RkButton style={{ marginBottom: 16, width: 120 }} disabled={loading} rkType="texto small" onPress={() => navigate('RedefinirSenha')}>
            Esqueci a senha
          </RkButton>
          <RkButton style={{ marginBottom: 16, width: 150 }} disabled={loading} rkType="texto small" onPress={() => navigate('Cadastrar')}>
            Ainda não tenho conta
          </RkButton>
          {loading ? <Carregando /> : null}
          {erro ? (
            <RkText style={{ textAlign: 'center' }} rkType="danger medium">
              {erroMsg}
            </RkText>
          ) : null}
        </ScrollView>
        <RodapeCorporativo />
      </View>
    );
  }
}
