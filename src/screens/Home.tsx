import {
  Button,
  HStack,
  VStack,
  useSafeArea,
  Input,
  useToast,
  ScrollView,
} from 'native-base';
import React, {useState, useCallback} from 'react';
import {withTranslation} from 'react-i18next';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '@/themes/Colors';
import Icon from '@/components/common/Icon';
import {TouchableOpacity, Text} from 'react-native';
import {checkPhone, checkin} from '@/utils/services/api/myAPI';
import {useQuery} from 'react-query';

type IPropsHome = {
  route: any;
  navigation: any;
} & IPropsI18n;

const Home: React.FC<IPropsHome> = ({t, navigation, route}) => {
  const {isCheckCustomer} = route?.params;
  const {phone} = route?.params;
  const {name} = route?.params;
  const {birthday} = route?.params;
  const toast = useToast();
  const [dataBooking, setDataBooking] = useState(new Array());
  const [myName, setMyName] = useState(name);
  const [myBirthday, setMyBirthday] = useState(birthday);

  useQuery(['getDataInfo'], () => checkPhone(phone), {
    onSuccess: (responseData: any) => {
      console.log('success data booking: ', responseData);
      if (responseData?.list.length < 1) {
        return;
      }
      const listServices = responseData?.list[0].bookingDetails;
      var listServiceDetail = new Array();
      listServices.map((item: any) => {
        listServiceDetail.push(item?.serviceDetail);
      });
      console.log('list dataa: ', listServiceDetail);
      setDataBooking(listServiceDetail);
    },
    onError: e => {
      console.log('Get infor booking: ', e);
      toast.show({
        title: 'Phone number is not booking, please booking',
      });
    },
  });

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 3,
  });

  const renderItem = useCallback(
    (item: any) => (
      <Text key={item.id} style={styles.value}>
        {item.name}
      </Text>
    ),
    [],
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectServices = () => {
    navigation.navigate('SelectServices', {
      listSelected: dataBooking,
      setListSelected: setDataBooking,
    });
  };

  const handleCheckin = async () => {
    var paramsService = new Array();
    dataBooking.map((item: any) => {
      paramsService.push({serviceDetailId: item?.id});
    });
    console.log('paramsService: ', paramsService);
    try {
      const res = await checkin({
        customerName: myName,
        customerPhone: phone,
        dob: myBirthday,
        serviceDetailInternals: paramsService,
      });
      toast.show({title: 'Check in success!'});
      // TODO: navigate man hinh show thong tin
      navigation.navigate('Login');
    } catch (e) {
      console.log('Check in Error', e);
      toast.show({title: 'Server Connect Error! Please try again!'});
    }
  };

  return (
    <VStack style={styles.contenter} {...safeAreaProps}>
      <HStack>
        <TouchableOpacity style={styles.touchableOpacity} onPress={handleBack}>
          <Icon name="arrow_left" />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Booking Information</Text>
      </HStack>
      {/* Content */}
      {/* <ScrollView> */}
      <HStack space={8} style={{flex: 1, marginBottom: 30}}>
        <VStack style={styles.viewLeft}>
          <Text style={styles.textTitle}>Customer Information</Text>
          <HStack style={styles.view_info}>
            <VStack style={styles.viewTitle} space={8}>
              <Text style={styles.title}>Name:</Text>
              <Text style={styles.title}>Phone number:</Text>
              <Text style={styles.title}>Date of birth:</Text>
            </VStack>
            <VStack style={styles.viewValue} space={3}>
              <Input
                style={styles.value}
                placeholder="Input name"
                size="xl"
                value={myName}
                variant="underlined"
                focusOutlineColor={Colors.primary.lightGreen800}
                borderColor={Colors.primary.lightGreen800}
                isDisabled={isCheckCustomer}
                onChangeText={(text: string) => setMyName(text)}
              />
              <Input
                style={styles.value}
                placeholder="Input phone number"
                size="xl"
                value={phone}
                keyboardType="phone-pad"
                maxLength={10}
                variant="underlined"
                focusOutlineColor={Colors.primary.lightGreen800}
                borderColor={Colors.primary.lightGreen800}
                isDisabled={isCheckCustomer}
                // onChangeText={(text: string) => setPhone(text)}
              />
              <Input
                style={styles.value}
                placeholder="Input date of birth"
                size="xl"
                value={myBirthday}
                variant="underlined"
                focusOutlineColor={Colors.primary.lightGreen800}
                borderColor={Colors.primary.lightGreen800}
                isDisabled={isCheckCustomer}
                onChangeText={(text: string) => setMyBirthday(text)}
              />
            </VStack>
          </HStack>
          <Button style={styles.button} onPress={handleCheckin}>
            <Text style={styles.text_button}>Checkin</Text>
          </Button>
        </VStack>

        <VStack style={styles.viewRight}>
          <HStack>
            <Text style={[styles.textTitle, {flex: 1}]}>Service</Text>
            <Button style={styles.buttonEdit} onPress={handleSelectServices}>
              <Text style={styles.textButtonEdit}>Edit</Text>
            </Button>
          </HStack>
          <VStack style={styles.viewSelectService}>
            <ScrollView>
              {dataBooking.map((item, index) => renderItem(item, index))}
            </ScrollView>
          </VStack>
        </VStack>
      </HStack>
      {/* </ScrollView> */}
    </VStack>
  );
};

export default withTranslation()(Home);

const styles = ScaledSheet.create({
  contenter: {
    backgroundColor: Colors.primary.lightGreen100,
    width: '100%',
    height: '100%',
    paddingHorizontal: '15@vs',
    paddingVertical: '20@vs',
  },
  titleHeader: {
    width: '85%',
    fontWeight: '700',
    fontSize: '24@s',
    color: Colors.primary.lightGreen900,
    marginBottom: '16@vs',
    textAlign: 'center',
  },
  title: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.primary.whiteGreen,
  },
  value: {
    fontWeight: '600',
    fontSize: '14@s',
    color: Colors.primary.whiteGreen,
  },
  viewTitle: {
    width: '45%',
  },
  viewValue: {
    flex: 1,
  },
  touchableOpacity: {
    paddingHorizontal: '10@vs',
  },
  view_info: {
    flex: 1,
    backgroundColor: Colors.primary.lightGreen700,
    marginTop: '10@vs',
    paddingHorizontal: '20@vs',
    paddingVertical: '20@vs',
    borderRadius: '12@s',
  },
  viewLeft: {
    width: '60%',
    height: '100%',
  },
  viewSelectStaff: {
    flexDirection: 'row',
    paddingHorizontal: '20@vs',
    paddingVertical: '20@vs',
    backgroundColor: Colors.primary.lightGreen900,
    shadowColor: Colors.primary.lightGreen800,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: '12@s',
    elevation: 5,
    borderRadius: '12@s',
    marginTop: '30@vs',
    marginBottom: '20@vs',
  },
  viewValueStaff: {
    justifyContent: 'space-between',
    flex: 1,
  },
  viewSelectService: {
    flex: 1,
    height: '100%',
    paddingHorizontal: '20@vs',
    paddingVertical: '20@vs',
    backgroundColor: Colors.primary.lightGreen900,
    shadowColor: Colors.primary.lightGreen800,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: '12@s',
    elevation: 5,
    borderRadius: '12@s',
  },
  viewRight: {
    flex: 1,
  },
  button: {
    width: '100%',
    height: '60@vs',
    marginTop: '30@vs',
    borderRadius: '20@vs',
    paddingVertical: 0,
    alignSelf: 'center',
    backgroundColor: Colors.primary.lightGreen700,
  },
  text_button: {
    height: '100%',
    textAlignVertical: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '24@s',
  },
  textTitle: {
    fontWeight: '600',
    fontSize: '20@s',
    color: Colors.primary.lightGreen900,
    marginBottom: '10@vs',
  },
  buttonEdit: {
    borderRadius: '20@s',
    paddingVertical: 0,
    alignSelf: 'center',
    marginBottom: '10@vs',
    backgroundColor: Colors.primary.lightGreen700,
  },
  textButtonEdit: {
    textAlignVertical: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '18@s',
    marginHorizontal: '20@vs',
  },
});
