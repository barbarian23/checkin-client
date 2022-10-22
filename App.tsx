/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';

const App = () => {
  const openLock = () => {};

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => openLock()}>
        <Text style={{fontSize: 30, color: 'red'}}>Open dooor</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
