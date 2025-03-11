import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function QRCodePage() {
    const { state } = useLocation(); // ดึงข้อมูลจากหน้าหลัก (imageSrc, text, amount)
    const { imageSrc, text, amount } = state;
    const navigate = useNavigate();

    // ฟังก์ชันสำหรับการยืนยันการโอนเงิน
    const handleConfirmPayment = () => {
        // ที่นี่สามารถใส่การตรวจสอบหรือส่งข้อมูลไปที่ backend เพื่อยืนยันการชำระเงินได้
        alert('การชำระเงินเสร็จสมบูรณ์!');
        navigate('/third'); // เปลี่ยนไปหน้า third-page หลังจากชำระเงินเสร็จ
    };


    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>ข้อมูลของคุณ</h2>

            {/* แสดงรูปภาพ */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div
                    style={{
                        width: '220px',
                        height: '220px',
                        background: 'white',
                        borderRadius: '5px',
                        border: '1px solid black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt="Uploaded"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '5px',
                            }}
                        />
                    ) : (
                        <span style={{ fontSize: '12px', color: 'gray' }}>ไม่มีรูปภาพ</span>
                    )}
                    {text && (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            }}
                        >
                            {text}
                        </div>
                    )}
                </div>
            </div>

            {/* แสดงจำนวนเงิน */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <p>จำนวนเงินที่ต้องการโอน: {amount} บาท</p>
            </div>

            {/* ปุ่มยืนยันการชำระเงิน */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleConfirmPayment}
                    style={{
                        width: '100px',
                        height: '40px',
                        backgroundColor: '#9AFF8C',
                        borderRadius: '20px',
                        border: 'none',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    ยืนยันการโอน
                </button>
            </div>
        </div>
    );
}

export default QRCodePage; 