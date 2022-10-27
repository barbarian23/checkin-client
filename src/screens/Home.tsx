import {Button, HStack, Text, VStack, useSafeArea} from 'native-base';
import React, {useState, useCallback} from 'react';
import {withTranslation} from 'react-i18next';
import SelectTopicsModal from './SelectTopicsModal';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '@/themes/Colors';
import Icon from '@/components/common/Icon';
import {TouchableOpacity} from 'react-native';

type IPropsHome = {
  route: any;
  navigation: any;
} & IPropsI18n;

const data = {
  name: 'Nguyen Thi A',
  phone: '0987654321',
  timeOrder: '01/11/2022 9:30:10 AM',
  arrivalTime: '02/11/2022 9:30:10 AM',
  staff: 'Nhan vien A',
  service: ['nail, hair'],
};

const dataStaffsFake = [
  {
    id: '1',
    name: 'Nguyen Thi H',
  },
  {
    id: '2',
    name: 'Tran Van B',
  },
  {
    id: '3',
    name: 'Tran Van D',
  },
  {
    id: '4',
    name: 'Tran Thi A',
  },
];

const Home: React.FC<IPropsHome> = ({t, navigation, route}) => {
  const {responseCheckPhone} = route?.params;
  console.log('data Check: ', responseCheckPhone);
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 3,
  });

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [showStaffModal, setShowStaffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(dataStaffsFake[0]);

  return (
    <VStack style={styles.contenter} {...safeAreaProps}>
      <HStack>
        <TouchableOpacity style={styles.touchableOpacity} onPress={handleBack}>
          <Icon name="arrow_left" />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Thông tin đặt lịch</Text>
      </HStack>
      <HStack style={styles.view_info}>
        <VStack style={styles.viewTitle} space={3}>
          <Text style={styles.title}>Name:</Text>
          <Text style={styles.title}>Phone number:</Text>
          <Text style={styles.title}>Time order:</Text>
          <Text style={styles.title}>Arrival time:</Text>
        </VStack>
        <VStack style={styles.viewValue} space={3}>
          <Text style={styles.value}>{data?.name}</Text>
          <Text style={styles.value}>{data.phone}</Text>
          <Text style={styles.value}>{data.timeOrder}</Text>
          <Text style={styles.value}>{data.arrivalTime}</Text>
        </VStack>
      </HStack>

      <HStack style={styles.viewSelectStaff}>
        <Text style={[styles.title, styles.viewTitle]}>Staff:</Text>
        <HStack style={styles.viewValueStaff}>
          <Text style={styles.value}>{selectedStaff.name}</Text>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => setShowStaffModal(true)}>
            <Icon name="arrow_right" />
          </TouchableOpacity>
        </HStack>
      </HStack>

      <HStack style={styles.viewSelectStaff}>
        <Text style={[styles.title, styles.viewTitle]}>Service:</Text>
        <VStack style={{height: 80}}>
          <HStack style={styles.viewValueStaff}>
            <Text style={styles.value}>{selectedStaff.name}</Text>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => setShowStaffModal(true)}>
              <Icon name="arrow_right" />
            </TouchableOpacity>
          </HStack>
          <HStack style={styles.viewValueStaff}>
            <Text style={styles.value}>{selectedStaff.name}</Text>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => setShowStaffModal(true)}>
              <Icon name="arrow_right" />
            </TouchableOpacity>
          </HStack>
        </VStack>
      </HStack>

      <SelectTopicsModal
        staffs={dataStaffsFake} // TODO: Co API thay dataFake thanh topics
        isOpen={showStaffModal}
        onClose={() => setShowStaffModal(false)}
        value={selectedStaff}
        onSelect={(topic: any) => {
          setSelectedStaff(topic);
          setShowStaffModal(false);
        }}
      />
    </VStack>
  );
};

export default withTranslation()(Home);

const styles = ScaledSheet.create({
  contenter: {
    backgroundColor: Colors.primary.whiteGreen,
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
  },
  titleHeader: {
    width: '85%',
    fontWeight: '700',
    fontSize: 20,
    color: Colors.primary.lightGreen900,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontWeight: '400',
    fontSize: 15,
    color: Colors.primary.whiteGreen,
  },
  value: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.primary.whiteGreen,
  },
  viewTitle: {
    width: '40%',
  },
  viewValue: {
    width: '60%',
  },
  touchableOpacity: {
    paddingHorizontal: 10,
  },
  view_info: {
    backgroundColor: Colors.primary.lightGreen700,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 12,
  },
  viewSelectStaff: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.primary.lightGreen900,
    shadowColor: Colors.primary.lightGreen800,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    borderRadius: 12,
    marginTop: 30,
  },
  viewValueStaff: {
    justifyContent: 'space-between',
    flex: 1,
  },
});
