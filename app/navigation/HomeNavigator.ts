import { createBottomTabNavigator } from 'react-navigation';
import { CharactersScreen } from '../screens/CharactersScreen';

export const HomeNavigator = createBottomTabNavigator({
  Characters: CharactersScreen,
});
