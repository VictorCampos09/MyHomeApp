import { StyleSheet } from 'react-native';
import { RkTheme } from 'react-native-ui-kitten';

const background = RkTheme.currentTheme.colors.screen.primary;
const foreground = RkTheme.currentTheme.colors.text.inverse;

const styles = StyleSheet.create({
  cab: {
    backgroundColor: background,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tex: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: foreground,
  },
});

export default styles;
