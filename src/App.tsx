import 'react-native-gesture-handler';

import {NativeBaseProvider} from 'native-base';
import {I18nextProvider} from 'react-i18next';
import {RootSiblingParent} from 'react-native-root-siblings';
import {QueryClient, QueryClientProvider} from 'react-query';

import {AppConsumer, AppProvider} from './AppContext';
import i18n from './common/i18next';
import ScreenStack from './screens';
import Theme from './themes';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 99999999999,
      retry: false,
    },
  },
});

const App = (props: any) => {
  return (
    <RootSiblingParent>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={Theme} config={config}>
          <I18nextProvider i18n={i18n}>
            <AppProvider {...props}>
              <AppConsumer>
                {funcs => {
                  global.props = {...funcs};
                  return <ScreenStack {...funcs} />;
                }}
              </AppConsumer>
            </AppProvider>
          </I18nextProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    </RootSiblingParent>
  );
};

export default App;
