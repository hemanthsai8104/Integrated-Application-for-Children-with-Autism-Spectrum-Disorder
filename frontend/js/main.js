import { initializeAAC } from './aac.js';
import { initializeLearningGame } from './learningGame.js';
import { initializeEmotionRecognition } from './emotion.js';
document.addEventListener('DOMContentLoaded', () => {
    var _a, _b, _c, _d;
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-button');
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.toggle('active', screen.id === screenId);
        });
        navButtons.forEach(button => {
            // This line is now a proper template literal
            const buttonScreen = `nav-${screenId.split('-')[0]}`;
            button.classList.toggle('active', button.id === buttonScreen);
        });
    }
    (_a = document.getElementById('nav-home')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => showScreen('home-screen'));
    (_b = document.getElementById('nav-emotion')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => showScreen('emotion-screen'));
    (_c = document.getElementById('nav-aac')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => showScreen('aac-screen'));
    (_d = document.getElementById('nav-learning')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => showScreen('learning-screen'));
    initializeAAC();
    initializeLearningGame();
    initializeEmotionRecognition();
    showScreen('home-screen');
});
