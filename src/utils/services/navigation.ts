import {CommonActions, StackActions} from '@react-navigation/native';
import React, {RefObject} from 'react';

/**
 * The navigation is implemented as a service so that it can be used outside of components, for example in sagas.
 *
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

export const navigationRef: RefObject<any> = React.createRef();

const getCurrentRoute = () => navigationRef.current.getCurrentRoute().name;

const goBack = () => {
  navigationRef.current.dispatch(CommonActions.goBack());
};

const replace = (routeName: string, params = {}) => {
  navigationRef.current.dispatch(StackActions.replace(routeName, params));
};

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
const navigate = (routeName: string, params = {}) => {
  navigationRef.current.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
};

const setParams = (params = {}) => {
  navigationRef.current.dispatch(
    CommonActions.setParams({
      params,
    }),
  );
};

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
const navigateAndReset = (routeName: string, params = {}) => {
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: routeName,
          params,
        },
      ],
    }),
  );
};

export default {
  getCurrentRoute,
  goBack,
  navigate,
  replace,
  setParams,
  navigateAndReset,
};
