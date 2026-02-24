const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const modal = document.getElementById("result-modal");
const closeModalBtn = document.getElementById("close-modal");
const resultName = document.getElementById("result-name");
const resultImage = document.getElementById("result-image");
const wheelTitle = document.getElementById("wheel-title");

wheelTitle.innerText = WHEEL_CONFIG.title;

let currentRotation = 0; 
let isSpinning = false;

function drawWheel() {
    const totalItems = WHEEL_CONFIG.items.length;
    const arc = (2 * Math.PI) / totalItems;
    const offset = -Math.PI / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < totalItems; i++) {
        const item = WHEEL_CONFIG.items[i];
        const angle = offset + i * arc;
        
        ctx.beginPath();
        ctx.fillStyle = WHEEL_CONFIG.colors[i % WHEEL_CONFIG.colors.length];
        ctx.moveTo(200, 200); 
        ctx.arc(200, 200, 200, angle, angle + arc);
        ctx.fill();

        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(angle + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText(item.label, 170, 8); 
        ctx.restore();
    }
}

function getWinnerIndex() {
    let totalWeight = WHEEL_CONFIG.items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < WHEEL_CONFIG.items.length; i++) {
        if (random < WHEEL_CONFIG.items[i].weight) {
            return i;
        }
        random -= WHEEL_CONFIG.items[i].weight;
    }
    return 0;
}

function fireConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 30 };

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
    }, 250);
}

spinBtn.addEventListener("click", () => {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;

    const winnerIndex = getWinnerIndex();
    const winnerItem = WHEEL_CONFIG.items[winnerIndex];

    const totalItems = WHEEL_CONFIG.items.length;
    const sliceAngle = 360 / totalItems;
    
    const itemCenterAngle = (winnerIndex * sliceAngle) + (sliceAngle / 2);
    
    const spins = 8 * 360; 
    const rotateTo = spins + (360 - itemCenterAngle);

    currentRotation += rotateTo - (currentRotation % 360);

    canvas.style.transition = `transform ${WHEEL_CONFIG.spinDuration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`; 
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        spinBtn.disabled = false;
        
        resultName.innerText = `Phần thưởng của bạn: ${winnerItem.name}`;
        resultImage.src = winnerItem.image;
        modal.style.display = "flex";
        
        fireConfetti();
    }, WHEEL_CONFIG.spinDuration + 300); 
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

drawWheel();