import React from 'react';
import { View, ScrollView, Keyboard } from 'react-native';
import { RkText, RkTextInput, RkButton } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';

import Auth from '../../services/Auth';
import styles from '../../style/styles';
import validaEmail from '../../utils/validaEmail';
import RodapeCorporativo from '../../components/RodapeCorporativo/RodapeCorporativo';
import Carregando from '../../components/Carregando/Carregando';

/**
 * RedefinirSenhaScreen
 *
 * @export
 * @class RedefinirSenhaScreen
 * @extends {React.Component}
 */
export default class RedefinirSenhaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      submited: false,
      loading: false,
      erro: false,
      erroMsg: '',
    };
  }

  async recuperarSenha() {
    const { email } = this.state;

    // fecha o teclado, caso esteja aberto
    Keyboard.dismiss();

    this.setState({ loading: true, erro: false });
    try {
      if (!validaEmail(email)) {
        const e = { errorMessage: 'Informe um email válido para continuar.' };
        throw e;
      }
      await Auth.recuperarSenha(email);
      await this.setState({ loading: false, erro: false, submited: true });
      return true;
    } catch (e) {
      const msg = 'Erro ao encaminhar o email de recuperação da senha.';
      this.setState({ loading: false, erro: true, erroMsg: e.errorMessage || msg, submited: false });
      return false;
    }
  }

  render() {
    const { navigation } = this.props;
    const { goBack } = navigation;
    const { email, loading, submited, erro, erroMsg } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.tela_fixa}
          contentContainerStyle={styles.scroll_content}
          keyboardDismissMode="none"
          keyboardShouldPersistTaps="handled"
        >
          <RkText style={{ marginVertical: 20 }} rkType="primary header">
            Redefinição de senha
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
            onSubmitEditing={() => {
              this.recuperarSenha();
            }}
          />

          <RkButton
            style={{ marginVertical: 16 }}
            disabled={loading}
            rkType="primary small stretch"
            onPress={() => (submited ? goBack() : this.recuperarSenha())}
          >
            {submited ? 'VOLTAR' : 'CONTINUAR'}
          </RkButton>

          {loading ? <Carregando /> : null}
          {erro ? (
            <RkText style={{ textAlign: 'center' }} rkType="danger medium">
              {erroMsg}
            </RkText>
          ) : null}
          {submited ? (
            <RkText style={{ textAlign: 'center' }} rkType="info medium">
              As instruções para a recuperação de senha foram encaminhadas para o email informado.
            </RkText>
          ) : null}
        </ScrollView>
        <RodapeCorporativo />
      </View>
    );
  }
}
