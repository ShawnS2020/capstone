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
    homeLocation = { description: 'City Hall, New York, NY, USA', coordinates: [40.712626, -74.005597] };

    @observable
    useCurrentLocation = false;

    @action
    changeUsername(username) {
        this.username = username;
    }

    @action
    changeHobbies(hobbies) {
        this.hobbies = hobbies;
    }

    @action
    addHobby(hobby) {
        this.hobbies = [...this.hobbies, hobby];
    }

    @action
    removeHobby(index) {
        this.hobbies = this.hobbies.filter((h, i) => i != index);
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