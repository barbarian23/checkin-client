import React, {useState} from 'react';
import {Platform} from 'react-native';
import Toast from 'react-native-simple-toast';

import Loading from './components/layouts/Loading';

type ContextProps = {};

export const AppContext = React.createContext<Partial<ContextProps>>({});

export const AppConsumer = AppContext.Consumer;

export const AppProvider = (props: any) => {
  const [loading, setLoading] = useState(false);
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const showToast = (message: string) => {
    if (message) {
      setTimeout(
        () => {
          Toast.show(message, Toast.LONG);
        },
        Platform.OS === 'ios' ? 300 : 0,
      );
    }
  };

  const funcs: any = {
    showLoading,
    hideLoading,
    showToast,
  };

  return (
    <AppContext.Provider value={{...funcs}}>
      {props.children}
      <Loading show={loading} />
    </AppContext.Provider>
  );
};
