import {Text, VStack, Input, Button, useToast} from 'native-base';
import React, {useState} from 'react';
import {withTranslation} from 'react-i18next';
import {ScaledSheet} from 'react-native-size-matters';
import {ImageBackground, Linking} from 'react-native';
import {useQuery} from 'react-query';
import Colors from '@/themes/Colors';
import {checkPhone} from '@/utils/services/api/myAPI';

type IPropsLogin = {
  navigation: any;
} & IPropsI18n;

const Login: React.FC<IPropsLogin> = ({t, navigation}) => {
  const [phone, setPhone] = useState('');
  const [enabledAPI, setEnabledAPI] = useState(false);
  const url = 'https://www.google.com/';
  const toast = useToast();

  useQuery(['getDataInfo'], () => checkPhone(phone), {
    enabled: enabledAPI,
    onSuccess: (responseData: any) => {
      console.log('success data: ', responseData);
      navigation.navigate('Home', {responseCheckPhone: responseData});
      setEnabledAPI(false);
    },
    onError: e => {
      console.log('error: ', e);
      toast.show({
        title:
          'Phone number is not registered, please go to website to register for service',
      });
      setEnabledAPI(false);
      linkWeb();
    },
  });

  const handleCheckin = () => {
    setEnabledAPI(true);
  };

  const linkWeb = async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      toast.show({title: `Don't know how to open this URL: ${url}`});
    }
  };

  const sourceImgBg = require('@/assets/images/bg_login.jpg');

  return (
    <ImageBackground
      imageStyle={styles.image_bg}
      source={sourceImgBg}
      resizeMode="cover">
      <VStack style={styles.container}>
        <VStack style={styles.view_content} space={4}>
          <Text style={styles.title}>{t('title_input_phone')}</Text>
          <Input
            style={styles.input}
            placeholder="Input phone number"
            size="xl"
            variant="underlined"
            keyboardType="phone-pad"
            maxLength={10}
            focusOutlineColor={Colors.primary.lightGreen800}
            borderColor={Colors.primary.lightGreen800}
            onChangeText={(text: string) => setPhone(text)}
          />
          <Button style={styles.button} onPress={handleCheckin}>
            <Text style={styles.text_button}>{t('btn_check')}</Text>
          </Button>
        </VStack>
      </VStack>
    </ImageBackground>
  );
};

export default withTranslation()(Login);

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    // justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  image_bg: {
    width: '100%',
    height: '100%',
  },
  view_content: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 40,
    paddingVertical: 40,
    borderRadius: 30,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    color: Colors.primary.lightGreen900,
  },
  input: {
    color: Colors.primary.lightGreen800,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: Colors.primary.lightGreen700,
  },
  text_button: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
});
