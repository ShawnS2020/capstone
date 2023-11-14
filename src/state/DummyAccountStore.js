import { observable, action, makeObservable } from 'mobx';

class DummyAccountStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    username = "John Smith";

    @observable
    hobbies = ["guitar", "coding", "reading", "hiking"]

    @observable
    homeLocation = [40.712626, -74.005597];

    @observable
    useCurrentLocation = true;

    @action
    changeUsername(username) {
        this.username = username;
    }

    @action
    addHobby(hobby) {
        this.hobbies.push(hobby);
    }

    @action
    removeHobby(index) {
        this.hobbies.splice(index, 1);
    }

    @action
    changeHomeLocation(location) {
        this.homeLocation = location;
    }

    @action
    toggleUseCurrentLocation() {
        this.useCurrentLocation = !this.useCurrentLocation;
    }
}

const dummyAccountStore = new DummyAccountStore();

export default dummyAccountStore;