import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();

/**
 * @swagger
 * /api/certifications:
 *   get:
 *     summary: Get all certifications
 *     tags: [Certifications]
 *     responses:
 *       200:
 *         description: List of certifications
 */
router.get('/', (req, res) => {
  res.json({ message: 'Get certifications - Coming soon' });
});

/**
 * @swagger
 * /api/certifications/{id}:
 *   get:
 *     summary: Get certification by ID
 *     tags: [Certifications]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certification details
 */
router.get('/:id', (req, res) => {
  res.json({ message: 'Get certification by ID - Coming soon' });
});

/**
 * @swagger
 * /api/certifications:
 *   post:
 *     summary: Create a new certification (Admin only)
 *     tags: [Certifications]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               passing_score:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Certification created
 *       403:
 *         description: Insufficient permissions
 */
router.post(
  '/',
  authMiddleware,
  requireRole('ADMIN'),
  (req, res) => {
    res.json({ message: 'Create certification - Coming soon' });
  }
);

export default router;
