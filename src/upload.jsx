const handleUpload = async () => {
    const data = new FormData();
    data.append('image', selectedFile);
    
    // อัปโหลดรูปไปยังเซิร์ฟเวอร์ (เช่น ใช้ Cloudinary หรือ Firebase)
    const response = await uploadToServer(data);
    const imageUrl = response.url;

    // ส่งข้อมูลไปยัง Backend
    await fetch('http://localhost:8080/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, text: userText }),
    });

    // นำทางไปยังหน้าถัดไป
    navigate('/display');
};
