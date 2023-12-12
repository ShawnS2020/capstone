import { observable, action, makeObservable } from 'mobx';

class GuestAccountStore {
    constructor() {
        makeObservable(this);
    }

    @observable
    username = "Guest";

    @observable
    hobbies = []

    @observable
    homeLocation = { description: '', coordinates: [] };

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

const guestAccountStore = new GuestAccountStore();

export default guestAccountStore;