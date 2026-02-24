const WHEEL_CONFIG = {
    // Tùy chỉnh chung
    spinDuration: 4000, // Thời gian quay (4 giây)
    colors: ["#f1c40f", "#e67e22", "#e74c3c", "#9b59b6", "#3498db"], // Màu sắc các ô

    // Danh sách phần thưởng
    // label: Chữ hiển thị trên vòng quay
    // name: Tên đầy đủ hiển thị khi trúng
    // weight: Tỉ lệ trúng (0 = không bao giờ trúng)
    // image: Link ảnh hiển thị khi trúng (có thể dùng link ảnh trên mạng hoặc ảnh trong máy)
    items: [
        { label: "5K", name: "Lì xì 5.000đ", weight: 33, image: "https://via.placeholder.com/150/f1c40f/fff?text=5K" },
        { label: "10K", name: "Lì xì 10.000đ", weight: 33, image: "https://via.placeholder.com/150/e67e22/fff?text=10K" },
        { label: "20K", name: "Lì xì 20.000đ", weight: 34, image: "https://via.placeholder.com/150/e74c3c/fff?text=20K" },
        { label: "50K", name: "Lì xì 50.000đ", weight: 0, image: "https://via.placeholder.com/150/9b59b6/fff?text=50K" },
        { label: "100K", name: "Lì xì 100.000đ", weight: 0, image: "https://via.placeholder.com/150/3498db/fff?text=100K" }
    ]
};