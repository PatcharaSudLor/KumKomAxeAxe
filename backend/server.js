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
    tel: { type: Number, required:true},
});

const Upload = mongoose.model('Upload', uploadSchema);

// ✅ WebSocket Connection
wss.on('connection', (ws) => {
    console.log('🔌 New client connected');

    ws.on('close', () => console.log('🔌 Client disconnected'));
});

// ✅ Endpoint สำหรับอัปโหลดรูปและข้อความ
app.post('/upload', async (req, res) => {
    const { imageUrl, text ,tel} = req.body;

    if (!imageUrl || !text || !tel) {
        return res.status(400).json({ error: 'Missing imageUrl or text or tel' });
    }

    try {
        const newUpload = new Upload({ imageUrl, text ,tel });
        await newUpload.save();

        // ✅ แจ้ง WebSocket
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ imageUrl, text ,tel }));
            }
        });

        res.json({ message: '✅ Image uploaded successfully', imageUrl, text ,tel });
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

// ✅ DELETE Endpoint สำหรับลบอัปโหลด
app.delete('/upload/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUpload = await Upload.findByIdAndDelete(id);
        
        if (!deletedUpload) {
            return res.status(404).json({ error: 'Upload not found' });
        }

        // แจ้ง WebSocket ทุก client ว่าได้ลบข้อมูลแล้ว
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ message: 'Image deleted', id }));
            }
        });

        res.json({ message: '✅ Image deleted successfully', id });
    } catch (err) {
        console.error('❌ Delete error:', err);
        res.status(500).json({ error: 'Failed to delete image' });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
