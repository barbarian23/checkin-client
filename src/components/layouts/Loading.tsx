import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {RootSiblingPortal} from 'react-native-root-siblings';

// import Colors from '@/themes/Colors';

interface Props {
  show: boolean;
}

const Loading = ({show}: Props) => {
  if (!show) {
    return null;
  }
  return (
    <RootSiblingPortal>
      <View style={[StyleSheet.absoluteFill, styles.container]}>
        <View style={styles.content}>
          <ActivityIndicator size="large" />
          {/* <ActivityIndicator size="large" color={Colors.primary.orange} /> */}
        </View>
      </View>
    </RootSiblingPortal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.primary.windowTint,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  content: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
