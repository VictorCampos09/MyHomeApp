import { StatusBar, Platform } from 'react-native';
import { RkTheme } from 'react-native-ui-kitten';

/**
 * Definicção dos temas e layout da aplicação
 *
 */
const aplicarTemas = () => {
  // console.log(RkTheme);

  // Definição das cores
  RkTheme.setColor('fundoPrimario', '#2699FB');
  RkTheme.setColor('fundoSecundario', '#BCE0FD');
  RkTheme.setColor('cinzaClaro1', '#7F7F7F');
  RkTheme.setColor('cinzaClaro2', '#CCCCCC');
  RkTheme.setColor('cinzaClaro3', '#F8F8F8');
  RkTheme.setColor('cinzaClaro4', '#F5FCFF');
  RkTheme.setColor('claro', '#F5FCFF');
  RkTheme.setColor('sucesso', '#238423');
  RkTheme.setColor('falha', '##D12222');

  // Definição dos tipos
  RkTheme.setType('RkButton', 'texto', {
    container: {
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
    content: {
      color: RkTheme.currentTheme.colors.screen.primary,
    },
  });
  RkTheme.setType('RkText', 'marca', {
    fontSize: 48,
    textAlign: 'center',
    fontWeight: 'bold',
    color: RkTheme.currentTheme.colors.text.inverse,
  });
  RkTheme.setType('RkText', 'rodape', {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: RkTheme.currentTheme.colors.text.inverse,
  });

  RkTheme.setTheme({
    fonts: {
      sizes: {
        medium: 14,
      },
    },
  });

  // Execução de configurações globais de layout
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(RkTheme.colors.fundoPrimario);
  }
  StatusBar.setBarStyle('light-content');
};

export default aplicarTemas;
