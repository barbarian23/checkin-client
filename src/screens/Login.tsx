import {Text, VStack, Input, Button} from 'native-base';
import React, {useCallback} from 'react';

type IPropsLogin = {
  navigation: any;
} & IPropsI18n;

// const navigation = useNavigation();

const Login: React.FC<IPropsLogin> = ({t, navigation}) => {
  const handleCheckin = useCallback(() => {
    console.log('tesst');
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <VStack style={{marginTop: 100, margin: 30}} space={3}>
      <Text>Nhập số điện thoại: </Text>
      <Input
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
        maxLength={10}
      />
      <Button onPress={handleCheckin}>Check in</Button>
    </VStack>
  );
};

export default Login;
