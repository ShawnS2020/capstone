import { observable, action, makeObservable } from 'mobx';

class DummyAccountStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    username = "Dummy";
  
    @action
    changeUsername(username) {
        this.username = username;
    }

    @observable
    hobbies = ["guitar", "coding", "reading", "hiking"]

    @action
    addHobby(hobby) {
        this.hobbies.push(hobby);
    }

    @action
    removeHobby(index) {
        this.hobbies.splice(index, 1);
    }
}

const dummyAccountStore = new DummyAccountStore();

export default dummyAccountStore;