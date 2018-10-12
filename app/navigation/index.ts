import { createStackNavigator } from 'react-navigation';
import { HomeNavigator } from './HomeNavigator';

export const RootNavigator = createStackNavigator(
  {
    Home: { screen: HomeNavigator, navigationOptions: { title: 'MARVEL' } },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f0141e',
      },
      headerTitleStyle: {
        color: '#FFF',
      },
    },
  },
);
