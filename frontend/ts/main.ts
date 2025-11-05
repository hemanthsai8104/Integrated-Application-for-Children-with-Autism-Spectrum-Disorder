import { initializeAAC } from './aac.js';
import { initializeLearningGame } from './learningGame.js';
import { initializeEmotionRecognition } from './emotion.js';

document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const navButtons = document.querySelectorAll('.nav-button');

    function showScreen(screenId: string) {
        screens.forEach(screen => {
            screen.classList.toggle('active', screen.id === screenId);
        });
        navButtons.forEach(button => {
            // This line is now a proper template literal
            const buttonScreen = `nav-${screenId.split('-')[0]}`;
            button.classList.toggle('active', button.id === buttonScreen);
        });
    }

    document.getElementById('nav-home')?.addEventListener('click', () => showScreen('home-screen'));
    document.getElementById('nav-emotion')?.addEventListener('click', () => showScreen('emotion-screen'));
    document.getElementById('nav-aac')?.addEventListener('click', () => showScreen('aac-screen'));
    document.getElementById('nav-learning')?.addEventListener('click', () => showScreen('learning-screen'));

    initializeAAC();
    initializeLearningGame();
    initializeEmotionRecognition();

    showScreen('home-screen');
});