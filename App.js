import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import aplicarTemas from './src/style/kittenTheme';
import Admob from './src/services/Admob';
import { routesApp, routesSplash, routesTermos, routesLogin, routesRedefinirSenha, routesCalc } from './src/routes/routes';
import routesConfig from './src/routes/routesConfig';
import DrawerScreen from './src/screens/Drawer/DrawerScreen';

// Inicialização do AdMob
Admob.inicializar();

// Executa a aplicação dos temas visuais da aplicação
aplicarTemas();

// Declaração das rotas
const AppStack = createStackNavigator(routesApp, routesConfig.App); // Rota principal, onde estara as telas
const SplashStack = createStackNavigator(routesSplash, routesConfig.Splash);
const TermosStack = createStackNavigator(routesTermos, routesConfig.Termos);
const LoginStack = createStackNavigator(routesLogin, routesConfig.Login);
const RedefinirSenhaStack = createStackNavigator(routesRedefinirSenha, routesConfig.RedefinirSenha);
const CalculadoraStack = createStackNavigator(routesCalc, routesConfig.Calc);
const CalculadoraFacilStack = createStackNavigator(routesCalc, routesConfig.Calc2);

// Definição dos itens que aparecerão no Menu Lateral
const itensDrawer = {
  'My Home App': { screen: AppStack },
  'Alterar Senha': { screen: RedefinirSenhaStack },
  'Minha Calculadora': { screen: CalculadoraStack },
  'Calculadora Layout': { screen: CalculadoraFacilStack },
};

const Drawer = createDrawerNavigator(itensDrawer, { contentComponent: DrawerScreen, ...routesConfig.Drawer });

// SwitchNavigator separa as camadas de rotas às quais cada pilha poderá enxergar
const AppNavigator = createSwitchNavigator(
  {
    Splash: SplashStack,
    App: Drawer,
    Termos: TermosStack,
    Login: LoginStack,
  },
  { initialRouteName: 'Splash' },
);

export default createAppContainer(AppNavigator);
