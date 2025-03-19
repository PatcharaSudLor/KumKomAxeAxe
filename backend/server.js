require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const WebSocket = require('ws');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// ✅ ปรับปรุงการเชื่อมต่อ MongoDB
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('❌ ERROR: MONGO_URI is not defined in .env');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// ✅ สร้าง Schema และ Model
const uploadSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Upload = mongoose.model('Upload', uploadSchema);

// ✅ WebSocket Connection
wss.on('connection', (ws) => {
    console.log('🔌 New client connected');

    ws.on('close', () => console.log('🔌 Client disconnected'));
});

// ✅ Endpoint สำหรับอัปโหลดรูปและข้อความ
app.post('/upload', async (req, res) => {
    const { imageUrl, text } = req.body;

    if (!imageUrl || !text) {
        return res.status(400).json({ error: 'Missing imageUrl or text' });
    }

    try {
        const newUpload = new Upload({ imageUrl, text });
        await newUpload.save();

        // ✅ แจ้ง WebSocket
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ imageUrl, text }));
            }
        });

        res.json({ message: '✅ Image uploaded successfully', imageUrl, text });
    } catch (err) {
        console.error('❌ Upload error:', err);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

// ✅ Endpoint สำหรับดึงข้อมูลอัปโหลดล่าสุด
app.get('/uploads', async (req, res) => {
    try {
        const uploads = await Upload.find().sort({ createdAt: -1 }).limit(10);
        res.json(uploads);
    } catch (err) {
        console.error('❌ Fetch error:', err);
        res.status(500).json({ error: 'Failed to fetch uploads' });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
