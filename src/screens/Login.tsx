import {Text, View} from 'native-base';
import React from 'react';
import {withTranslation} from 'react-i18next';

type IPropsLogin = {
  navigation: any;
} & IPropsI18n;

const Login: React.FC<IPropsLogin> = ({t, navigation}) => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default withTranslation()(Login);
