import {VStack, Button, useToast, Image, HStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import {ScaledSheet} from 'react-native-size-matters';
import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import {useQuery} from 'react-query';
import Colors from '@/themes/Colors';
import {checkIsPhone} from '@/utils/services/api/myAPI';
import {Icon} from '@/components/common';
import Loading from '@/components/layouts/Loading';

type IPropsLogin = {
  navigation: any;
} & IPropsI18n;

const Login: React.FC<IPropsLogin> = ({t, navigation}) => {
  const [phone, setPhone] = useState('');
  const [enabledAPIIsPhone, setEnabledAPIIsPhone] = useState(false);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useQuery(
    ['checkIsPhone'],
    () =>
      checkIsPhone(phone.replace('(', '').replace(')', '').replace('-', '')),
    {
      enabled: enabledAPIIsPhone,
      onSuccess: (responseData: any) => {
        setIsLoading(false);
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
        setIsLoading(false);
        console.log('Check Phone Error: ', e);
        setEnabledAPIIsPhone(false);
        toast.show({title: 'Connect Error!!'});
      },
    },
  );

  const handleCheckin = () => {
    if (phone === '') {
      toast.show({title: 'Please enter the phone number'});
      return;
    }
    setEnabledAPIIsPhone(true);
  };

  const sourceImgBg = require('@/assets/images/bg_login.jpg');
  const sourceLogo = require('@/assets/images/logo.jpg');
  const bracket_left = require('@/assets/images/ic_bracket_(.png');
  const bracket_right = require('@/assets/images/ic_bracket_).png');

  return (
    <HStack style={{flex: 1}}>
      <VStack style={styles.view_left}>
        <Image
          style={styles.image}
          source={sourceLogo}
          alt="Alternate Text"
          size="2xl"
        />

        <VStack>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title}>6FigurePOS</Text>
        </VStack>
      </VStack>

      <VStack style={styles.container} space={10}>
        <Text style={styles.titleHeader}>
          {phone.length === 0 ? 'Input phone' : phone}
        </Text>

        <VStack style={styles.view_content} space={5}>
          <HStack space={8}>
            <TouchableOpacity onPress={() => setPhone(phone.concat('1'))}>
              <Icon name="ic_1" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPhone(phone.concat('2'))}>
              <Icon name="ic_2" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPhone(phone.concat('3'))}>
              <Icon name="ic_3" />
            </TouchableOpacity>
          </HStack>
          <HStack space={8}>
            <TouchableOpacity onPress={() => setPhone(phone.concat('4'))}>
              <Icon name="ic_4" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPhone(phone.concat('5'))}>
              <Icon name="ic_5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPhone(phone.concat('6'))}>
              <Icon name="ic_6" />
            </TouchableOpacity>
          </HStack>
          <HStack space={8}>
            <TouchableOpacity onPress={() => setPhone(phone.concat('7'))}>
              <Icon name="ic_7" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPhone(phone.concat('8'))}>
              <Icon name="ic_8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPhone(phone.concat('9'))}>
              <Icon name="ic_9" />
            </TouchableOpacity>
          </HStack>
          <HStack space={8} style={{justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => setPhone('')}>
              <Icon name="ic_delete_all" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPhone(phone.concat('0'))}>
              <Icon name="ic_0" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPhone(phone.slice(0, -1))}>
              <Icon name="ic_dash" />
            </TouchableOpacity>
          </HStack>
        </VStack>
        <Button style={styles.button} onPress={handleCheckin}>
          <Text style={styles.text_button}>{t('btn_check')}</Text>
        </Button>
        <Loading show={isLoading} />
      </VStack>
    </HStack>
  );
};

export default withTranslation()(Login);

const styles = ScaledSheet.create({
  container: {
    width: '40%',
    height: '100%',
    // backgroundColor: 'black',
    backgroundColor: Colors.primary.lightGreen100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '20@vs',
  },
  image_bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  img_logo: {
    flex: 1,
    alignSelf: 'center',
    height: '10@vs',
  },
  view_content: {},
  title: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '40@s',
    color: Colors.primary.lightGreen700,
  },
  input: {
    color: Colors.primary.whiteGreen,
    textAlign: 'center',
    fontSize: '28@s',
    fontWeight: '500',
  },
  button: {
    width: '80%',
    height: '50@vs',
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
    fontSize: '20@s',
  },
  view_left: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    // backgroundColor: 'rgba(52, 52, 52, 0.4)',
  },
  image: {
    marginVertical: '20@vs',
  },
  titleHeader: {
    fontWeight: '700',
    fontSize: '22@s',
    color: Colors.primary.lightGreen700,
    textAlign: 'center',
  },
});
