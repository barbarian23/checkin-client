import {
  Button,
  HStack,
  VStack,
  useSafeArea,
  Divider,
  View,
  useToast,
  Checkbox,
} from 'native-base';
import React, {useState, useCallback, useEffect} from 'react';
import {withTranslation} from 'react-i18next';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '@/themes/Colors';
import Icon from '@/components/common/Icon';
import {TouchableOpacity, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getService} from '@/utils/services/api/myAPI';
import {useQuery} from 'react-query';

type IProps = {
  route: any;
  navigation: any;
} & IPropsI18n;

const SelectServices: React.FC<IProps> = ({t, navigation, route}) => {
  const {listSelected} = route?.params;
  const {setListSelected} = route?.params;
  const toast = useToast();
  console.log('data book Services: ', listSelected);
  const [data, setData] = useState([]);
  const [listServiceDetail, setListServiceDetail] = useState([]);
  const [indexSelectService, setIndexSelectService] = useState(0);
  const [listSelectedServiceDetail, setSelectedListServiceDetail] =
    useState(listSelected);

  useQuery(
    ['getService'],
    () => getService('10e0633b-9f1c-438e-95e8-a86a7a2499fc'),
    {
      onSuccess: (responseData: any) => {
        console.log('success data services: ', responseData?.list);
        if (responseData?.list.length < 1) {
          return;
        }
        setData(responseData?.list);
        setListServiceDetail(responseData?.list[0].serviceDetails);
      },
      onError: e => {
        console.log('Get list services error: ', e);
        toast.show({
          title: 'Server Connect Error! Please try again!',
        });
      },
    },
  );

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 3,
  });

  const renderItemService = useCallback(
    (item: any, index: number) => (
      <VStack key={item.id}>
        <TouchableOpacity
          onPress={() => {
            setIndexSelectService(index);
            setListServiceDetail(item.serviceDetails);
          }}>
          <Text
            style={
              indexSelectService === index
                ? [styles.value, styles.textSelect]
                : styles.value
            }>
            {item.name}
          </Text>
          <View style={{marginEnd: 50}}>
            <Divider />
          </View>
        </TouchableOpacity>
      </VStack>
    ),
    [indexSelectService],
  );

  const onChangeCheckbox = useCallback(
    (value: boolean, index: number) => {
      if (data[indexSelectService].serviceDetails[index]?.isSelect) {
        data[indexSelectService].serviceDetails[index].isSelect = false;
        const indexDelete = listSelectedServiceDetail.findIndex(
          (i: any) =>
            i.id === data[indexSelectService].serviceDetails[index].id,
        );
        console.log('------------------index tesst delete', indexDelete);
        if (indexDelete > -1) {
          delete listSelectedServiceDetail[indexDelete];
        }
      } else {
        console.log('index tesst', indexSelectService);
        data[indexSelectService].serviceDetails[index].isSelect = true;
        listSelectedServiceDetail.push(
          data[indexSelectService].serviceDetails[index],
        );
        setSelectedListServiceDetail(listSelectedServiceDetail);
      }
    },
    [indexSelectService, data, listServiceDetail],
  );

  const renderItemServiceDetail = useCallback(
    (item: any, index: number) => (
      <HStack key={item.id} style={styles.checkboxContainer} space={5}>
        <Checkbox
          size="lg"
          colorScheme="orange"
          onChange={value => onChangeCheckbox(value, index)}
          value={item.name}
          style={styles.checkbox}
          isChecked={item?.isSelect}
        />
        <Text style={styles.title}>{item.name}</Text>
      </HStack>
    ),
    [listServiceDetail],
  );

  const renderItemSelectedService = useCallback(
    (item: any, index: number) => (
      <VStack key={item.id}>
        <Text style={styles.value}>{`${index + 1} -  ${item.name}`}</Text>
        <View style={styles.item_selected}>
          <Divider />
        </View>
      </VStack>
    ),
    [listSelectedServiceDetail, indexSelectService, listServiceDetail],
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDone = useCallback(() => {
    setListSelected(listSelectedServiceDetail);
    navigation.goBack();
  }, [navigation]);

  return (
    <VStack style={styles.contenter} {...safeAreaProps}>
      <HStack>
        <TouchableOpacity style={styles.touchableOpacity} onPress={handleBack}>
          <Icon name="arrow_left" />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Select Services</Text>
      </HStack>
      {/* Content */}
      <HStack space={10} style={styles.contentView}>
        <VStack style={styles.viewLeft}>
          <Text style={styles.textTitle}>Select services</Text>
          <HStack style={styles.view_info}>
            {/* List */}
            <ScrollView
              style={styles.viewListService}
              showsVerticalScrollIndicator={false}>
              {data.map((item, index) => renderItemService(item, index))}
            </ScrollView>
            <Divider style={{width: 1, height: '100%'}} />
            {/* detail service */}
            <VStack style={styles.viewListServiceDetail}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {listServiceDetail.map((item, index) =>
                  renderItemServiceDetail(item, index),
                )}
              </ScrollView>
            </VStack>
          </HStack>
        </VStack>

        <VStack style={styles.viewRight}>
          <Text
            style={
              styles.textTitle
            }>{`Selected services (${listSelectedServiceDetail.length})`}</Text>
          <ScrollView style={styles.viewSelectService}>
            {listSelectedServiceDetail.map((item, index) =>
              renderItemSelectedService(item, index),
            )}
          </ScrollView>
        </VStack>
      </HStack>

      <Button style={styles.button} onPress={handleDone}>
        <Text style={styles.text_button}>Done</Text>
      </Button>
    </VStack>
  );
};

export default withTranslation()(SelectServices);

const styles = ScaledSheet.create({
  contenter: {
    backgroundColor: Colors.primary.lightGreen100,
    width: '100%',
    height: '100%',
    paddingHorizontal: '12@vs',
    paddingVertical: '20@vs',
  },
  contentView: {
    flex: 1,
    marginBottom: '0@vs',
    height: '100%',
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
    paddingVertical: '10@vs',
  },
  textSelect: {
    color: Colors.primary.lightGreen900,
  },
  textUnSelect: {
    color: Colors.primary.whiteGreen,
  },
  viewTitle: {
    width: '40%',
  },
  viewValue: {
    flex: 1,
  },
  touchableOpacity: {
    paddingHorizontal: '5@vs',
  },
  view_info: {
    flex: 1,
    backgroundColor: Colors.primary.lightGreen700,
    paddingHorizontal: '12@vs',
    paddingVertical: '10@vs',
    borderRadius: '12@s',
    flexDirection: 'row',
  },
  viewLeft: {
    width: '60%',
    height: '100%',
  },
  viewSelectService: {
    flex: 1,
    height: '100%',
    paddingHorizontal: '12@vs',
    paddingVertical: '10@vs',
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
    height: '100%',
  },
  button: {
    width: '80%',
    height: '60@vs',
    marginTop: '20@vs',
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
    fontWeight: '600',
    fontSize: '24@s',
  },
  textTitle: {
    fontWeight: '600',
    fontSize: '14@s',
    color: Colors.primary.lightGreen900,
    marginBottom: '10@vs',
  },
  viewListService: {
    flex: 1,
    height: '100%',
    paddingRight: '0@vs',
  },
  viewListServiceDetail: {
    paddingLeft: '12@vs',
    flex: 2,
    height: '100%',
  },
  checkboxContainer: {
    marginBottom: '20@vs',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  item_selected: {
    marginBottom: '0@vs',
  },
});
