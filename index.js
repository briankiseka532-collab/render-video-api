import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

app.post('/api/generate-video', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Return a public, short sample video (from the internet)
  // This video is just for testing – it will always be the same.
  const sampleVideoUrl = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';
  
  // Fetch the video and convert to base64 so your frontend can download it
  const videoResponse = await fetch(sampleVideoUrl);
  const buffer = Buffer.from(await videoResponse.arrayBuffer());
  const base64 = buffer.toString('base64');
  
  res.json({ videoUrl: `data:video/mp4;base64,${base64}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
