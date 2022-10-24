import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';

import {Splash} from '../components/layouts';
import {navigationRef} from '@/utils/services/navigation';
// import useAuthenticated from '@/hooks/useAuthenticated';

import Login from './Login';
import Home from './Home';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const {isAuthenticated, setIsAuthenticated} = useAuthenticated();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="">
        {isLoading ? (
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
        ) : true ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeScreen"
              component={Home}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;