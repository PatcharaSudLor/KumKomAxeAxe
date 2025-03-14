import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RefreshCcw } from 'lucide-react'; // นำเข้าไอคอน Refresh

function QRCodePage() {
    const { state } = useLocation(); // ดึงข้อมูลจากหน้าหลัก (imageSrc, text, amount)
    const { imageSrc, text, amount } = state;
    const navigate = useNavigate();
    const [qrKey, setQrKey] = useState(Date.now()); // ใช้สำหรับรีเฟรช QR
    const [paymentConfirmed, setPaymentConfirmed] = useState(false); // เช็คว่าจ่ายเงินแล้วหรือยัง
    const qrCodeUrl = `https://promptpay.io/0958469000/${amount}.png?key=${qrKey}`;

    // ฟังก์ชันสำหรับรีเฟรชคิวอาร์โค้ด
    const handleRefreshQR = () => {
        setQrKey(Date.now()); // อัปเดตค่าใหม่ให้โหลด QR Code ใหม่
    };

    // ฟังก์ชันตรวจสอบสถานะการชำระเงิน
    const checkPaymentStatus = async () => {
        try {
            const response = await fetch(`https://your-api.com/check-payment?amount=${amount}`);
            const data = await response.json();

            if (data.status === 'success' && data.amount === amount) {
                setPaymentConfirmed(true);
                navigate('/third_Page', { state: { amount } });
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการตรวจสอบการชำระเงิน:', error);
        }
    };

    // ใช้ useEffect ให้เรียก checkPaymentStatus ทุก 5 วินาที
    useEffect(() => {
        const interval = setInterval(() => {
            if (!paymentConfirmed) {
                checkPaymentStatus();
            }
        }, 5000); // เช็กทุก 5 วินาที

        return () => clearInterval(interval); // ล้าง interval เมื่อออกจากหน้า
    }, [paymentConfirmed]);

    return (
        <div className="QRCODE">
            <div data-layer="KumKom" className="Kumkom" style={{ color: 'black', fontSize: 16, fontFamily: 'Figma Hand', position: 'absolute', top: 15, left: 22, fontWeight: '700', wordWrap: 'break-word' }}>KumKom</div>
            <div data-layer="AxeAxe" className="Axeaxe" style={{ color: '#1A1A4C', fontSize: 16, fontFamily: 'Figma Hand', position: 'absolute', top: 35, left: 59, fontWeight: '700', wordWrap: 'break-word' }}>AxeAxe</div>
            <img data-layer="2e6ba818-1ede-47fd-b5d7-e44bd63e8edb 1" className="E6ba8181ede47fdB5d7E44bd63e8edb1" style={{ width: 27, height: 27, left: 83, top: 0, position: 'absolute', top: 10, left: 95, borderRadius: 100 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8h3UOd_zOHWf7Va30j-d8vZ-5X99MpvT7UA&s" />
            <div data-layer="TopRectangle" className="TopRectangle" style={{ width: 360, height: 6, position: 'absolute', top: 67, left: 0, background: '#1A1A4C' }} />
            <div data-layer="แค่เธอเปิด(วาร์ป)โลกก็เปลี่ยน" style={{ textAlign: 'center', color: '#FF0707', fontSize: 14, fontFamily: 'Roboto Mono', position: 'absolute', top: 116, left: 95, fontWeight: '400', wordWrap: 'break-word', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>แค่เธอเปิด(วาร์ป)โลกก็เปลี่ยน</div>
            <div data-layer="สแกนคิวอาร์โค้ดที่ปรากฎด้านล่าง :" style={{ color: 'black', fontSize: 11, fontFamily: 'Inter', position: 'absolute', top: 174, left: 22, fontWeight: '300', wordWrap: 'break-word' }}>สแกนคิวอาร์โค้ดที่ปรากฎด้านล่าง :</div>
            <div data-layer="EndRectangle" className="EndRectangle" style={{ position: 'absolute', left: 0, top: 590, width: 366, height: 50, background: '#1A1A4C' }} />

            {/* กรอบแสดง QR Code */}
            <div style={{
                position: 'absolute', top: 203, left: 70,
                width: 220, height: 220, margin: '20px auto', background: 'white', borderRadius: 0,
                border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                <img src={qrCodeUrl} alt="QR Code" style={{ width: '100%', height: '100%' }} />
            </div>

            {/* ปุ่มรีเฟรชคิวอาร์โค้ด พร้อมไอคอน */}
            <button
                onClick={handleRefreshQR}
                style={{
                    position:'absolute',left:75,top:475,
                    background: '#FFC400',
                    color: 'white',
                    border: 'none',
                    padding: '4px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginRight: '10px'
                }}
            >
                <RefreshCcw size={14} /> รีเฟรชคิวอาร์โค้ด
            </button>

            {/* ปุ่มย้อนกลับ */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    position: 'absolute', left: 22, top: 475,
                    background: '#FF7E67',
                    color: 'white',
                    border: 'none',
                    padding: '4px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontSize: '11px'
                }}
            >
                ย้อนกลับ
            </button>
        </div>
    );
}

export default QRCodePage;
