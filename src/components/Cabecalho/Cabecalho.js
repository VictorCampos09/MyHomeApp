import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RkTheme } from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import styles from './Cabecalho.style';

// Estilo a ser usado no componente principal do cabeçalho. INTERNO
const background = RkTheme.currentTheme.colors.screen.primary;
const foreground = RkTheme.currentTheme.colors.text.inverse;

const titulo = texto => (
  <View style={styles.cab}>
    <Text style={styles.tex}>{texto}</Text>
  </View>
);

// Cabeçalho padrão. EXPORT PADRÃO
const Cabecalho = (navigation, txTitulo, principal = false) => {
  const { openDrawer } = navigation;
  const cabecalho = {
    headerTitle: titulo(txTitulo),
    headerBackTitle: 'Voltar',
    headerTintColor: foreground,
    headerStyle: { backgroundColor: background },
  };

  if (principal) {
    cabecalho.headerLeft = <View />;
  }

  cabecalho.headerRight = (
    <TouchableOpacity
      style={{ marginRight: 7, marginLeft: 4 }}
      onPress={() => {
        openDrawer();
      }}
    >
      <Icon name="bars" color={foreground} size={30} />
    </TouchableOpacity>
  );

  return cabecalho;
};

export default Cabecalho;
