# Gym Workout Tracker

**Created by:** Beatriz Torres Archundia

## Overview

Gym Workout Tracker is a front-end fitness web application designed to help users organize and monitor their gym workouts in one place. The goal of the app is to make workout tracking easier by allowing users to create routines, add exercises, track sets, reps, weight, and view their progress over time.

Many people keep workout notes in different places or forget which exercises they completed during previous workouts. This app helps solve that problem by keeping workout information organized in one simple dashboard.

## Main Concept

Gym Workout Tracker is built using React.js. It allows users to create workout routines, add exercises to each routine, track workout details, filter saved workouts, and review their workout history. The application uses local storage to save user data directly in the browser, so workouts remain available after refreshing the page.

## Features

- Create and save workout routines
- Add exercises to a workout
- Track sets, reps, and weight
- Add workout duration, intensity, difficulty, and notes
- Estimate calories burned
- Mark workouts as complete
- Set a weekly workout goal
- View progress through cards and a chart
- Edit or delete saved workouts
- Filter workouts by category and day
- Search saved workouts
- View workout history
- Load sample workout data
- Add trending workout routines
- View popular workout videos with thumbnails
- Responsive layout for desktop and smaller screens

## Feature Details

### 1. Create and Save Workout Routines

Users can create a workout plan for any day of the week. Each workout can be given a name, category, day, mood, duration, intensity, difficulty, and notes.

The workout creation form uses controlled inputs and React state to collect the user’s information. Once the user saves a workout, it appears in the saved workout dashboard.

### 2. Add Exercises to a Workout

Users can add exercises to a selected workout routine. Each exercise can include:

- Exercise name
- Description
- Sets
- Reps
- Weight

The app uses a nested data structure where each workout contains its own list of exercises. This makes it easier to keep exercises connected to the correct routine.

### 3. Track Progress

The app tracks workout progress using dashboard cards, a weekly goal section, completion status, workout history, and a progress chart.

Users can view:

- Number of saved workouts
- Total exercises
- Total sets logged
- Estimated calories burned
- Completed workouts
- Favorite workout category
- Workout volume by day

This helps users compare their workouts and understand their progress over time.

### 4. Edit and Delete Workouts

Users can edit existing workout details if they need to update a routine. They can also delete workouts they no longer need.

React state is updated whenever a workout is edited or deleted, and the interface re-renders automatically to show the updated information.

### 5. Filter Workouts

Users can filter workouts by category and day. Categories include:

- Upper Body
- Legs
- Cardio
- Heavy Lifting
- Core
- Full Body

The app also includes a search bar so users can quickly find workouts or exercises.

## Additional Features

### Recommended Exercises

The app recommends exercises based on the workout category selected by the user. For example, selecting “Legs” may suggest exercises such as squats, lunges, hip thrusts, and leg press.

### Trending Workouts

The app includes premade trending workout routines that users can add to their saved workouts. These routines can be edited after being added.

### Workout Videos

The app includes a popular workout videos section with YouTube thumbnails. Users can click a video card to open the workout video in a new tab.

### Progress Chart

The progress chart displays workout volume by day, giving users a visual way to review their weekly activity.

## My Part of the Project

My part of the project focused on the main front-end features and layout of the application. This included designing and building:

- Workout dashboard
- Workout creation form
- Exercise tracking form
- Filtering system
- Progress section
- Workout history section
- Overall page layout and styling

The goal was to make the application easy to use, organized, and visually clean.

## Technical Scope

This project focuses only on front-end development. No backend implementation is required at this stage.

The application uses:

- React.js
- JavaScript
- CSS
- Local storage

Local storage is used to simulate saved user data in the browser.

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Local Storage
- GitHub Pages

## How to Run the Project Locally

1. Clone the repository:

```bash
git clone https://github.com/Btorre0/workout-tracker.git
