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
  res.json({ message: `Received prompt: ${prompt}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
