/* eslint-disable react/jsx-curly-brace-presence */
import {Divider, HStack, Text, VStack} from 'native-base';
import React, {useCallback} from 'react';
import {StyleProp, TouchableOpacity} from 'react-native';

import Icon from '@/components/common/Icon';

import styles from './ItemTopic.style';

export type IPropsApartment = {
  isLastItem?: boolean;
  topic: any;
  setSelectedTopic: () => void;
  listTopics: any;
  setListTopics: () => void;
} & StyleProp<any>;

/*
ItemTopic component is item of list Topic in SelectTopicsModal component
feature: ui item Topic in view select Topic
*/
const ItemTopic: React.FC<IPropsApartment> = ({
  isLastItem = false,
  topic,
  setSelectedTopic,
  listTopics,
  setListTopics,
}) => {
  const ChangeSelectTopic = useCallback(() => {
    const updateList = (listTopics || []).map((object: any) => {
      if (topic.id === object.id) {
        const updateItem = {...object, isSelect: true};
        setSelectedTopic(updateItem);
        return updateItem;
      }
      const updateItem = {...object, isSelect: false};
      return updateItem;
    });

    setListTopics(updateList);
  }, [listTopics]);

  return (
    <VStack>
      <HStack style={styles.container}>
        <Icon name="claim_chat" />
        <Text style={styles.label} type="Body1">
          {topic.name}
        </Text>
        <TouchableOpacity
          style={styles.view_icon_radio}
          onPress={() => ChangeSelectTopic()}>
          {topic.isSelect ? (
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

export default ItemTopic;
