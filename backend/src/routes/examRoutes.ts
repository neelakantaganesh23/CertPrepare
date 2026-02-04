import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  getStudyMaterials,
  getQuizQuestions,
  submitQuiz,
  getExamDumps,
  getDumpQuestions,
  getMockExams,
  getMockExamDetails,
  startMockExam,
  submitMockExam,
  getUserQuizHistory,
  getUserMockHistory,
} from '../controllers/examController.js';

const router = Router();

/**
 * @swagger
 * /api/exams/{certificationId}/overview:
 *   get:
 *     tags: [Exams]
 *     summary: Get exam overview information
 *     parameters:
 *       - in: path
 *         name: certificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exam overview data
 */
router.get('/:certificationId/overview', async (req, res) => {
  try {
    const { certificationId } = req.params;
    // Overview data comes from the certification itself
    res.json({
      success: true,
      data: {
        message: 'Use certification details for overview',
        certificationId,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching overview' });
  }
});

/**
 * @swagger
 * /api/exams/{certificationId}/study-materials:
 *   get:
 *     tags: [Exams]
 *     summary: Get study materials for a certification
 *     parameters:
 *       - in: path
 *         name: certificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of study materials
 */
router.get('/:certificationId/study-materials', getStudyMaterials);

/**
 * @swagger
 * /api/exams/{certificationId}/quiz:
 *   get:
 *     tags: [Exams]
 *     summary: Get quiz questions for a certification
 *     parameters:
 *       - in: path
 *         name: certificationId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *     responses:
 *       200:
 *         description: List of quiz questions with options
 */
router.get('/:certificationId/quiz', getQuizQuestions);

/**
 * @swagger
 * /api/exams/quiz/submit:
 *   post:
 *     tags: [Exams]
 *     summary: Submit quiz answers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               certification_id:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question_id:
 *                       type: string
 *                     selected_option_id:
 *                       type: string
 *     responses:
 *       200:
 *         description: Quiz submission result with detailed feedback
 */
router.post('/quiz/submit', authMiddleware, submitQuiz);

/**
 * @swagger
 * /api/exams/{certificationId}/history/quiz:
 *   get:
 *     tags: [Exams]
 *     summary: Get user's quiz submission history
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: certificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's quiz history
 */
router.get('/:certificationId/history/quiz', authMiddleware, getUserQuizHistory);

/**
 * @swagger
 * /api/exams/{certificationId}/dumps:
 *   get:
 *     tags: [Exams]
 *     summary: Get exam dumps for a certification
 *     parameters:
 *       - in: path
 *         name: certificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of exam dumps
 */
router.get('/:certificationId/dumps', getExamDumps);

/**
 * @swagger
 * /api/exams/dumps/{dumpId}/questions:
 *   get:
 *     tags: [Exams]
 *     summary: Get questions from a dump
 *     parameters:
 *       - in: path
 *         name: dumpId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 20
 *     responses:
 *       200:
 *         description: Paginated dump questions
 */
router.get('/dumps/:dumpId/questions', getDumpQuestions);

/**
 * @swagger
 * /api/exams/{certificationId}/mocks:
 *   get:
 *     tags: [Exams]
 *     summary: Get mock exams for a certification
 *     parameters:
 *       - in: path
 *         name: certificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of available mock exams
 */
router.get('/:certificationId/mocks', getMockExams);

/**
 * @swagger
 * /api/exams/mocks/{mockExamId}:
 *   get:
 *     tags: [Exams]
 *     summary: Get mock exam details
 *     parameters:
 *       - in: path
 *         name: mockExamId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mock exam details
 */
router.get('/mocks/:mockExamId', getMockExamDetails);

/**
 * @swagger
 * /api/exams/mocks/{mockExamId}/start:
 *   post:
 *     tags: [Exams]
 *     summary: Start a mock exam attempt
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: mockExamId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mock exam attempt started
 */
router.post('/mocks/:mockExamId/start', authMiddleware, startMockExam);

/**
 * @swagger
 * /api/exams/mocks/submit:
 *   post:
 *     tags: [Exams]
 *     summary: Submit mock exam answers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attempt_id:
 *                 type: string
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question_id:
 *                       type: string
 *                     selected_answer:
 *                       type: string
 *                     time_spent_seconds:
 *                       type: number
 *     responses:
 *       200:
 *         description: Mock exam submission result
 */
router.post('/mocks/submit', authMiddleware, submitMockExam);

/**
 * @swagger
 * /api/exams/{certificationId}/history/mocks:
 *   get:
 *     tags: [Exams]
 *     summary: Get user's mock exam attempts history
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: certificationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's mock exam history
 */
router.get('/:certificationId/history/mocks', authMiddleware, getUserMockHistory);

export default router;
