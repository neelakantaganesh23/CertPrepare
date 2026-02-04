import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { successResponse, errorResponse } from '../utils/responses.js';

const router = Router();
const prisma = new PrismaClient();

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
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const certifications = await prisma.certification.findMany({
      where: { is_active: true },
      orderBy: { name: 'asc' },
    });
    
    successResponse(res, certifications, 'Certifications retrieved successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to retrieve certifications', 500, error);
  }
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
 *       404:
 *         description: Certification not found
 */
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const certification = await prisma.certification.findUnique({
      where: { id },
      include: {
        topics: {
          where: { is_active: true },
          orderBy: { order_index: 'asc' },
        },
      },
    });

    if (!certification) {
      errorResponse(res, 'Certification not found', 404);
      return;
    }

    successResponse(res, certification, 'Certification retrieved successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to retrieve certification', 500, error);
  }
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
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description, passing_score, duration_minutes, total_questions } = req.body;

      const certification = await prisma.certification.create({
        data: {
          name,
          description,
          passing_score: passing_score || 70,
          duration_minutes: duration_minutes || 120,
          total_questions: total_questions || 50,
        },
      });

      successResponse(res, certification, 'Certification created successfully', 201);
    } catch (error: any) {
      errorResponse(res, 'Failed to create certification', 500, error);
    }
  }
);

export default router;
