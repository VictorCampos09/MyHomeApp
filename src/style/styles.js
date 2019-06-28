import { RkStyleSheet } from 'react-native-ui-kitten';

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base,
  },
  container_full: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    backgroundColor: theme.colors.screen.base,
  },
  container_background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: theme.colors.highlight,
  },
  tela: {
    width: '100%',
  },
  tela_fixa: {
    flex: 1,
    width: '100%',
  },
  tela_shrink: {
    flexShrink: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll_content: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 20,
    paddingHorizontal: 6,
  },
  view_content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    paddingBottom: 20,
    paddingHorizontal: 6,
  },
  VisorCalc: {
    flex: 1,
    flexDirection: 'row',
    padding: 30,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 15,
    borderRadius: 5,
  },

  // ***********************************
  // * Splash                          *
  // ***********************************
  splash_view: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.screen.primary,
  },
  splash_texto: {
    textAlign: 'center',
    color: theme.colors.text.inverse,
    fontSize: 48,
    fontWeight: 'bold',
  },
  // ***********************************
  // * MenuDrawer                      *
  // ***********************************
  drawer_viewCabecalho: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.screen.primary,
    paddingVertical: 20,
    marginBottom: 10,
  },
  drawer_viewBody: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.screen.base,
  },
  drawer_viewItem: {
    height: 50,
    paddingVertical: 4,
    paddingLeft: 16,
    justifyContent: 'center',
    borderTopColor: theme.colors.screen.primary,
  },
  drawer_viewFoto: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: theme.colors.screen.primary,
  },
  drawer_viewVersao: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 60,
    paddingRight: 16,
    paddingBottom: 5,
  },
  drawer_imgFoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  drawer_txTitulo: {
    color: theme.colors.screen.base,
    fontSize: theme.fonts.sizes.xxlarge,
    fontWeight: 'bold',
  },
  drawer_txNome: {
    color: theme.colors.screen.base,
    fontSize: theme.fonts.sizes.medium,
  },
  drawer_txItem: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: '#000000DE',
  },
  drawer_txVersao: {
    fontSize: 10,
  },
  // ***********************************
  // * Termos                          *
  // ***********************************
  termos_view: {
    flex: 1,
    width: '100%',
    marginTop: 16,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  cadastrar_content: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 6,
    paddingBottom: 20,
    paddingHorizontal: 6,
    backgroundColor: '#FFF',
  },
}));

export default styles;
