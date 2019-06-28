import React from 'react';
import { View } from 'react-native';

import styles from './Banner.style';
import Admob from '../../services/Admob';

export default () => {
  const objBanner = Admob.getBanner();
  const { Banner, unitId, size, request } = objBanner;
  return (
    <View style={styles.view}>
      <Banner unitId={unitId} size={size} request={request} />
    </View>
  );
};
