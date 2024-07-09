# Mapty Project

This is the Mapty project, developed as part of Joseph Schetmann's JavaScript course on Udemy. The project is designed to help you log your running and cycling workouts on a map. It showcases the use of modern JavaScript features, third-party libraries, and web APIs.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Mapty is a web application that allows users to log their running and cycling workouts. Users can input their workout details, and the app will display the workout location on a map using the Leaflet library. This project helps reinforce concepts like OOP (Object-Oriented Programming), working with third-party libraries, and handling asynchronous JavaScript with promises and the Fetch API.

## Features

- Log running and cycling workouts with details like distance, duration, and additional metrics (e.g., cadence for running, elevation gain for cycling).
- Display workouts on a map with custom markers.
- View workout details in a list.
- Persist workouts using local storage, so data is retained across sessions.

## Technologies Used

- **JavaScript (ES6+):** The primary programming language used to build the project.
- **HTML5:** For structuring the web application.
- **CSS3:** For styling the application.
- **Leaflet:** A JavaScript library for interactive maps.
- **LocalStorage:** For persisting workout data across sessions.

## Setup

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/mapty-project.git
   cd mapty-project

2. Open the index.html file:
  Open the index.html file in your preferred web browser.
  No additional dependencies or build steps are required for this project.

## Usage
1. Adding a Workout:
  - Select either "Running" or "Cycling" from the workout type dropdown.
  - Fill in the required fields: distance, duration, and either cadence or elevation gain.
  - Click "OK" to log the workout.

2. Viewing Workouts:
  - Logged workouts will appear on the map as markers.
  - Click on a marker to see the workout details.
  - The workout details will also appear in a list below the form.

3. Persistent Data:
  - Workouts are stored in the browser's local storage and will be available even after refreshing the page or closing the browser.

## Flowchart -- Using Whiteboards.io

<img src="archi-flowchart/Mapty-flowchart.png" alt="Main Flowchart"></img>


[Main Project Flowchart](https://app.whiteboards.io/jays-collaboration/board/-NnCZKC-wl-WZI8xnGPd#!%7B%22zoom%22%3A0.5946035575013606%2C%22translate%22%3A%5B457.7547206623856%2C501.70359592917794%5D%7D)

## Project Architecture

<img src="archi-flowchart/Mapty-architecture-part-1.png" alt="Project Architecture">

[Mapty Architecture](https://app.whiteboards.io/jays-collaboration/board/-NnMoN-cwHQelCVAQQpP)

## Contributing
Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

Fork the repository.
Create a new branch:
- git checkout -b feature/your-feature-name
Make your changes and commit them:
- git commit -m 'Add some feature'
Push to the branch:
- git push origin feature/your-feature-name
Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to customize the content further to better match your specific implementation and preferences!
