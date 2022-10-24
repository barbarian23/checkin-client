import AsyncStorage from '@react-native-async-storage/async-storage';

export const set = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (e) {
    // saving error
  }
};

export const get = async (key: string) => {
  try {
    return await AsyncStorage.getItem(`@${key}`);
  } catch (e) {
    return '';
  }
};
