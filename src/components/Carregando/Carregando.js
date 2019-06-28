import React from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import { RkTheme } from 'react-native-ui-kitten';

import styles from './Carregando.style';

export default () => (
  <View style={styles.view}>
    <ActivityIndicator size={Platform.OS === 'android' ? 80 : 1} color={RkTheme.currentTheme.colors.screen.primary} />
  </View>
);
