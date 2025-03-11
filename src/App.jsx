import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [imageSrc, setImageSrc] = useState(null);
  const [text, setText] = useState(''); // สถานะเก็บข้อความที่ผู้ใช้พิมพ์
  const [amount, setAmount] = useState(''); // สถานะเก็บจำนวนเงินที่ผู้ใช้พิมพ์
  const [isAmountValid, setIsAmountValid] = useState(true); // สถานะสำหรับตรวจสอบว่าจำนวนเงินถูกต้องหรือไม่
  const navigate = useNavigate(); //ฟังก์ชันใช้สำหรับเปลี่ยนหน้า

  // ฟังก์ชันสำหรับจัดการการอัปโหลดรูปภาพ
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ฟังก์ชันสำหรับจัดการการพิมพ์ข้อความ
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // ฟังก์ชันสำหรับจัดการการใส่จำนวนเงิน
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (parseFloat(value) >= 40) {
      setIsAmountValid(true);
    } else {
      setIsAmountValid(false);
    }
  };

  const handleConfirm = () => {
    if (parseInt(amount) >= 40) {
      navigate('/qrCodePage', { state: { imageSrc, text, amount } }); // ส่งข้อมูลไปหน้าถัดไป
      navigate('/third', { state: { imageSrc, text, amount } }); // ส่งข้อมูลไปหน้าถัดไป
    } else {
      alert('กรุณาโอนเงินขั้นต่ำ 40 บาท');
    }
  };

  return (
    <div className="App">
      <div data-layer="KumKom" className="Kumkom" style={{ color: 'black', fontSize: 16, fontFamily: 'Figma Hand', position: 'absolute', top: 15, left: 22, fontWeight: '700', wordWrap: 'break-word' }}>KumKom</div>
      <div data-layer="AxeAxe" className="Axeaxe" style={{ color: '#1A1A4C', fontSize: 16, fontFamily: 'Figma Hand', position: 'absolute', top: 35, left: 59, fontWeight: '700', wordWrap: 'break-word' }}>AxeAxe</div>
      <img data-layer="2e6ba818-1ede-47fd-b5d7-e44bd63e8edb 1" className="E6ba8181ede47fdB5d7E44bd63e8edb1" style={{ width: 27, height: 27, left: 83, top: 0, position: 'absolute', top: 10, left: 95, borderRadius: 100 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8h3UOd_zOHWf7Va30j-d8vZ-5X99MpvT7UA&s" />
      <div data-layer="Rectangle 13" className="Rectangle13" style={{ width: 360, height: 6, position: 'absolute', top: 67, left: 0, background: '#1A1A4C' }} />
      <div data-layer="อัปโหลดรูปภาพที่คุณต้องการแสดงบนจอได้ที่นี่ :" style={{ color: 'black', fontSize: 10, fontFamily: 'Inter', position: 'absolute', top: 174, left: 22, fontWeight: '300', wordWrap: 'break-word' }}>อัปโหลดรูปภาพที่คุณต้องการแสดงบนจอได้ที่นี่ :</div>
      <div data-layer="แค่เธอเปิด(วาร์ป)โลกก็เปลี่ยน" style={{ textAlign: 'center', color: '#FF0707', fontSize: 14, fontFamily: 'Roboto Mono', position: 'absolute', top: 116, left: 95, fontWeight: '400', wordWrap: 'break-word', textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>แค่เธอเปิด(วาร์ป)โลกก็เปลี่ยน</div>
      <div data-layer="Group 6" className="Group6" style={{ width: 69, height: 19, position: 'absolute', left: 145, top: 374 }}>
        <div data-layer="Rectangle 9" className="Rectangle9" style={{ width: 69, height: 14, left: 'center', top: 65, position: 'absolute', background: 'white', borderRadius: 124, border: '0.50px black solid' }} />
        {/* ปุ่มอัปโหลดรูปภาพ */}
        <div
          data-layer="อัปโหลดรูปภาพ"
          style={{
            left: 'center',
            top: 68,
            position: 'Relative',
            color: 'black',
            fontSize: 8,
            fontFamily: 'Inter',
            fontWeight: '400',
            wordWrap: 'break-word',
            cursor: 'pointer',
          }}
        >
          <label htmlFor="upload" style={{ cursor: 'pointer' }}>อัปโหลดรูปภาพ</label>
          <input
            id="upload"
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>
      </div>
      <div data-layer="ใส่ข้อความของคุณ :" style={{ color: 'black', fontSize: 10, fontFamily: 'Inter', position: 'absolute', left: 22, top: 460, fontWeight: '400', wordWrap: 'break-word' }}>ใส่ข้อความของคุณ :</div>
      <div data-layer="Rectangle 10" className="Rectangle10" style={{ display: 'inline-block', position: 'absolute', left: 22, top: 478 }}>
        <svg width="316" height="18" viewBox="0 0 316 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.4 0.4H315.6V17.6H0.4V0.4Z" fill="#FDFDFD" stroke="black" stroke-width="1"  />
        </svg>
        <input
          type="text"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '0',
            color: 'black',
            fontSize: '11px',
            fontFamily: 'Inter',

          

          }}
          value={text}
          onChange={handleTextChange} // ใช้ฟังก์ชันนี้เพื่ออัปเดตข้อความ
          placeholder="  พิมพ์ข้อความที่นี่  "
        />
      </div>

      {/* พื้นที่สำหรับแสดงรูปภาพ */}
      <div
        data-layer="Rectangle10"
        className="Rectangle10"
        style={{
          width: 220,
          height: 220,
          left: 70,
          top: 203,
          position: 'absolute',
          background: 'white',
          borderRadius: '0px',
          border: '1px black solid',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative', // กำหนดตำแหน่ง relative เพื่อให้สามารถจัดตำแหน่งข้อความบนภาพได้
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Uploaded"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0px' }}
          />
        ) : (
          <span style={{ fontSize: 6, color: 'gray' }}>ไม่มีรูปภาพ</span>
        )}

        {/* ข้อความที่พิมพ์จะปรากฏทับบนรูป */}
        {text && (
          <div
            style={{
              position: 'absolute',
              bottom: 10, // วางข้อความที่ด้านล่างของภาพ
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontSize: 14,
              fontWeight: 'bold',
              textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
          >
            {text}

          </div>

        )}
      </div>

      {/* ส่วนสำหรับระบุจำนวนเงินที่ต้องการโอน */}
      <div data-layer="ระบุจำนวนเงินที่ต้องการโอน :" style={{ position: 'absolute', left: 22, top: 510, color: 'black', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>ระบุจำนวนเงินที่ต้องการโอน :</div>

      <div style={{ position: 'absolute', top: 530, left: 22, width: '316px', height: '18px' }}>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="40"
          placeholder="  จำนวนเงิน (อย่างน้อย 40 บาท)  "
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: '0.5px solid black',
            fontSize: '12px',
            color: 'black',
            padding: '2px',
          }}
        />
        {!isAmountValid && (
          <span style={{ color: 'red', fontSize: '10px' }}>กรุณาโอนเงินขั้นต่ำ 40 บาท</span>
        )}
      </div>
        
        {/*ปุ่มตกลง*/}
        <div style={{ position: 'absolute', left: 22, top: 590 }}>
        <button
          onClick={handleConfirm}
          style={{
            width: 50,
            height: 22,
            backgroundColor: '#9AFF8C',
            borderRadius: 33,
            border: 'none',
            fontSize: 10,
            cursor: 'pointer',
          }}
        >
          ตกลง
        </button>
      </div>
      

    </div>
  );
}

export default App;