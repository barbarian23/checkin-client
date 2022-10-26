import React, {useCallback, useEffect, useState} from 'react';
import {withTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import {Text} from 'native-base';

import BottomModal from '@/components/layouts/BottomModal';

import ItemStaff from './ItemStaff';

import {ScaledSheet} from 'react-native-size-matters';

import Colors from '@/themes/Colors';

type IProps = {
  isOpen: boolean;
  onClose: () => void;
  value: any;
  staffs: any;
  onSelect: (item: any) => void;
} & IPropsI18n;

const Staffs: React.FC<IProps> = ({
  t,
  isOpen,
  onClose,
  onSelect,
  value,
  staffs,
}) => {
  const [selectedStaff, setSelectedStaff] = useState(value);
  const [listStaffs, setListStaffs] = useState([]);

  useEffect(() => {
    const coppyList = staffs?.map((item: any) => {
      if (value.id === item.id) {
        const updateItem = {...item, isSelect: true};
        setSelectedStaff(value);
        return updateItem;
      }
      const updateItem = {...item, isSelect: false};
      return updateItem;
    });
    setListStaffs(coppyList);
  }, [value]);

  const renderItem = useCallback(
    (item: any, index: number) => (
      <ItemStaff
        key={item.id}
        label={item.name}
        isLastItem={index === staffs.length - 1}
        staff={item}
        setSelectedStaff={setSelectedStaff}
        listStaffs={listStaffs}
        setListStaffs={setListStaffs}
      />
    ),
    [selectedStaff, listStaffs?.length],
  );

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('select_staff')}
      renderRight={() => (
        <TouchableOpacity onPress={() => onSelect(selectedStaff)}>
          <Text style={styles.choose}>Select</Text>
        </TouchableOpacity>
      )}>
      {listStaffs?.map((item, index) => renderItem(item, index))}
    </BottomModal>
  );
};

export default withTranslation()(Staffs);

const styles = ScaledSheet.create({
  container: {},
  choose: {
    color: Colors.primary.lightGreen900,
  },
});
