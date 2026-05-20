import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Root route (health check)
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

// Test POST route
app.post('/api/generate-video', (req, res) => {
  const { prompt } = req.body;
  res.json({ 
    message: 'Received your prompt', 
    prompt: prompt,
    videoUrl: 'https://example.com/dummy-video.mp4' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
