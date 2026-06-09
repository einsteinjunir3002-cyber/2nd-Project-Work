import { Router } from 'express';
import { summarizeNote, askAi } from '../controllers/aiController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/summarize', authenticateToken, summarizeNote);
router.post('/chat', authenticateToken, askAi);

export default router;
