import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

app.post('/api/generate-video', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Public sample video (small, works)
  const sampleVideoUrl = 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';
  
  try {
    const videoResponse = await fetch(sampleVideoUrl);
    const buffer = Buffer.from(await videoResponse.arrayBuffer());
    const base64 = buffer.toString('base64');
    const videoUrl = `data:video/mp4;base64,${base64}`;
    res.json({ videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch sample video' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
