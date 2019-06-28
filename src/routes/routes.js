import SplashScreen from '../screens/Splash/SplashScreen';

import TermosScreen from '../screens/Termos/TermosScreen';

import LoginScreen from '../screens/Login/LoginScreen';
import LoginComEmailScreen from '../screens/Login/LoginComEmailScreen';
import CadastrarScreen from '../screens/Login/CadastrarScreen';
import RedefinirSenhaScreen from '../screens/Login/RedefinirSenhaScreen';

import DrawerScreen from '../screens/Drawer/DrawerScreen';

import AppScreen from '../screens/App/AppScreen';
import HelloScreen from '../screens/App/HelloScreen';

import CalculadoraScreen from '../screens/Calc/CalculadoraScreen';
import CalculadoraFacil from '../screens/Calc2/CalculadoraFacil';

export const routesSplash = {
  Splash: { screen: SplashScreen },
};

export const routesTermos = {
  Termos: { screen: TermosScreen },
};

export const routesLogin = {
  Login: { screen: LoginScreen },
  LoginComEmail: { screen: LoginComEmailScreen },
  Cadastrar: { screen: CadastrarScreen },
  RedefinirSenha: { screen: RedefinirSenhaScreen },
};

export const routesRedefinirSenha = {
  RedefinirSenha: { screen: RedefinirSenhaScreen },
};

export const routesDrawer = {
  Drawer: { screen: DrawerScreen },
};

export const routesApp = {
  App: { screen: AppScreen },
  HelloScren: { screen: HelloScreen },
};

export const routesCalc = {
  Calc: { screen: CalculadoraScreen },
  Calc2: { screen: CalculadoraFacil },
};
