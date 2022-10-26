/* eslint-disable react/jsx-curly-brace-presence */
import {Divider, HStack, Radio, VStack, Text} from 'native-base';
import React, {useCallback} from 'react';
import {StyleProp, TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import Icon from '@/components/common/Icon';

export type IPropsApartment = {
  isLastItem?: boolean;
  staff: any;
  setSelectedStaff: () => void;
  listStaffs: any;
  setListStaffs: () => void;
} & StyleProp<any>;

const ItemStaff: React.FC<IPropsApartment> = ({
  isLastItem = false,
  staff,
  setSelectedStaff,
  listStaffs,
  setListStaffs,
}) => {
  const ChangeSelectStaff = useCallback(() => {
    const updateList = (listStaffs || []).map((object: any) => {
      if (staff.id === object.id) {
        const updateItem = {...object, isSelect: true};
        setSelectedStaff(updateItem);
        return updateItem;
      }
      const updateItem = {...object, isSelect: false};
      return updateItem;
    });

    setListStaffs(updateList);
  }, [listStaffs]);

  return (
    <VStack>
      <HStack style={styles.container}>
        <Text style={styles.label}>{staff.name}</Text>
        <TouchableOpacity
          style={styles.view_icon_radio}
          onPress={() => ChangeSelectStaff()}>
          {staff.isSelect ? (
            <Icon name="radio_button_select" />
          ) : (
            <Icon name="radio_button_unselect" />
          )}
        </TouchableOpacity>
      </HStack>
      {!isLastItem && <Divider />}
    </VStack>
  );
};

export default ItemStaff;

const styles = ScaledSheet.create({
  container: {
    paddingVertical: '14@s',
    paddingHorizontal: '16@s',
  },
  label: {
    flex: 1,
    marginLeft: '16@s',
  },
  view_icon_radio: {
    padding: 5,
  },
});
