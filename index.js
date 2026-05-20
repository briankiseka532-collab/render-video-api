// ... (keep your existing imports and middleware configuration) ...

// --- ADD THIS ROOT ROUTE FOR GET REQUESTS ---
// This makes the 'Cannot GET /' message go away and confirms the server is reachable.
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});
// -------------------------------------------

app.get('/api/generate-video', (req, res) => {
  res.json({ message: 'This endpoint accepts POST requests. Please send a POST with a JSON body containing a "prompt" field.' });
});

app.post('/api/generate-video', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // A very short, 1MB, 720p sample video that is known to work.
  const sampleVideoUrl = 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4';
  
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

// ... (keep your existing app.listen code) ...
