import { createStackNavigator } from 'react-navigation';
import { HomeNavigator } from './HomeNavigator';

export const RootNavigator = createStackNavigator({
  Home: HomeNavigator,
});
