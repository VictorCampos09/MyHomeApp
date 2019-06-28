import React from 'react';
import { TouchableOpacity, ScrollView, View, Text, Image } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import styles from '../../style/styles';
import Auth from '../../services/Auth';
import packageJson from '../../../package.json';

const imgFotoPadrao = require('../../assets/imgs/person.png');

/**
 * Menu Drawer
 *
 * @param {*} props
 * @returns
 */
const MenuDrawer = props => {
  const { displayName, photoURL } = Auth.getUsuario();
  const foto = photoURL ? { uri: photoURL } : imgFotoPadrao;
  const nome = displayName || 'Novo usuário';
  // const foto = imgFotoPadrao;
  // const nome = 'Novo usuário';

  return (
    <SafeAreaView style={[styles.container, { justifyContent: 'flex-start' }]} forceInset={{ top: 'always', horizontal: 'never' }}>
      <ScrollView style={{ width: '100%' }} alwaysBounceVertical={false}>
        <View style={styles.drawer_viewCabecalho}>
          <Text style={styles.drawer_txTitulo}>Menu</Text>
          <View style={styles.drawer_viewFoto}>
            <Image style={styles.drawer_imgFoto} source={foto} />
          </View>
          <Text style={styles.drawer_txNome}>{nome}</Text>
        </View>
        <View style={styles.drawer_viewBody}>
          <DrawerItems {...props} />
          <TouchableOpacity onPress={() => Auth.sair()}>
            <View style={styles.drawer_viewItem}>
              <Text style={styles.drawer_txItem}>Sair</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* VIEW TEMPORÁRIA PARA MOSTRAR A VERSÃO DO APP */}
      <View style={styles.drawer_viewVersao}>
        <Text style={styles.drawer_txVersao}>{`Versão ${packageJson.version}`}</Text>
      </View>
    </SafeAreaView>
  );
};

export default MenuDrawer;
