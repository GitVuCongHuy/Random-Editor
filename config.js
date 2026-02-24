
const WHEEL_CONFIG = {

  // ── Tiêu đề hiển thị trên trang ─────────────────────────
  title: "Vòng Quay May Mắn",
  subtitle: "Lì Xì Tết 2026 🧧",

  // ── Nút quay ─────────────────────────────────────────────
  spinButtonText: "QUAY NGAY",
  spinButtonIcon: "🎰",

  // ── Thời gian quay (mili-giây) ───────────────────────────
  spinDuration: 5000,       // tổng thời gian quay
  minSpins: 5,              // số vòng tối thiểu trước khi dừng

  // ── Âm thanh (để "" nếu không dùng) ─────────────────────
  // Dùng file local hoặc URL
  soundSpin: "",            // tiếng quay
  soundWin:  "",            // tiếng trúng thưởng

  // ── Các ô phần thưởng ────────────────────────────────────
  // weight: trọng số xác suất (0 = không bao giờ trúng)
  //         weight càng cao → càng dễ trúng
  //         weight = 0      → không bao giờ xuất hiện kết quả này
  //
  // image: đường dẫn ảnh (để "" nếu chỉ dùng emoji/text)
  // emoji: hiển thị khi không có ảnh
  //
  segments: [
    {
      id: 1,
      label: "5.000đ",
      sublabel: "Lì xì nhỏ",
      emoji: "🧧",
      image: "",            // ví dụ: "images/reward_5k.png"
      color: "#FF6B6B",
      textColor: "#ffffff",
      weight: 40,           // xác suất cao
      message: "Chúc mừng! Bạn nhận được lì xì 5.000đ 🎉",
    },
    {
      id: 2,
      label: "10.000đ",
      sublabel: "Lì xì vui",
      emoji: "💛",
      image: "",
      color: "#FFD93D",
      textColor: "#333333",
      weight: 30,
      message: "Tuyệt vời! Bạn nhận được lì xì 10.000đ 🎊",
    },
    {
      id: 3,
      label: "20.000đ",
      sublabel: "Lì xì đẹp",
      emoji: "💚",
      image: "",
      color: "#6BCB77",
      textColor: "#ffffff",
      weight: 20,
      message: "Xuất sắc! Bạn nhận được lì xì 20.000đ 🥳",
    },
    {
      id: 4,
      label: "50.000đ",
      sublabel: "Lì xì lớn",
      emoji: "💙",
      image: "",
      color: "#4D96FF",
      textColor: "#ffffff",
      weight: 0,            // ← 0 = không bao giờ trúng
      message: "WOW! Bạn trúng lì xì 50.000đ! 🌟",
    },
    {
      id: 5,
      label: "100.000đ",
      sublabel: "Đại cát",
      emoji: "🏆",
      image: "",
      color: "#C77DFF",
      textColor: "#ffffff",
      weight: 0,            // ← 0 = không bao giờ trúng
      message: "JACKPOT! Bạn trúng lì xì 100.000đ! 🎆🎇",
    },
  ],

  // ── Màu sắc giao diện tổng thể ───────────────────────────
  theme: {
    background: "linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%)",
    accentColor: "#FFD700",
    glowColor: "rgba(255, 215, 0, 0.4)",
    fontFamily: "'Baloo 2', cursive",
  },

  // ── Tuỳ chọn hiển thị popup kết quả ─────────────────────
  popup: {
    showConfetti: true,
    autoCloseAfter: 0,      // 0 = không tự đóng (ms), ví dụ 5000 = tự đóng sau 5 giây
    closeButtonText: "Nhận Thưởng 🎁",
  },

};

// ─────────────────────────────────────────────────────────────
//  ĐỂ ĐỔI CHỦ ĐỀ KHÁC (ví dụ: Quay thưởng sản phẩm)
//  Chỉ cần thay nội dung trong segments[] ở trên.
//  Ví dụ:
//  { label: "iPhone 16", emoji: "📱", weight: 1, color: "#silver" }
//  { label: "Tủ lạnh",   emoji: "🧊", weight: 2, color: "#4ECDC4" }
//  { label: "Mất lượt",  emoji: "😅", weight: 30, color: "#aaaaaa" }
// ─────────────────────────────────────────────────────────────