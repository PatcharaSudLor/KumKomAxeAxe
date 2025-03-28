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

// ✅ เชื่อมต่อ MongoDB
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

// ✅ Schema สำหรับรูปอัปโหลด
const uploadSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    tel: { type: String, required: true },
});
const Upload = mongoose.model('Upload', uploadSchema);

// ✅ Schema สำหรับคะแนนสะสม
const userScoreSchema = new mongoose.Schema({
    phone_num: { type: String, required: true, unique: true },
    score: { type: Number, default: 0 }
});
const UserScore = mongoose.model('UserScore', userScoreSchema);

// ✅ WebSocket Connection
wss.on('connection', (ws) => {
    console.log('🔌 New client connected');
    ws.on('close', () => console.log('🔌 Client disconnected'));
});

// ✅ Endpoint สำหรับดึงคะแนนสะสม
app.get('/points', async (req, res) => {
    const { phone_num } = req.query;
    if (!phone_num) return res.status(400).json({ error: 'Missing phone_num' });

    try {
        let user = await UserScore.findOne({ phone_num });
        if (!user) {
            user = new UserScore({ phone_num, score: 0 });
            await user.save();
        }
        res.json({ phone_num, score: user.score });
    } catch (err) {
        console.error('❌ Fetch score error:', err);
        res.status(500).json({ error: 'Failed to fetch score' });
    }
});

// ✅ Endpoint สำหรับอัปเดตคะแนน
app.post('/update-points', async (req, res) => {
    const { phone_num, score } = req.body;
    if (!phone_num || score === undefined) return res.status(400).json({ error: 'Missing phone_num or score' });

    try {
        let user = await UserScore.findOneAndUpdate(
            { phone_num },
            { score },
            { new: true, upsert: true }
        );
        res.json({ message: '✅ Score updated successfully', phone_num, score: user.score });
    } catch (err) {
        console.error('❌ Update score error:', err);
        res.status(500).json({ error: 'Failed to update score' });
    }
});

// ✅ Endpoint สำหรับอัปโหลดรูปและเพิ่มแต้มอัตโนมัติ
app.post('/upload', async (req, res) => {
    const { imageUrl, text, tel } = req.body;
    if (!imageUrl || !text || !tel) return res.status(400).json({ error: 'Missing imageUrl, text, or tel' });

    try {
        const newUpload = new Upload({ imageUrl, text, tel });
        await newUpload.save();

        let user = await UserScore.findOneAndUpdate(
            { phone_num: tel },
            { $inc: { score: 25 } },
            { new: true, upsert: true }
        );

        // ✅ แจ้ง WebSocket
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ imageUrl, text, tel, score: user.score }));
            }
        });

        res.json({ message: '✅ Image uploaded successfully', imageUrl, text, tel, score: user.score });
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
        if (!deletedUpload) return res.status(404).json({ error: 'Upload not found' });

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
