import { StyleSheet } from 'react-native';
import { RkTheme } from 'react-native-ui-kitten';

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: RkTheme.currentTheme.colors.screen.primary,
  },
});

export default styles;
