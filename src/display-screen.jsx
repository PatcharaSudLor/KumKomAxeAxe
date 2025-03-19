import { useEffect, useState } from 'react';

const DisplayScreen = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
            const { imageUrl, text } = JSON.parse(event.data);
            setImage(imageUrl);
            setText(text);
        };

        return () => ws.close();
    }, []);

    return (
        <div>
            {image && <img src={image} alt="Uploaded" style={{ width: '100%' }} />}
            <p>{text}</p>
        </div>
    );
};

export default DisplayScreen;
