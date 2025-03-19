// หน้า ShowOutputPage
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function TelAndPoint() {
    const { state } = useLocation();
    const { phone_num, imageSrc, text } = state;




    return (
        <div className="TelAndPoint">
            <div data-layer="KumKom" className="Kumkom" style={{ color: 'black', fontSize: 16, fontFamily: 'Figma Hand', position: 'absolute', top: 15, left: 22, fontWeight: '700', wordWrap: 'break-word' }}>KumKom</div>
            <div data-layer="AxeAxe" className="Axeaxe" style={{ color: '#1A1A4C', fontSize: 16, fontFamily: 'Figma Hand', position: 'absolute', top: 35, left: 59, fontWeight: '700', wordWrap: 'break-word' }}>AxeAxe</div>
            <img data-layer="2e6ba818-1ede-47fd-b5d7-e44bd63e8edb 1" className="E6ba8181ede47fdB5d7E44bd63e8edb1" style={{ width: 27, height: 27, left: 83, top: 0, position: 'absolute', top: 10, left: 95, borderRadius: 100 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8h3UOd_zOHWf7Va30j-d8vZ-5X99MpvT7UA&s" />
            <div data-layer="Rectangle 13" className="Rectangle13" style={{ width: 360, height: 6, position: 'absolute', top: 67, left: 0, background: '#1A1A4C' }} />
            <div data-layer="อัปโหลดรูปภาพที่คุณต้องการแสดงบนจอได้ที่นี่ :" style={{ color: 'black', fontSize: 11, fontFamily: 'Inter', position: 'absolute', top: 174, left: 22, fontWeight: '300', wordWrap: 'break-word' }}>อัปโหลดรูปภาพที่คุณต้องการแสดงบนจอได้ที่นี่ :</div>
            <div data-layer="แค่เธอเปิด(วาร์ป)โลกก็เปลี่ยน" style={{ textAlign: 'center', color: '#FF0707', fontSize: 14, fontFamily: 'Roboto Mono', position: 'absolute', top: 116, left: 95, fontWeight: '400', wordWrap: 'break-word', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>แค่เธอเปิด(วาร์ป)โลกก็เปลี่ยน</div>

        </div>
    );
}

export default TelAndPoint;
