import { createStackNavigator } from 'react-navigation';
import { HomeNavigator } from './HomeNavigator';
import { CharacterDetailScreen } from '../screens/CharacterDetailScreen';

export const RootNavigator = createStackNavigator(
  {
    Home: { screen: HomeNavigator, navigationOptions: { title: 'MARVEL' } },
    CharacterDetail: { screen: CharacterDetailScreen },
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
