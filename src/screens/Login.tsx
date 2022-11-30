import {VStack, Input, Button, useToast, Image} from 'native-base';
import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import {ScaledSheet} from 'react-native-size-matters';
import {ImageBackground, Text} from 'react-native';
import {useQuery} from 'react-query';
import Colors from '@/themes/Colors';
import {checkIsPhone} from '@/utils/services/api/myAPI';

type IPropsLogin = {
  navigation: any;
} & IPropsI18n;

const Login: React.FC<IPropsLogin> = ({t, navigation}) => {
  const [phone, setPhone] = useState('');
  const [enabledAPIIsPhone, setEnabledAPIIsPhone] = useState(false);
  const toast = useToast();
  const [disabledButton, setDisabledButton] = useState(true);

  useQuery(['checkIsPhone'], () => checkIsPhone(phone), {
    enabled: enabledAPIIsPhone,
    onSuccess: (responseData: any) => {
      if (responseData === null) {
        toast.show({title: 'Please enter customer information!'});
        navigation.navigate('Home', {
          isCheckCustomer: false,
          phone: phone,
          name: '',
          birthday: '',
        });
      } else {
        navigation.navigate('Home', {
          isCheckCustomer: true,
          phone: phone,
          name: responseData?.fullName,
          birthday: responseData?.dob,
        });
      }
      setEnabledAPIIsPhone(false);
    },
    onError: e => {
      console.log('Check Phone Error: ', e);
      setEnabledAPIIsPhone(false);
      toast.show({title: 'Connect Error!!'});
    },
  });

  // Set Disable Button
  useEffect(() => {
    if (phone.length === 10) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [phone]);

  const handleCheckin = () => {
    setEnabledAPIIsPhone(true);
  };

  const sourceImgBg = require('@/assets/images/bg_login.jpg');
  const sourceLogo = require('@/assets/images/logo.jpg');

  return (
    // <ImageBackground
    //   imageStyle={styles.image_bg}
    //   source={sourceImgBg}
    //   resizeMode="cover">
    <VStack style={styles.container}>
      <VStack style={styles.view_content} space={8}>
        <VStack>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title}>6FigurePOS</Text>
        </VStack>

        <Input
          style={styles.input}
          placeholder="Input phone number"
          size="xl"
          variant="underlined"
          // value="(817)966-6369"
          keyboardType="phone-pad"
          maxLength={10}
          focusOutlineColor={Colors.primary.lightGreen800}
          borderColor={Colors.primary.lightGreen800}
          onChangeText={(text: string) => setPhone(text)}
        />
        <Button
          style={styles.button}
          onPress={handleCheckin}
          isDisabled={disabledButton}>
          <Text style={styles.text_button}>{t('btn_check')}</Text>
        </Button>
      </VStack>
    </VStack>
    // </ImageBackground>
  );
};

export default withTranslation()(Login);

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    // backgroundColor: 'rgba(52, 52, 52, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_bg: {
    width: '100%',
    height: '100%',
  },
  img_logo: {
    flex: 1,
    alignSelf: 'center',
    height: '10@vs',
  },
  view_content: {
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    paddingHorizontal: '40@vs',
    paddingVertical: '20@vs',
    borderRadius: '15@vs',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '40@s',
    color: Colors.primary.whiteGreen,
  },
  input: {
    color: Colors.primary.whiteGreen,
    textAlign: 'center',
    fontSize: '28@s',
    fontWeight: '500',
  },
  button: {
    height: '70@vs',
    marginTop: '20@vs',
    borderRadius: '20@s',
    paddingVertical: 0,
    backgroundColor: Colors.primary.lightGreen700,
  },
  text_button: {
    height: '100%',
    textAlignVertical: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '30@s',
  },
});
