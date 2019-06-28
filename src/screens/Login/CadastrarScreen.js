import React from 'react';
import { View, ScrollView, Keyboard } from 'react-native';
import { RkText, RkTextInput, RkButton } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';

import Auth from '../../services/Auth';
import styles from '../../style/styles';
import Carregando from '../../components/Carregando/Carregando';

import validaEmail from '../../utils/validaEmail';
import validaTipo from '../../utils/validaTipo';

/**
 * CadastrarScreen
 *
 * @export
 * @class CadastrarScreen
 * @extends {React.Component}
 */
export default class CadastrarScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: '',
      repetirSenha: '',
      loading: false,
      erro: false,
      erroMsg: '',
    };
  }

  async cadastrar() {
    const { nome, email, senha, repetirSenha } = this.state;

    // fecha o teclado, caso esteja aberto
    Keyboard.dismiss();

    this.setState({ loading: true, erro: false });
    try {
      if (!nome || nome.length < 3) {
        const e = { msg: 'Informe um nome para continuar (mínimo 3 caracteres).' };
        throw e;
      }
      if (!validaEmail(email)) {
        const e = { msg: 'Informe o email para continuar.' };
        throw e;
      }
      if (!validaTipo(senha, 'string') || senha.length < 6) {
        const e = { msg: 'A senha deve possuir pelo menos 6 caracteres.' };
        throw e;
      }
      if (senha !== repetirSenha) {
        const e = { msg: 'Senhas não conferem.' };
        throw e;
      }
      await Auth.cadastrarComEmail(nome, email, senha, repetirSenha);
    } catch (e) {
      this.setState({ loading: false, erro: true, erroMsg: e.msg });
    }
  }

  render() {
    const { nome, email, senha, repetirSenha, loading, erro, erroMsg } = this.state;
    return (
      <View style={styles.container_background}>
        <ScrollView
          style={styles.tela}
          contentContainerStyle={styles.cadastrar_content}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="handled"
        >
          <RkText style={{ marginVertical: 20 }} rkType="primary header">
            Criar uma conta
          </RkText>
          <RkTextInput
            style={{ height: 40, marginHorizontal: 16 }}
            inputStyle={{ height: 40 }}
            labelStyle={{ marginLeft: 12, width: 16, textAlign: 'center' }}
            label={<Icon name="user" />}
            placeholder="Nome"
            keyboardType="default"
            returnKeyType="next"
            rkType="rounded"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={text => this.setState({ nome: text })}
            value={nome}
          />
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
          />
          <RkTextInput
            secureTextEntry
            style={{ height: 40, marginHorizontal: 16 }}
            inputStyle={{ height: 40 }}
            labelStyle={{ marginLeft: 12, width: 16, textAlign: 'center' }}
            label={<Icon name="lock" />}
            placeholder="Repita a senha"
            rkType="rounded"
            onChangeText={text => this.setState({ repetirSenha: text })}
            value={repetirSenha}
            onSubmitEditing={() => this.cadastrar()}
          />
          {loading ? <Carregando /> : null}
          {erro ? (
            <RkText style={{ textAlign: 'center' }} rkType="danger medium">
              {erroMsg}
            </RkText>
          ) : null}
        </ScrollView>
        <View style={{ height: 60, width: '100%', marginBottom: 10 }}>
          <RkButton style={{ marginVertical: 16 }} disabled={loading} rkType="primary small stretch" onPress={() => this.cadastrar()}>
            CONTINUAR
          </RkButton>
        </View>
      </View>
    );
  }
}
