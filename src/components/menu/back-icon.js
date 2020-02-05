/* @flow */

import React, {PureComponent} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform} from 'react-native';

type Props = {};

export default class BackIcon extends PureComponent<Props, void> {

  render() {
    const isAndroid = Platform.OS === 'android';
    return (
      <Icon
        name={isAndroid ? 'arrow-left' : 'chevron-left'}
        size={isAndroid ? 24 : 30}
      />
    );
  }
}
