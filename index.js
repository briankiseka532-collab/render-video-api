import express from 'express';
import { InferenceClient } from '@huggingface/inference';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const client = new InferenceClient(process.env.HF_TOKEN);

// --- ADD THIS ROOT ROUTE ---
// This is a simple health check for Render to confirm the server is running.
app.get('/', (req, res) => {
  res.send('Video API is running!');
});
// --------------------------

app.post('/api/generate-video', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const blob = await client.textToVideo({
      model: 'damo-vilab/text-to-video-ms-1.7b',
      inputs: prompt,
    });
    const buffer = Buffer.from(await blob.arrayBuffer());
    const base64 = buffer.toString('base64');
    const videoUrl = `data:video/mp4;base64,${base64}`;
    res.status(200).json({ videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
