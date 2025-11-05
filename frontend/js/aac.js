export function initializeAAC() {
    const aacGrid = document.getElementById('aac-grid');
    if (!aacGrid)
        return;
    const items = [
        { text: 'I am hungry', icon: '🍔' },
        { text: 'I want to drink', icon: '🥤' },
        { text: 'I want to play', icon: '⚽' },
        { text: 'I need help', icon: '❓' },
        { text: 'I feel happy', icon: '😊' },
        { text: 'I am tired', icon: '😴' },
    ];
    aacGrid.innerHTML = ''; // Clear existing content
    items.forEach(item => {
        const iconEl = document.createElement('div');
        iconEl.className = 'aac-icon';
        // This line is now a proper template literal
        iconEl.innerHTML = `<span>${item.icon}</span>${item.text}`;
        iconEl.onclick = () => {
            speechSynthesis.cancel(); // Stop any previous speech
            const utterance = new SpeechSynthesisUtterance(item.text);
            speechSynthesis.speak(utterance);
        };
        aacGrid.appendChild(iconEl);
    });
}
