import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';

import { ICharactersStore, ICharacter } from '../../stores/CharactersStore';
import { Row, Column } from '../../components/Layout';
import { Avatar } from '../../components/Avatar';
import SearchBox from '../../components/SearchBox';

interface CharactersScreenProps {
  charactersStore: ICharactersStore;
  navigation: NavigationScreenProp<NavigationState>;
}

@inject('charactersStore')
@observer
export class CharactersScreen extends Component<CharactersScreenProps> {
  componentDidMount() {
    this.loadCharacters();
  }

  loadCharacters = () => {
    this.props.charactersStore.getCharacters({}, false);
  };

  onSearchChange = (value: string) => {
    this.props.charactersStore.setSearch(value);
  };

  onSearchSubmit = () => {
    this.props.charactersStore.getCharacters(
      {
        nameStartsWith: this.props.charactersStore.search,
      },
      true,
    );
  };

  onEndReached = () => {
    if (this.props.charactersStore.search.length === 0) {
      this.loadCharacters();
    }
  };

  onItemPress = (id: string) => {
    this.props.charactersStore.setSelectedCharacterId(id);
    this.props.navigation.navigate('CharacterDetail');
  };

  renderItem = ({ item }: { item: ICharacter }) => {
    return (
      <TouchableHighlight onPress={() => this.onItemPress(item.id)}>
        <Row
          alignItems="center"
          paddingVertical={16}
          borderBottomWidth={1}
          backgroundColor="#FFF"
          borderBottomColor="rgba(0,0,0,0.2)"
        >
          <Avatar
            marginHorizontal={16}
            source={{
              uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            }}
          />

          <Column>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 14 }}
            >
              {item.description || 'No description provided'}
            </Text>
          </Column>
          <Column width={40} />
        </Row>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View>
        <SearchBox
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          value={this.props.charactersStore.search}
        />
        <FlatList
          keyExtractor={item => `${item.id}`}
          data={this.props.charactersStore.characters}
          renderItem={this.renderItem}
          onEndReached={this.onEndReached}
        />
      </View>
    );
  }
}
