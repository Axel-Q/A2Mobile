# 🏃‍♂️ Activity and Diet Tracker App

Welcome to the Activity and Diet Tracker App! This React Native app helps users track activities and diet entries on both iOS and Android.

## 📌 Features
- Track activities (e.g., running, swimming) with duration and date.
- Log diet entries with food description, calories, and date.
- Mark special entries (e.g., running > 60 min, calories > 800).
- Toggle light/dark themes.
- Store and sync data with Firebase Firestore (Part 2).

## 🔄 Workflow
1. **Initialize Repository**: Clone and set up the project.
2. **Branching**: Create new branches for each part.
3. **Commit & Push**: Make frequent commits and push changes.
4. **Pull Request**: Assign your TA as a reviewer before merging.
5. **Continue to Part 2**: Merge and transition from React Context to Firestore.

## 📱 Screens
### 🏅 Activities Screen
- Displays logged activities in a scrollable list.
### 🍽️ Diet Screen
- Lists diet entries with calories and food descriptions.
### ➕ Add Activity Screen
- Add an activity with name, duration, and date.
- Validates inputs before saving.
### 🥗 Add Diet Entry Screen
- Add food details with calorie count and date.
- Marks special entries automatically.
### ⚙️ Settings Screen
- Toggle dark/light mode using React Context.
### ✏️ Edit Screen (Part 2)
- Edit or delete existing entries.
- Updates Firestore in real time.

## 🔧 Data Handling
- **Part 1**: Uses React Context for local state management.
- **Part 2**: Switches to Firebase Firestore for real-time updates.

## 🚀 Firebase Firestore Integration (Part 2)
1. **Setup** Firebase using environment variables.
2. **Listen** for real-time updates.
3. **Replace Buttons** with Pressable components.

## 🎨 Styling & Theming
- Modular styles stored in a `styles.js` file.
- React Context manages theme switching.
- Pressable components provide visual feedback.

## ✅ Submission Guidelines
1. **Branching**: Work in separate branches.
2. **Commit Often**: Use meaningful commit messages.
3. **Pull Requests**: Assign a TA for review.
4. **Cross-Platform Testing**: Ensure the app runs on iOS & Android.
5. **Submit GitHub Repo**: Share the link via the course system.

## 📝 Notes
- Use **environment variables** for Firebase config.
- Keep components **reusable and modular**.
- Maintain **consistent styles and layout**.
- Address feedback from Part 1 before starting Part 2.

💡 Need help? Open an issue or contact the course staff!

