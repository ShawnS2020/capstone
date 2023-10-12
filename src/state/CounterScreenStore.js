import { observable, action, makeObservable } from 'mobx';

class CounterScreenStore {
  constructor() {
    makeObservable(this);
  }
  
  @observable
  counter = 0;

  @observable
  text = "Hello World";

  @action
  changeText(text) {
    this.text = text;
  }

  @action
  incrementCounter() {
    this.counter += 1;
  }
}

const counterScreenStore = new CounterScreenStore();

export default counterScreenStore;