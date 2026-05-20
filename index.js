import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

// Add the POST endpoint that your frontend calls
app.post('/api/generate-video', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // For now, return a dummy video (a tiny black video in base64)
  // This tests the connection. Later replace with real AI.
  const dummyVideoBase64 = 'AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEA...'; // truncated, but will work as placeholder
  return res.json({ videoUrl: `data:video/mp4;base64,${dummyVideoBase64}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
