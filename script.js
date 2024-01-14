'use strict';

import {Cycling} from './cycling.js';
import {Running} from './running.js';


// *******************************************************************************************
class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    clicks = 0;

    constructor(coords, distance, duration){
        this.coords = coords; // [lat, long]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    _setDescription() {
        // prettier-ignore
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        this.description = `${this.type[0].toUpperCase()}${this.type.lice(1)} on ${months[this.date.getMonth()]
        } ${this.date.getDate()}`;
    
    }

    click(){
        this.clicks++;
    }
};

//Tests:
// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycle1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycle1);

// *******************************************************************************************

//APPLICATION ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
    //private instances
    #map;
    #zoom =13; 
    #mapEvent;
    #workouts = [];

    //get position on run
    constructor(){
        //get user's position
        this._getPosition();

        //get data from local Storage
        this._getLocalStorage();

        //Attach event handlers
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField.bind(this));
        containerWorkouts.addEventListener('click', this._moveToPopup).bind(this);
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
        // console.log(`https://www.google.com/maps/@${latitude},${longitude}?entry=ttu`);
            
        const coords = [latitude, longitude]; 
        this.#map = L.map('map').setView(coords, this.#zoom);
        // second param is the zoom of the rendered map

        L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        
        //from Leaflet lib - clicks on map
        this.#map.on('click', this._showForm.bind(this));

        //render returning markers to map now map is loaded
        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        });
    }
    

    _showForm(mapE){
        this.#mapEvent = mapE;
            form.classList.remove('hidden');
            inputDistance.focus();
    }

    _hideForm(){
        //Empty inputs
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        form.computedStyleMap.display = 'none';
        form.classList.add('hidden');
        setTimeout(()=> form.computedStyleMap.display = 'grid', 1000);
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }
    
    _newWorkout(e){
        const validInputs = (...inputs)=> 
            inputs.every(inp => Number.isFinite(inp));

        const allPositive = (...inputs)=>
            inputs.every(inp => inp > 0);
        //prevents form reloading automatically
        e.preventDefault();

        //get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const {lat, lng} = this.#mapEvent.latlng;

        let workout;

        //if activity running, create running obj
        if(type == 'running'){
            const cadence = +inputCadence.value;
            //Check if data is valid
            if (
                !validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)
            )
                 return alert('Inputs have to be positive numbers!');

                 workout = new Running([lat, lng], distance, duration, cadence);
        }
        //if activity cycling, create cycling obj
        if(type == 'cycling'){
            const elevation = +inputElevation.value;
            
            if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration)
            )
                return alert('Inputs have to be positive numbers!');

                workout = new Cycling([lat, lng], distance, duration, elevation);
            }

        //Add new obj to workout array
        this.#workouts.push(workout);
        

        //Render workout on map as a marker
        this._renderWorkoutMarker(workout);
        
        //Render workout on the list
        this._renderWorkout(workout);
    

        //Clear input fields
        this._hideForm();

        //set local storage to all workouts
        this._setLocalStorage();

    }


    _renderWorkoutMarker(workout){
        L.marker(workout.coords).addTo(this.#map).bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
    })
    )
    .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
    .openPopup(); 
}

    _renderWorkout(workout){
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
                <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
            </div>
          `;
        if(workout.type === 'running')
            html += `
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            </li>
        `;

        if(workout.type === 'cycling')
            html += `
                <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
            </div>
            </li>
            `;

            form.insertAdjacentHTML('afterend', html);
        
        }

        _moveToPopup(e){
            //takes the closest html class related to .workout
            const workoutEl = e.target.closest('.workout');

            if(!workoutEl) return;

            const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id); 

            this.#map.setView(workout.coords, this.#zoom, {
                animate: true, 
                pan: {duration: 1}
            });

            // using the public interface:
            // workout.click(); -- note that localStorage can't return this method 
        }

        _setLocalStorage(){
            //(key name, string conversion) -- use for small amt of data
            localStorage.setItem('workouts', JSON.stringify(this.#workouts));
        }

        _getLocalStorage(){
            const data = JSON.parse(localStorage.getItem('workouts'));

            if(!data) return;

            this.#workouts = data;

            this.#workouts.forEach(work => {
                this._renderWorkout(work);
            });
        }

        reset(){
            localStorage.removeItem('workouts');
            location.reload();
        }
}

const app = new App();