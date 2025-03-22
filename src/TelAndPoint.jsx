import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TelAndPointForm() {
    const [phoneNum, setPhoneNum] = useState('');
    const [points, setPoints] = useState({}); // เก็บคะแนนของแต่ละเบอร์
    const [error, setError] = useState(null);
    const [history, setHistory] = useState({}); // เก็บประวัติการกรอกเบอร์
    const [warning, setWarning] = useState(null); // เก็บข้อความเตือนสำหรับการแลกแต้ม
    const [selectedPoints, setSelectedPoints] = useState(null); // เลือกแต้มที่ต้องการแลก
    const navigate = useNavigate();

    // ฟังก์ชันตรวจสอบแต้ม
    const handleCheckPoints = () => {
        const phoneRegex = /^[0]{1}[6-9]{1}[0-9]{8}$/; 
        if (!phoneRegex.test(phoneNum)) {
            setError("กรุณากรอกเบอร์มือถือให้ถูกต้อง");
            return;
        }

        // ถ้าเบอร์เคยกรอกแล้ว ให้เพิ่ม 25 คะแนน
        if (history[phoneNum]) {
            setPoints(prevPoints => ({
                ...prevPoints,
                [phoneNum]: (prevPoints[phoneNum] || 0) + 25
            }));

            setHistory(prevHistory => ({
                ...prevHistory,
                [phoneNum]: [...prevHistory[phoneNum], 'Transaction']
            }));
        } else {
            // ถ้าเบอร์ยังไม่เคยกรอก ให้เก็บเป็นเบอร์ใหม่
            setPoints(prevPoints => ({
                ...prevPoints,
                [phoneNum]: (prevPoints[phoneNum] || 0) + 25
            }));

            setHistory(prevHistory => ({
                ...prevHistory,
                [phoneNum]: ['Transaction']
            }));
        }

        setError(null);
    };

    // ฟังก์ชันแลกแต้ม
    const handleRedeemPoints = () => {
        const userPoints = points[phoneNum] || 0;

        // ตรวจสอบว่าเลือกแต้มที่ต้องการแลกแล้วหรือยัง
        if (selectedPoints === null) {
            setWarning("กรุณาเลือกแต้มที่ต้องการแลก");
            return;
        }

        // ตรวจสอบว่าแต้มสะสมครบตามเงื่อนไขหรือไม่
        if (userPoints >= selectedPoints) {
            setWarning(null); // Clear the warning if points are enough
            // หักแต้ม
            setPoints(prevPoints => ({
                ...prevPoints,
                [phoneNum]: prevPoints[phoneNum] - selectedPoints
            }));
            alert(`แลกแต้มสำเร็จ! หัก ${selectedPoints} pt`);
        } else {
            setWarning(`แต้มสะสมไม่ครบตามเงื่อนไขนะครับ! ต้องมีอย่างน้อย ${selectedPoints} pt เพื่อแลกคูปอง`);
        }
    };

    // ฟังก์ชันกลับหน้าหลัก
    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="TelAndPointForm" style={{ padding: '20px', fontFamily: 'Inter', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: '80px' }}>
                <img 
                    data-layer="2e6ba818-1ede-47fd-b5d7-e44bd63e8edb1" 
                    className="E6ba8181ede47fdB5d7E44bd63e8edb1" 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8h3UOd_zOHWf7Va30j-d8vZ-5X99MpvT7UA&s" 
                    alt="Logo" 
                    style={{ 
                        width: '27px', 
                        height: '27px', 
                        position: 'absolute', 
                        top: '10px', 
                        left: '95px', 
                        borderRadius: '100%' 
                    }} 
                />

                <div 
                    data-layer="KumKom" 
                    className="Kumkom" 
                    style={{ 
                        color: 'black', 
                        fontSize: '16px', 
                        fontFamily: 'Figma Hand', 
                        position: 'absolute', 
                        top: '15px', 
                        left: '22px', 
                        fontWeight: '700', 
                        wordWrap: 'break-word' 
                    }}
                >
                    KumKom
                </div>

                <div 
                    data-layer="AxeAxe" 
                    className="Axeaxe" 
                    style={{ 
                        color: '#1A1A4C', 
                        fontSize: '16px', 
                        fontFamily: 'Figma Hand', 
                        position: 'absolute', 
                        top: '35px', 
                        left: '59px', 
                        fontWeight: '700', 
                        wordWrap: 'break-word' 
                    }}
                >
                    AxeAxe
                </div>

                <div 
                    data-layer="Rectangle 13" 
                    className="Rectangle13" 
                    style={{ 
                        width: '100%', 
                        height: '6px', 
                        position: 'absolute', 
                        top: '67px', 
                        left: '0', 
                        background: '#1A1A4C' 
                    }} 
                />
            </div>

            <div 
                data-layer="แค่เธอเปิด(วาร์ป)โลกก็เปลี่ยน" 
                style={{ 
                    textAlign: 'center', 
                    color: '#FF0707', 
                    fontSize: '14px', 
                    fontFamily: 'Roboto Mono', 
                    position: 'absolute', 
                    top: '120px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    fontWeight: '400', 
                    wordWrap: 'break-word', 
                    textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' 
                }}
            >
                แค่เธอเปิด (วาร์ป) โลกก็เปลี่ยน
            </div>

            <div style={{ textAlign: 'left', marginLeft: '20px', marginTop: '40px' }}>
                <p><b>🎁 โปรโมชั่น :</b></p>
                <ul>
                    <li>สะสมแต้มครบ <b>75 pt</b> แลกรับคูปองลดราคาเครื่องดื่ม 50%</li>
                    <li>สะสมแต้มครบ <b>100 pt</b> แลกรับคูปองเครื่องดื่มฟรี</li>
                    <li>รับแต้ม <b>25 pt/ครั้ง</b> จากการอัปโหลดรูป</li>
                </ul>
            </div>

            <img 
                src="https://t3.ftcdn.net/jpg/05/79/34/92/360_F_579349293_XUTidUs5U3tZShFUNz5W5w7CKInHIJtg.jpg" 
                alt="drinks" 
                style={{ width: '100%', marginTop: '20px', borderRadius: '10px' }} 
            />

            <div style={{ textAlign: 'left', marginLeft: '20px', marginTop: '20px' }}>
                <label><b>📞 เบอร์มือถือของคุณ:</b></label>
                <input 
                    type="tel" 
                    value={phoneNum} 
                    placeholder="กรอกเบอร์มือถือของคุณ"
                    onChange={(e) => setPhoneNum(e.target.value)} 
                    style={{ width: '90%', padding: '8px', margin: '10px 0', borderRadius: '5px' }}
                />

                <button 
                    onClick={handleCheckPoints} 
                    style={{ 
                        background: '#FFA500', 
                        padding: '10px', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer', 
                        width: '90%', 
                        marginTop: '10px' 
                    }}
                >
                    🔍 ตรวจสอบแต้ม
                </button>

                {error && (
                    <p style={{ color: 'red', marginTop: '10px' }}>❌ {error}</p>
                )}

                <div style={{ marginTop: '20px' }}>
                    <label><b>🎯 แต้มสะสมของคุณตอนนี้:</b></label>
                    <input 
                        type="text" 
                        value={points[phoneNum] || 0} 
                        readOnly 
                        style={{ 
                            width: '90%', 
                            padding: '8px', 
                            margin: '10px 0', 
                            backgroundColor: '#f0f0f0', 
                            borderRadius: '5px' 
                        }} 
                    />
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
                <label><b>🎯 เลือกจำนวนแต้มที่ต้องการแลก:</b></label>
                <select 
                    value={selectedPoints} 
                    onChange={(e) => setSelectedPoints(Number(e.target.value))} 
                    style={{ width: '90%', padding: '8px', margin: '10px 0', borderRadius: '5px' }}
                >
                    <option value={null}>เลือกแต้มที่ต้องการแลก</option>
                    <option value={75}>75 pt (คูปองลด 50%)</option>
                    <option value={100}>100 pt (เครื่องดื่มฟรี)</option>
                </select>
            </div>

            {warning && (
                <p style={{ color: 'red', marginTop: '10px' }}>⚠️ {warning}</p>
            )}

            <div style={{ marginTop: '20px' }}>
                <button 
                    onClick={handleRedeemPoints}
                    style={{ 
                        background: '#FF70A6', 
                        padding: '10px 20px', 
                        border: 'none', 
                        borderRadius: '5px', 
                        margin: '5px', 
                        cursor: 'pointer' 
                    }}
                >
                    🎟 แลกแต้ม
                </button>
                
                <button 
                    onClick={handleGoHome} 
                    style={{ 
                        background: '#74E291', 
                        padding: '10px 20px', 
                        border: 'none', 
                        borderRadius: '5px', 
                        margin: '5px', 
                        cursor: 'pointer' 
                    }}
                >
                    🏠 หน้าหลัก
                </button>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'left', paddingLeft: '20px' }}>
                <h4>📜 รายการแต้มสะสม:</h4>
                <ul>
                    {Object.keys(points).map(phone => (
                        <li key={phone}>
                            {phone} - {points[phone]} pt
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TelAndPointForm;
