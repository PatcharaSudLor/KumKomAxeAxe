// หน้า ShowOutputPage
import React from 'react';
import { useLocation } from 'react-router-dom';


function TelAndPoint() {
    const { state } = useLocation();
    const { score, phone_num } = state;

    return (
        <div className="TelAndPoint">
            <div data-layer="KumKom" className="Kumkom" style={{ color: 'black', fontSize: 16, fontFamily: 'Figma Hand', position: 'absolute', top: 15, left: 22, fontWeight: '700', wordWrap: 'break-word' }}>KumKom</div>
            <div data-layer="AxeAxe" className="Axeaxe" style={{ color: '#1A1A4C', fontSize: 16, fontFamily: 'Figma Hand', position: 'absolute', top: 35, left: 59, fontWeight: '700', wordWrap: 'break-word' }}>AxeAxe</div>
            <img data-layer="2e6ba818-1ede-47fd-b5d7-e44bd63e8edb 1" className="E6ba8181ede47fdB5d7E44bd63e8edb1" style={{ width: 27, height: 27, left: 83, top: 0, position: 'absolute', top: 10, left: 95, borderRadius: 100 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8h3UOd_zOHWf7Va30j-d8vZ-5X99MpvT7UA&s" />
            <div data-layer="Rectangle 13" className="Rectangle13" style={{ width: 360, height: 6, position: 'absolute', top: 67, left: 0, background: '#1A1A4C' }} />
            <div data-layer="แค่เธอเปิด(วาร์ป)โลกก็เปลี่ยน" style={{ textAlign: 'center', color: '#FF0707', fontSize: 14, fontFamily: 'Roboto Mono', position: 'absolute', top: 116, left: 95, fontWeight: '400', wordWrap: 'break-word', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>แค่เธอเปิด(วาร์ป)โลกก็เปลี่ยน</div>
            <div data-layer="โปรโมชั่น :" style={{ position: 'absolute', left: 22, top: 169, color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>โปรโมชั่น :</div>
            <div data-layer="สะสมแต้มให้ครบ 75 pt แลกรับคูปองลดราคาเครื่องดื่ม สะสมแต้มให้ครบ 100 pt แลกรับคูปองเครื่องดื่มฟรี สามารถรับแต้มได้จากการอัปโหลดรูป 25 pt/ครั้ง" className="75Pt100Pt25Pt" style={{ position: 'absolute', left: 22, top: 186, color: 'black', fontSize: 11, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>สะสมแต้มให้ครบ 75 pt แลกรับคูปองลดราคาเครื่องดื่ม 50%<br />สะสมแต้มให้ครบ 100 pt แลกรับคูปองเครื่องดื่มฟรี<br />สามารถรับแต้มได้จากการอัปโหลดรูป 25 pt/ครั้ง</div>
            <img data-layer="ดาวน์โหลด 1" className="1" style={{ position: 'absolute', left: 0, top: 240, width: 360, height: 99 }} src="https://t3.ftcdn.net/jpg/05/79/34/92/360_F_579349293_XUTidUs5U3tZShFUNz5W5w7CKInHIJtg.jpg" />
            <div data-layer="เบอร์มือถือของคุณ:" style={{ position: 'absolute', left: 22, top: 360, color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>เบอร์มือถือของคุณ:</div>
            <div data-layer="phone_num :" style={{ background: '#B3F4F9', borderRadius: '33px', padding: '5px 10px', position: 'absolute', left: 22, top: 380, color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{phone_num}</div>
            <div data-layer="แต้มสะสมของคุณตอนนี้:" style={{ position: 'absolute', left: 22, top: 412, color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>แต้มสะสมของคุณตอนนี้:</div>
            <div data-layer="score" style={{ background: '#B3F4F9', borderRadius: '33px', padding: '5px 10px', position: 'absolute', left: 22, top: 430, color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>{score}</div>
        </div>
    );
}

export default TelAndPoint;
