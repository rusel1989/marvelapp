import * as React from 'react';
import { Provider } from 'mobx-react/native'

import { RootNavigator } from './app/navigation'
import * as stores from './app/stores';

export class App extends React.Component<{}> {
  render() {
    return (
        <Provider {...stores}>
          <RootNavigator />
        </Provider>
    );
  }
}

