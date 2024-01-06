'use strict';

import {Cycling} from './cycling.js';
import {Running} from './running.js';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//variables
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
// *******************************************************************************************
class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(coords, distance, duration){
        this.coords = coords; // [lat, long]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
};

//Tests:
// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycle1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycle1);

// *******************************************************************************************
//APPLICATION ARCHITECTURE
class App {
    //private instances
    #map;
    #mapEvent;

    //get position on run
    constructor(){
        this._getPosition();
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField.bind(this));
    }

    _getPosition(){
        //pop up window:
        if (navigator.geolocation) 
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function() {
                alert('Could not get your position');
    });
}

    _loadMap(position){
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}?entry=ttu`);
            
        const coords = [latitude, longitude]; 
        this.#map = L.map('map').setView(coords, 13);
        // second param is the zoom of the rendered map

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        
        //from Leaflet lib - clicks on map
        this.#map.on('click', this._showForm.bind(this));
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
            form.classList.remove('hidden');
            inputDistance.focus();
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    
    _newWorkout(e){
        //prevents form reloading automatically
        e.preventDefault();

        //Clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        //Display marker
        const {lat, lng} = this.#mapEvent.latlng;
    
        L.marker([lat, lng]).addTo(this.#map).bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
        
    })
    )
    .setPopupContent('Workout')
    .openPopup(); 
    }

};

const app = new App();

