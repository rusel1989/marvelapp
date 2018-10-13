import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';
import get from 'lodash/get';

import { ICharactersStore, ICharacter } from '../stores/CharactersStore';

interface Props {
  charactersStore: ICharactersStore;
  navigation: NavigationScreenProp<NavigationState>;
}

interface NavigationOptionsArgs {
  navigation: NavigationScreenProp<NavigationState>;
}

@inject('charactersStore')
@observer
export class CharacterDetailScreen extends Component<Props> {
  static navigationOptions = ({ navigation }: NavigationOptionsArgs) => {
    return {
      title: navigation.getParam('title') || 'Detail',
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      title: get(this.props.charactersStore.selectedCharacter, 'name'),
    });
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}
