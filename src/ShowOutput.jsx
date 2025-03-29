import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ShowOutput() {

    const { state } = useLocation();
    const { imageSrc, text, phone_num } = state;
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_APP_API_URL; // ดึงค่า API URL จาก .env

    useEffect(() => {
        if (!phone_num) {
            console.error("❌ phone_num is missing");
            return;
        }

        const fetchScore = async () => {
            try {
                const response = await fetch(`${API_URL}/points?phone_num=${phone_num}`);
                if (!response.ok) throw new Error("Failed to fetch points");

                const data = await response.json();
                setScore(data.score || 0);  // Set score to the fetched value

            } catch (error) {
                console.error("Error fetching score:", error);
            }
        };

        fetchScore();
    }, [phone_num, API_URL]);


    const handleNextPage = async () => {
        if (!phone_num) {
            console.error("❌ phone_num is missing");
            return;
        }

        try {
            // เพิ่มคะแนน 25 ก่อน
            /*const newScore = score + 25;

            const response = await fetch(`${API_URL}/update-points`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_num, score: newScore })
            });

            if (!response.ok) throw new Error("Failed to update points");

            // อัปเดตคะแนนใน state
            setScore(newScore);*/

            // ส่งข้อมูลไปยังหน้าถัดไป
            navigate('/third', { state: { imageSrc, text, phone_num, score} });

        } catch (error) {
            console.error("Error updating score or navigating:", error);
        }
    };



    return (
        <div className="ShowOutput">
            <div data-layer="KumKom" className="Kumkom" style={{ color: 'black', fontSize: 16, fontFamily: 'Figma Hand', position: 'absolute', top: 15, left: 22, fontWeight: '700', wordWrap: 'break-word' }}>KumKom</div>
            <div data-layer="AxeAxe" className="Axeaxe" style={{ color: '#1A1A4C', fontSize: 16, fontFamily: 'Figma Hand', position: 'absolute', top: 35, left: 59, fontWeight: '700', wordWrap: 'break-word' }}>AxeAxe</div>
            <img data-layer="2e6ba818-1ede-47fd-b5d7-e44bd63e8edb 1" className="E6ba8181ede47fdB5d7E44bd63e8edb1" style={{ width: 27, height: 27, left: 83, top: 0, position: 'absolute', top: 10, left: 95, borderRadius: 100 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8h3UOd_zOHWf7Va30j-d8vZ-5X99MpvT7UA&s" />
            <div data-layer="TopRectangle" className="TopRectangle" style={{ width: 383, height: 6, position: 'absolute', top: 67, left: 0, background: '#1A1A4C' }} />
            <div data-layer="แค่เธอเปิด(วาร์ป)โลกก็เปลี่ยน" style={{ textAlign: 'center', color: '#FF0707', fontSize: 14, fontFamily: 'Roboto Mono', position: 'absolute', top: 116, left: 95, fontWeight: '400', wordWrap: 'break-word', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>แค่เธอเปิด(วาร์ป)โลกก็เปลี่ยน</div>
            <div data-layer="ผลลัพธ์ของคุณ :" style={{ color: 'black', fontSize: 12, fontFamily: 'Inter', position: 'absolute', top: 174, left: 22, fontWeight: '300', wordWrap: 'break-word' }}>ผลลัพธ์ของคุณ :</div>


            {/* กรอบสี่เหลี่ยมสำหรับแสดงรูปภาพและข้อความ */}
            <div style={{
                position: 'absolute',
                top: 203,
                left: 53,
                width: 255,
                height: 255,
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
                position: 'relative' // เพื่อให้ข้อความอยู่ทับในรูป
            }}>
                {/* รูปภาพ */}
                <img
                    src={imageSrc}
                    alt="Uploaded"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // ทำให้รูปภาพไม่ยืด
                    }}
                />

                {/* ข้อความที่ทับบนรูป */}
                <div style={{
                    position: 'absolute',
                    bottom: '10px',  // วางข้อความไว้ที่ด้านล่าง
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontFamily: 'Roboto Mono',
                    fontWeight: 'bold',
                    textShadow: '0px 4px 4px rgba(255, 255, 255, 0.25)',
                    textAlign: 'center',
                    width: '90%', // เพิ่มความกว้างเพื่อให้ข้อความไม่เกินกรอบ
                    wordWrap: 'break-word',
                }}>
                    {text}
                </div>
            </div>

            {/* ปุ่มไปหน้าถัดไป */}
            <button
                onClick={handleNextPage}
                style={{
                    position: 'absolute', left: 155, top: 470,
                    background: '#9AFF8C',
                    color: 'white',
                    border: 'none',
                    padding: '4px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontSize: '11px'
                }}
            >
                หน้าถัดไป
            </button>
        </div>
    );
}

export default ShowOutput;
