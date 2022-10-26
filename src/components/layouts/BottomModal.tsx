import {Box, HStack, Modal, Text} from 'native-base';
import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewProps} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

import Icon from '@/components/common/Icon';
import Colors from '@/themes/Colors';

export type IProps = {
  isOpen: boolean;
  onClose?: () => void;
  renderRight?: () => void;
  isHideHeader?: boolean;
  title?: string;
  contentStyle?: StyleProp<ViewProps>;
} & StyleProp<any>;

const BottomModal: React.FC<IProps> = ({
  isOpen,
  onClose,
  title,
  children,
  renderRight,
  isHideHeader,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} justifyContent="flex-end">
    <Modal.Header style={styles.content} width="100%" safeAreaBottom>
      {isHideHeader ? (
        []
      ) : (
        <HStack alignItems="center" style={styles.header}>
          <TouchableOpacity style={styles.icon} onPress={onClose}>
            <Icon name="close" />
          </TouchableOpacity>
          {!!title && <Text style={styles.title}>{title}</Text>}
          {renderRight ? renderRight() : <View />}
        </HStack>
      )}
      <Box>{children}</Box>
    </Modal.Header>
  </Modal>
);

export default BottomModal;

const styles = ScaledSheet.create({
  content: {
    maxHeight: '90%',
    minHeight: 250,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    backgroundColor: Colors.primary.whiteGreen,
  },
  header: {
    justifyContent: 'space-between',
    paddingVertical: '16@vs',
    paddingHorizontal: '20@ms0.5',
  },
  title: {
    fontWeight: '700',
  },
  icon: {
    padding: '4@s',
  },
});
