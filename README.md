# Activity and Diet Tracker App

## Overview
A React Native app for tracking activities and diet entries on iOS and Android. Users can:
- Log activities (e.g., running, cycling) with duration and date.
- Record diet entries with food details and calories.
- Mark "special" entries based on conditions.
- Switch between light and dark themes.
- Store data locally (Part 1) and sync with Firebase Firestore (Part 2).

## Features
### Part 1:
- Bottom tab navigation: Activities, Diet, Settings.
- Add/Edit activities and diet entries.
- Theme toggling with React Context.
- Local data storage using React Context.

### Part 2:
- Firebase Firestore for real-time data storage.
- Edit and delete functionality.
- Pressable components for UI interactions.
- Firestore listeners for live updates.

## Screens
- **Activities Screen:** List of activities.
- **Diet Screen:** List of diet entries.
- **Add Activity/Diet Screen:** Form with validation.
- **Settings Screen:** Theme toggle.
- **Edit Screen (Part 2):** Modify or delete existing entries.

## Data Handling
- **Part 1:** Uses React Context for local state management.
- **Part 2:** Firestore integration with real-time updates.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd activity-diet-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo project:
   ```bash
   npm start
   ```
4. Run on device:
   - Android: Press `a`
   - iOS: Press `i`

## Development Workflow
- Create a new branch for each feature:
  ```bash
  git checkout -b feature-branch
  ```
- Commit and push changes:
  ```bash
  git add .
  git commit -m "Your message"
  git push origin feature-branch
  ```
- Open a pull request and assign the TA as a reviewer.
- Merge to `main` only after approval.

## Submission Guidelines
- Ensure the app runs on both iOS and Android.
- Submit the GitHub repo link via the course system.

## Notes
- Use environment variables for Firebase config.
- Keep components reusable and modular.
- Maintain consistent styling.
- Address TA feedback before proceeding to Part 2.

For questions, open an issue or contact the course staff.

