const routesConfig = {
  Splash: {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
  Termos: {
    initialRouteName: 'Termos',
    headerMode: 'none',
  },
  Login: {
    initialRouteName: 'LoginComEmail',
    headerMode: 'none',
  },
  Drawer: {
    initialRouteName: 'Minha Calculadora',
    drawerPosition: 'right',
    contentOptions: {
      itemsContainerStyle: { width: '100%' },
    },
  },
  App: {
    initialRouteName: 'App',
    headerMode: 'float',
  },
  Calc2: {
    initialRouteName: 'Calc2',
    headerMode: 'float',
  },
  Calc: {
    initialRouteName: 'Calc',
    headerMode: 'float',
  },
};

export default routesConfig;
