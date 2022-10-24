import {Text, View} from 'native-base';
import React from 'react';
import {withTranslation} from 'react-i18next';

type IPropsHome = {
  navigation: any;
} & IPropsI18n;

const Home: React.FC<IPropsHome> = ({t, navigation}) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default withTranslation()(Home);
