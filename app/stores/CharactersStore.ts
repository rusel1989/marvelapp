import { observable } from 'mobx';

import { callMarvelApi } from '../api/MarvelApi';
import { Store } from './Store';

export interface ICharactersQuery {
  nameStartsWith?: string;
  limit?: number;
  offset?: number;
}

export interface ICharacter {
  id: string;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  thumbnail: { 
    path:string; 
    extension: string; 
  };
  urls: [];
  comics: {};
  stories: {};
  events: {};
  series: {};
}

export interface ICharactersStore {
  characters: ICharacter[];
  search: string;
  getCharacters: (q: ICharactersQuery, r: boolean) => void;
  setSearch: (v: string) => void;
  resetSearch: () => void;
}

class CharactersStore extends Store {
  @observable
  characters = [];

  @observable
  offset = 0;

  @observable
  search = '';

  limit = 20;

  getCharacters = async (query: ICharactersQuery = {}, reset: boolean = false) => {
    if (!this.loading) {
      this.loading = true;

      if (reset) {
        this.characters = [];
        this.offset = 0;
      }

      const payload = {
        limit: this.limit,
        offset: this.offset,
        ...query,
      };
      const result = await callMarvelApi('/characters', payload);

      this.characters = this.characters.concat(result);
      this.offset = this.offset + this.limit;
      this.loading = false;
    } else {
      console.log('already fetching');
    }
  };

  setSearch = (query: string) => {
    this.search = query;
  };

  resetSearch = () => {
    this.search = '';
  };
}

export const charactersStore = new CharactersStore();
