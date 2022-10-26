import {Button, HStack, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {withTranslation} from 'react-i18next';
import SelectTopicsModal from './SelectTopicsModal';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '@/themes/Colors';
import Icon from '@/components/common/Icon';

type IPropsHome = {
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

const Home: React.FC<IPropsHome> = ({t, navigation}) => {
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(dataStaffsFake[0]);

  return (
    <VStack style={styles.content}>
      <Text style={styles.titleHeader}>Thông tin đặt lịch</Text>
      <HStack>
        <VStack style={styles.viewTitle} space={3}>
          <Text style={styles.title}>Name:</Text>
          <Text style={styles.title}>Phone number:</Text>
          <Text style={styles.title}>Time order:</Text>
          <Text style={styles.title}>Arrival time:</Text>
          <Text style={styles.title}>Staff:</Text>
          <Text style={styles.title}>Service:</Text>
        </VStack>
        <VStack style={styles.viewValue} space={3}>
          <Text style={styles.value}>{data?.name}</Text>
          <Text style={styles.value}>{data.phone}</Text>
          <Text style={styles.value}>{data.timeOrder}</Text>
          <Text style={styles.value}>{data.arrivalTime}</Text>
          <HStack space={3}>
            <Text style={styles.value}>{selectedStaff.name}</Text>
            <Button
              style={{width: 10, height: 10}}
              onPress={() => setShowStaffModal(true)}>
              Select Staff
            </Button>
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
  content: {
    backgroundColor: Colors.primary.whiteGreen,
    width: '100%',
    height: '100%',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  titleHeader: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.primary.lightGreen900,
    marginBottom: 20,
  },
  title: {
    fontWeight: '400',
    fontSize: 15,
    color: Colors.primary.lightGreen900,
  },
  value: {
    fontWeight: '700',
    fontSize: 15,
    color: Colors.primary.lightGreen900,
  },
  viewTitle: {
    width: '40%',
  },
  viewValue: {
    width: '60%',
  },
});
