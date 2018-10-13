import { observable, computed } from 'mobx';

import { callMarvelApi } from '../api/MarvelApi';
import { Store } from './Store';
import { ObservableArray } from 'mobx/lib/types/observablearray';

export interface IComicsStore {
  getComicsForCharacter: (s: string) => void;
}

class ComicsStore extends Store {
  @observable
  comics = observable.map();

  getComicsForCharacter = async (characterId: string) => {
    if (!this.loading) {
      this.loading = true;

      const result = await callMarvelApi(`/characters/${characterId}/comics`);

      // console.log(`comics for ${characterId}`, result)

      this.comics.set(characterId, result);
      this.loading = false;
    } else {
      console.log('already fetching');
    }
  };
}

export const comicsStore = new ComicsStore();
