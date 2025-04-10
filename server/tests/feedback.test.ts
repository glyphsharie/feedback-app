import request from 'supertest';
import { app } from '../index';

describe('Feedback API', () => {
  it('should create feedback successfully', async () => {
    const res = await request(app).post('/api/feedback').send({
      feedback: 'Great job!',
      score: 5
    });

    expect(res.statusCode).toBe(201);
    // TODO: Add assertion to check response body contains success message
    // Write assertion

  });

  it('should reject feedback with missing "feedback" field', async () => {
    const res = await request(app).post('/api/feedback').send({ score: 4 });

    // TODO: Check what's wrong in this test
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Feedback is required');
  });

  it('should reject feedback with invalid "score"', async () => {
    const res = await request(app).post('/api/feedback').send({ feedback: 'Bad score', score: 7 });

    expect(res.statusCode).toBe(400);
    // TODO: Add assertion to check error message
  });

  it('should reject feedback if "name" is not a string', async () => {
    const res = await request(app).post('/api/feedback').send({ name: 123, feedback: 'Test', score: 3 });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Name must be a string');
  });

  it('should return list of all feedbacks with expected structure', async () => {
    const res = await request(app).get('/api/feedback');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    // TODO: Add validation for structure of feedback entries
  });
});
