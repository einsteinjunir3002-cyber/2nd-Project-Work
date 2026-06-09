import { Router } from 'express';
import { 
  getUsers, 
  suspendUser, 
  getPlatformStats, 
  getSiteSettings,
  updateSiteSettings,
  testAiConnection 
} from '../controllers/adminController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

// Secure all admin endpoints to Admin roles only
router.get('/users', authenticateToken, requireRole(['admin']), getUsers);
router.post('/users/suspend', authenticateToken, requireRole(['admin']), suspendUser);
router.get('/stats', authenticateToken, requireRole(['admin']), getPlatformStats);
router.get('/settings', authenticateToken, requireRole(['admin']), getSiteSettings);
router.post('/settings', authenticateToken, requireRole(['admin']), updateSiteSettings);
router.post('/ai/test', authenticateToken, requireRole(['admin']), testAiConnection);

export default router;
