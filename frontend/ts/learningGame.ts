export function initializeLearningGame() {
    // THIS IS THE ALTERNATIVE FIX: The '!' tells TypeScript "Trust me, this exists."
    const promptEl = document.getElementById('game-prompt')!;
    const optionsEl = document.getElementById('game-options')!;
    const feedbackEl = document.getElementById('game-feedback')!;

    const colors = [
        { name: 'Red', hex: '#E74C3C' },
        { name: 'Blue', hex: '#3498DB' },
        { name: 'Green', hex: '#2ECC71' },
        { name: 'Yellow', hex: '#F1C40F' },
    ];
    let correctColor: { name: string, hex: string };

    function setupNewRound() {
        optionsEl.innerHTML = '';
        feedbackEl.textContent = '';
        correctColor = colors[Math.floor(Math.random() * colors.length)];
        promptEl.innerHTML = `Tap the color: <span style="color:${correctColor.hex}">${correctColor.name}</span>`;

        [...colors].sort(() => Math.random() - 0.5).forEach(color => {
            const option = document.createElement('div');
            option.className = 'game-option';
            option.style.backgroundColor = color.hex;
            option.onclick = () => handleOptionClick(color);
            optionsEl.appendChild(option);
        });
    }

    function handleOptionClick(selectedColor: { name: string, hex: string }) {
        if (selectedColor.name === correctColor.name) {
            feedbackEl.textContent = 'Great Job! 🌟';
            feedbackEl.style.color = 'green';
            setTimeout(setupNewRound, 1500);
        } else {
            feedbackEl.textContent = 'Try Again!';
            feedbackEl.style.color = 'red';
            setTimeout(() => { feedbackEl.textContent = ''; }, 1000);
        }
    }
    setupNewRound();
}