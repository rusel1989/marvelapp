import { observable } from 'mobx';

export class Store {
  @observable
  loading = false;
}
