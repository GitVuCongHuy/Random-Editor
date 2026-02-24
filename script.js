const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const modal = document.getElementById("result-modal");
const closeModalBtn = document.getElementById("close-modal");
const resultName = document.getElementById("result-name");
const resultImage = document.getElementById("result-image");

let currentRotation = 0; // Lưu góc quay hiện tại
let isSpinning = false;

// 1. Hàm vẽ vòng quay dựa trên config
function drawWheel() {
    const totalItems = WHEEL_CONFIG.items.length;
    const arc = (2 * Math.PI) / totalItems;
    
    // Offset -90 độ để ô đầu tiên nằm chính giữa phía trên
    const offset = -Math.PI / 2;

    for (let i = 0; i < totalItems; i++) {
        const item = WHEEL_CONFIG.items[i];
        const angle = offset + i * arc;
        
        ctx.beginPath();
        ctx.fillStyle = WHEEL_CONFIG.colors[i % WHEEL_CONFIG.colors.length];
        ctx.moveTo(200, 200); // Tâm canvas (400x400)
        ctx.arc(200, 200, 200, angle, angle + arc);
        ctx.fill();

        // Vẽ chữ
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(angle + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "bold 20px Arial";
        ctx.fillText(item.label, 180, 5); // Căn chữ ra sát viền
        ctx.restore();
    }
}

// 2. Thuật toán chọn người thắng dựa trên "weight" (tỉ lệ)
function getWinnerIndex() {
    let totalWeight = WHEEL_CONFIG.items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < WHEEL_CONFIG.items.length; i++) {
        if (random < WHEEL_CONFIG.items[i].weight) {
            return i;
        }
        random -= WHEEL_CONFIG.items[i].weight;
    }
    return 0; // Trả về mặc định phòng hờ
}

// 3. Xử lý khi bấm nút Quay
spinBtn.addEventListener("click", () => {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;

    // Lấy trước kết quả trúng thưởng
    const winnerIndex = getWinnerIndex();
    const winnerItem = WHEEL_CONFIG.items[winnerIndex];

    // Tính toán góc quay để dừng lại đúng ô winner
    const totalItems = WHEEL_CONFIG.items.length;
    const sliceAngle = 360 / totalItems;
    
    // Góc dừng = Góc trúng thưởng + Random một chút bên trong ô đó để tự nhiên hơn
    const stopAngle = (winnerIndex * sliceAngle) + (sliceAngle / 2);
    
    // Thêm số vòng quay ảo (ví dụ quay 5 vòng tròn trước khi dừng)
    const spins = 5 * 360; 
    
    // Tính toán độ lệch (đảm bảo mũi tên nằm ở trên cùng)
    // 360 - stopAngle vì canvas quay theo chiều kim đồng hồ
    const rotateTo = (360 - stopAngle) + spins;

    // Cộng dồn vào góc quay hiện tại
    currentRotation += rotateTo - (currentRotation % 360);

    // Apply hiệu ứng CSS quay
    canvas.style.transition = `transform ${WHEEL_CONFIG.spinDuration}ms ease-out`;
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    // Đợi quay xong thì hiện Popup
    setTimeout(() => {
        isSpinning = false;
        spinBtn.disabled = false;
        
        // Cập nhật popup
        resultName.innerText = `Bạn nhận được: ${winnerItem.name}`;
        resultImage.src = winnerItem.image;
        modal.style.display = "flex";
    }, WHEEL_CONFIG.spinDuration + 200); // Cộng thêm 200ms cho mượt
});

// Xử lý đóng Popup
closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Khởi tạo vòng quay lúc vừa mở web
drawWheel();