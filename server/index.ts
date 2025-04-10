import express from 'express';
import cors from 'cors';

export const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// TODO: Improve typings
const feedbacks: any[] = [];

app.post('/api/feedback', (req, res) => {
  const { name, feedback, score } = req.body;

  // TODO: Implement validation schema

  const entry: any = { name, feedback, score };
  feedbacks.push(entry);
  res.status(201).json({ message: 'Feedback received' });
});

app.get('/api/feedback', (req, res) => {
  // TODO: Add paginations (per page max of 3)
  res.json(feedbacks);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});