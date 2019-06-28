import React from 'react';
import { Text, View } from 'react-native';
import { RkButton } from 'react-native-ui-kitten';

import styles from '../../style/styles';

export default props => {
  const { navigation } = props;
  const { navigate } = navigation;
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Login!</Text>
      <RkButton rkType="primary small outline" onPress={() => navigate('App')}>
        App
      </RkButton>
      <RkButton rkType="primary small outline" onPress={() => navigate('LoginComEmail')}>
        Entrar com email
      </RkButton>
      <RkButton rkType="primary small outline" onPress={() => navigate('Cadastrar')}>
        Cadastrar
      </RkButton>
      <RkButton rkType="primary small outline" onPress={() => navigate('RedefinirSenha')}>
        Esqueci a Senha
      </RkButton>
    </View>
  );
};
