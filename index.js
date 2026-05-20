import express from 'express';
import { generateVideo } from 'ai'; // ✅ Must be included
import { createOpenAI as createProvider } from '@ai-sdk/openai';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Video API is running!');
});

app.post('/api/generate-video', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // ✅ Using the Vercel AI Gateway
  const provider = createProvider({
    apiKey: "dummy-key-required-for-sdk",
    baseURL: 'https://gateway.ai.vercel.com/v1/ai/bytedance',
    headers: {
      'x-vercel-ai-gateway-model': 'bytedance/seedance-2.0'
    }
  });
  const model = provider('bytedance/seedance-2.0');

  try {
    const result = await generateVideo({
      model: model,
      prompt: prompt,
    });
    const videoBase64 = result.video; // This contains the video data
    const videoUrl = `data:video/mp4;base64,${videoBase64}`;
    res.status(200).json({ videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
