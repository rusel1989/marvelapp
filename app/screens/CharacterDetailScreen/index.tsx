import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { inject, observer } from 'mobx-react/native';
import get from 'lodash/get';

import { ICharactersStore, ICharacter } from '../../stores/CharactersStore';
import { Heading, Paragraph } from '../../components/Typography';
import { Column } from '../../components/Layout';
import { Avatar } from '../../components/Avatar';
import { IComicsStore } from '../../stores/ComicsStore';
import { ComicBookCover } from './components/ComicBookCover';

interface Props {
  charactersStore: ICharactersStore;
  comicsStore: IComicsStore;
  navigation: NavigationScreenProp<NavigationState>;
}

interface NavigationOptionsArgs {
  navigation: NavigationScreenProp<NavigationState>;
}

@inject('charactersStore', 'comicsStore')
@observer
export class CharacterDetailScreen extends Component<Props> {
  static navigationOptions = ({ navigation }: NavigationOptionsArgs) => {
    return {
      title: navigation.getParam('title') || 'Detail',
    };
  };

  componentDidMount() {
    this.props.comicsStore.getComicsForCharacter(this.getCharacterProp('id'));
    this.props.navigation.setParams({
      title: this.getCharacterProp('name'),
    });
  }

  getCharacterProp = (prop: string, def?: string): any => {
    return get(this.props.charactersStore.selectedCharacter, prop, def);
  };

  getImageUrl = ({ extension, path }) => {
    return `${path}.${extension}`;
  };

  onPreviewComicsDetail = () => {};

  onShowComicsDetaíl = () => {
    // hardcore
  };

  renderComicsItem = ({ item }) => {
    return (
      <ComicBookCover
        onPress={this.onShowComicsDetail}
        onPreview={this.onPreviewComicsDetail}
        title={item.title}
        coverUrl={this.getImageUrl(item.thumbnail)}
      />
    );
  };

  get comics() {
    return this.props.comicsStore.comics.get(this.getCharacterProp('id')) || [];
  }

  render() {
    const thumbnail = this.getCharacterProp('thumbnail');
    return (
      <ScrollView>
        <Column alignItems="center" padding={16}>
          <Avatar
            source={{ uri: `${thumbnail.path}.${thumbnail.extension}` }}
            size={120}
          />
          <Heading>{this.getCharacterProp('name')}</Heading>
          <Paragraph>
            {this.getCharacterProp('description', 'No description provided')}
          </Paragraph>
          <Heading>Comic books</Heading>
          {this.comics.length ? (
            <FlatList
              style={{ marginHorizontal: -16 }}
              horizontal
              renderItem={this.renderComicsItem}
              data={this.comics}
            />
          ) : (
            <ActivityIndicator
              style={{ paddingVertical: 16 }}
              color="#f0141e"
              size="large"
            />
          )}
        </Column>
      </ScrollView>
    );
  }
}
