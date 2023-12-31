import {Workout} from './script.js';

class Cycling extends Workout {
    type = 'cycling';

    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
}
    calcSpeed() {
    // km / hr
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
    }
};
