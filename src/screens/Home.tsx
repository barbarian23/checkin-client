import {
  Button,
  HStack,
  VStack,
  useSafeArea,
  Input,
  useToast,
  ScrollView,
} from 'native-base';
import {Platform} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {withTranslation} from 'react-i18next';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '@/themes/Colors';
import Icon from '@/components/common/Icon';
import {TouchableOpacity, Text} from 'react-native';
import {checkPhone, checkin} from '@/utils/services/api/myAPI';
import Loading from '@/components/layouts/Loading';
import {useQuery} from 'react-query';
import {Picker, View} from 'react-native-ui-lib';

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
  const [isLoading, setIsLoading] = useState(true);
  const [month, setMonth] = useState('Select month');
  const [day, setDay] = useState('Select day');
  const monthOptions = [
    {label: 'January ', value: '01'},
    {label: 'February ', value: '02'},
    {label: 'March ', value: '03'},
    {label: 'April ', value: '04'},
    {label: 'May ', value: '05'},
    {label: 'June ', value: '06'},
    {label: 'July ', value: '07'},
    {label: 'August ', value: '08'},
    {label: 'September ', value: '09'},
    {label: 'October ', value: '10'},
    {label: 'November ', value: '11'},
    {label: 'December ', value: '12'},
  ];
  const dayOptions = [
    {label: '1', value: '01'},
    {label: '2	', value: '02'},
    {label: '3', value: '03'},
    {label: '4', value: '04'},
    {label: '5', value: '05'},
    {label: '6', value: '06'},
    {label: '7', value: '07'},
    {label: '8', value: '08'},
    {label: '9', value: '09'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
    {label: '13', value: '13'},
    {label: '14', value: '14'},
    {label: '15', value: '15'},
    {label: '16', value: '16'},
    {label: '17', value: '17'},
    {label: '18', value: '18'},
    {label: '19', value: '19'},
    {label: '20', value: '20'},
    {label: '21', value: '21'},
    {label: '22', value: '22'},
    {label: '23', value: '23'},
    {label: '24', value: '24'},
    {label: '25', value: '25'},
    {label: '26', value: '26'},
    {label: '27', value: '27'},
    {label: '28', value: '28'},
    {label: '29', value: '29'},
    {label: '30', value: '30'},
    {label: '31', value: '31'},
  ];

  useEffect(() => {
    if (birthday) {
      const birthCompare = birthday.split('-');
      setMonth(birthCompare[0]);
      setDay(birthCompare[1]);
    }
  }, []);

  useQuery(
    ['getDataInfo'],
    () => checkPhone(phone.replace('(', '').replace(')', '').replace('-', '')),
    {
      onSuccess: (responseData: any) => {
        setIsLoading(false);
        console.log('success data booking: ', responseData);
        if (responseData?.list.length < 1) {
          return;
        }
        const listServices = responseData?.list[0].bookingDetails;
        var listServiceDetail = new Array();
        if (listServices === undefined) {
          return;
        }
        listServices.map((item: any) => {
          listServiceDetail.push(item?.serviceDetail);
        });
        console.log('list dataa: ', listServiceDetail);
        setDataBooking(listServiceDetail);
      },
      onError: e => {
        setIsLoading(false);
        console.log('Get infor booking: ', e);
        toast.show({
          title: 'Phone number is not booking, please booking',
        });
      },
    },
  );

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
    setIsLoading(true);
    var paramsService = new Array();
    dataBooking.map((item: any) => {
      paramsService.push({serviceDetailId: item?.id});
    });
    console.log('paramsService: ', paramsService);
    const birth = `${month}-${day}`;
    try {
      const res = await checkin({
        customerName: myName,
        customerPhone: phone.replace('(', '').replace(')', '').replace('-', ''),
        dob: birth,
        serviceDetailInternals: paramsService,
      });
      setIsLoading(false);
      toast.show({title: 'Check in success!'});
      // TODO: navigate man hinh show thong tin
      navigation.navigate('Login');
    } catch (e) {
      setIsLoading(false);
      console.log('Check in Error', e);
      toast.show({title: e?.data?.message});
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={Platform.OS === 'ios' ? {flex: 1} : undefined} // dung IOS
    >
      <VStack style={styles.contenter} {...safeAreaProps}>
        <HStack style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={handleBack}>
            <Icon name="arrow_left" />
          </TouchableOpacity>
          <Text style={styles.titleHeader}>Booking Information</Text>
        </HStack>
        {/* Content */}
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
                  // value="(817)966-6369"
                  keyboardType="phone-pad"
                  variant="underlined"
                  focusOutlineColor={Colors.primary.lightGreen800}
                  borderColor={Colors.primary.lightGreen800}
                  isDisabled={true}
                  // onChangeText={(text: string) => setPhone(text)}
                />
                <HStack style={{flex: 1, height: '100%'}}>
                  <View style={{width: '60%'}}>
                    <Picker
                      style={styles.value}
                      placeholder="Month"
                      useNativePicker
                      value={month}
                      onChange={(item: any) => setMonth(item)}>
                      {monthOptions.map(option => (
                        <Picker.Item
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </Picker>
                  </View>

                  <View style={{width: '40%'}}>
                    <Picker
                      value={day}
                      placeholder="Day"
                      useNativePicker
                      onChange={(item: any) => setDay(item)}
                      style={styles.value}>
                      {dayOptions.map(option => (
                        <Picker.Item
                          key={option.value}
                          value={option.value}
                          label={option.label}
                        />
                      ))}
                    </Picker>
                  </View>
                </HStack>
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
        <Loading show={isLoading} />
      </VStack>
    </KeyboardAwareScrollView>
  );
};

export default withTranslation()(Home);

const styles = ScaledSheet.create({
  contenter: {
    flex: 1,
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
