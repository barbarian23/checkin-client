import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

type IPropsSplash = {
  navigation: any;
};

const Splash: React.FC<IPropsSplash> = ({navigation}) => {
  const [progress, setProgress] = useState<number>(0);

  return (
    <View style={styles.container}>
      <Text>Loading!!!!!!!</Text>
      {progress ? <Text>{`Loading... ${progress}%`}</Text> : <View />}
    </View>
  );
};

export default Splash;

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    borderRadius: 8,
    width: '60@ms',
    height: '60@ms',
  },
});
