# PET EXPO 🐶🐱🐦

A single-page website for a pet exhibition, built with **React** and **Vite**.

## Features

- **Gallery** of dogs ([TheDogAPI](https://thedogapi.com)), cats ([TheCatAPI](https://thecatapi.com)) and birds ([iNaturalist](https://www.inaturalist.org)) — all free, no API key needed
- **Search** by animal name
- **Detail pop-up**: click any card to see breed, origin, lifespan, temperament and more
- Responsive header with a mobile menu
- About Us, Contact Us and Find Us sections

## Tech stack

- React 18
- Vite 5
- react-icons
- ESLint

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

### Other scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run build`   | Build for production in `dist/`  |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run ESLint                       |

## Project structure

```
src/
├── App.jsx              # Page layout
├── api/animals.js       # API URLs + mapping to a common shape
├── components/
│   ├── Header.jsx       # Logo + navigation
│   ├── Gallery.jsx      # Category buttons, search, list
│   ├── GetAnimals.jsx   # Loads and filters dogs / cats / birds
│   ├── Card.jsx         # Animal card
│   ├── PopUp.jsx        # Animal details
│   ├── SearchBar.jsx
│   ├── AboutUs.jsx
│   ├── ContactUs.jsx
│   ├── FindUs.jsx
│   └── Footer.jsx
└── assets/
```

## Author

**Derald Shehi** – [LinkedIn](https://www.linkedin.com/in/deraldshehi94/)
