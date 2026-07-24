# Integrated Application for Children with Autism Spectrum Disorder

A support application for children with Autism Spectrum Disorder, combining facial emotion recognition, an AAC (Augmentative and Alternative Communication) board, and interactive learning games.

## Features

- **Emotion Recognition:** Uses OpenCV-based facial detection to recognize and respond to a child's emotional state in real time.
- **AAC Communication Board:** Supports non-verbal or limited-verbal communication through an interactive board interface.
- **Learning Games:** Interactive games designed to support learning and engagement.
- **Web-Based Interface:** Accessible through a browser-based frontend.

## Tech Stack

- **Backend:** Python (OpenCV for facial detection)
- **Frontend:** JavaScript, TypeScript, HTML, CSS

## Project Structure

Integrated-Application-for-Children-with-Autism-Spectrum-Disorder/
├── backend/
│ ├── app.py # Backend entry point / emotion detection logic
│ ├── haarcascade_frontalface_default.xml # OpenCV face detection model
│ └── requirements.txt # Python dependencies
├── frontend/
│ ├── css/ # Stylesheets
│ ├── js/
│ │ ├── aac.js # AAC communication board logic
│ │ ├── emotion.js # Emotion detection UI/integration
│ │ ├── learningGame.js # Learning game logic
│ │ └── main.js # App entry point
│ ├── ts/ # TypeScript source
│ ├── index.html
│ └── tsconfig.json
└── setup_project.ps1 # Project setup script (Windows)


## Getting Started

### Prerequisites

- Python 3.8+
- A modern web browser

### Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/hemanthsai8104/Integrated-Application-for-Children-with-Autism-Spectrum-Disorder.git
   cd Integrated-Application-for-Children-with-Autism-Spectrum-Disorder
```

2. **Set up the backend:**
```bash
   cd backend
   python -m venv venv

   # Windows
   .\venv\Scripts\activate

   # macOS/Linux
   source venv/bin/activate

   pip install -r requirements.txt
```

### Running the App

**Start the backend:**
```bash
cd backend
python app.py
```

**Open the frontend:**
Open `frontend/index.html` in your browser (or serve it via a local development server).

## Purpose

This project aims to provide an accessible, engaging tool that helps children with Autism Spectrum Disorder communicate, recognize emotions, and learn through interactive, supportive technology.

## License

This project is for personal/educational use.
