import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import { Column } from '../../../components/Layout';
import { Image, Text, TouchableWithoutFeedback } from 'react-native';

interface Props {}

export class ComicBookCover extends Component<Props> {
  state = {
    showPreview: false,
  };

  onPreview = () => {
    this.setState({ showPreview: true });
  };

  onPress() {}

  onPressOut = () => {
    if (this.state.showPreview) {
      this.setState({ showPreview: false });
    }
  };

  render() {
    const { title, coverUrl } = this.props;
    return (
      <View>
        <TouchableWithoutFeedback
          onPressOut={this.onPressOut}
          onLongPress={this.onPreview}
          onPress={this.onPress}
        >
          <Column padding={16} width={242} alignItems="center">
            <Image
              style={{ width: 210, height: 297 }}
              resizeMode="contain"
              source={{ uri: coverUrl }}
            />
            <Text>{title}</Text>
          </Column>
        </TouchableWithoutFeedback>
        <Modal visible={this.state.showPreview}>
          <Image
            style={{ width: null, height: null, flex: 1 }}
            resizeMode="cover"
            source={{ uri: coverUrl }}
          />
        </Modal>
      </View>
    );
  }
}
