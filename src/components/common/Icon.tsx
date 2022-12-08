import {Icon as IconNative, IIconProps} from 'native-base';
import React from 'react';
import {StyleProp} from 'react-native';

import SVGs from '@/assets/svgs';

export type IPropsIcon = {
  name: string;
} & IIconProps &
  StyleProp<any>;

const Icon: React.FC<IPropsIcon> = ({name, ...props}) => {
  const S = SVGs[name];
  return S ? (
    <IconNative {...props} as={<S />} />
  ) : (
    // <IconNative {...props} as={<S fill={props.color || 'white'} />} />
    <IconNative name={name} {...props} />
  );
};

export default Icon;
