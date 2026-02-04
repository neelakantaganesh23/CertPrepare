import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { successResponse, errorResponse } from '../utils/responses.js';
import { z } from 'zod';

const prisma = new PrismaClient();

// Get study materials for a certification
export const getStudyMaterials = async (req: Request, res: Response): Promise<void> => {
  try {
    const { certificationId } = req.params;

    const materials = await prisma.studyMaterial.findMany({
      where: {
        certification_id: certificationId,
        is_active: true,
      },
      orderBy: { created_at: 'desc' },
    });

    successResponse(res, materials, 'Study materials retrieved successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to retrieve study materials', 500, error);
  }
};

// Get quiz questions for a certification
export const getQuizQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { certificationId } = req.params;
    const limit = parseInt(req.query.limit as string) || 10;

    const questions = await prisma.examQuestion.findMany({
      where: {
        certification_id: certificationId,
        is_active: true,
      },
      include: {
        options: {
          orderBy: { order_index: 'asc' },
        },
      },
      take: limit,
    });

    successResponse(res, questions, 'Quiz questions retrieved successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to retrieve quiz questions', 500, error);
  }
};

// Submit quiz answers
const quizSubmissionSchema = z.object({
  certification_id: z.string(),
  answers: z.array(
    z.object({
      question_id: z.string(),
      selected_option_id: z.string().optional(),
    })
  ),
});

export const submitQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = quizSubmissionSchema.parse(req.body);
    const userId = (req as any).user.id;

    // Get all questions to check answers
    const questions = await prisma.examQuestion.findMany({
      where: {
        id: { in: validated.answers.map((a) => a.question_id) },
      },
      include: {
        options: true,
      },
    });

    let correctCount = 0;
    const detailedResults = validated.answers.map((answer) => {
      const question = questions.find((q) => q.id === answer.question_id);
      const selectedOption = question?.options.find((o) => o.id === answer.selected_option_id);
      const correctOption = question?.options.find((o) => o.is_correct);
      const isCorrect = selectedOption?.is_correct || false;

      if (isCorrect) correctCount++;

      return {
        question_id: answer.question_id,
        question_text: question?.question_text,
        selected_option_id: answer.selected_option_id,
        selected_option_text: selectedOption?.option_text,
        correct_option_id: correctOption?.id,
        correct_option_text: correctOption?.option_text,
        explanation: question?.explanation,
        is_correct: isCorrect,
      };
    });

    const totalQuestions = validated.answers.length;
    const score = (correctCount / totalQuestions) * 100;
    const passed = score >= 75;

    // Save quiz submission
    const submission = await prisma.quizSubmission.create({
      data: {
        user_id: userId,
        certification_id: validated.certification_id,
        total_questions: totalQuestions,
        correct_answers: correctCount,
        score,
        passed,
      },
    });

    successResponse(
      res,
      {
        submission,
        details: detailedResults,
        summary: {
          totalQuestions,
          correctAnswers: correctCount,
          wrongAnswers: totalQuestions - correctCount,
          score: Math.round(score),
          passed,
          passPercentage: 75,
        },
      },
      'Quiz submitted successfully'
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      errorResponse(res, 'Invalid quiz submission', 400, error.errors);
    } else {
      errorResponse(res, 'Failed to submit quiz', 500, error);
    }
  }
};

// Get exam dumps for a certification
export const getExamDumps = async (req: Request, res: Response): Promise<void> => {
  try {
    const { certificationId } = req.params;

    const dumps = await prisma.examDump.findMany({
      where: {
        certification_id: certificationId,
        is_active: true,
      },
      include: {
        dump_questions: {
          take: 5, // Preview first 5 questions
        },
      },
      orderBy: { created_at: 'desc' },
    });

    successResponse(res, dumps, 'Exam dumps retrieved successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to retrieve exam dumps', 500, error);
  }
};

// Get dump questions with pagination
export const getDumpQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dumpId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [questions, total] = await Promise.all([
      prisma.dumpQuestion.findMany({
        where: { dump_id: dumpId },
        skip,
        take: limit,
      }),
      prisma.dumpQuestion.count({ where: { dump_id: dumpId } }),
    ]);

    successResponse(
      res,
      {
        questions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      'Dump questions retrieved successfully'
    );
  } catch (error: any) {
    errorResponse(res, 'Failed to retrieve dump questions', 500, error);
  }
};

// Get mock exams for a certification
export const getMockExams = async (req: Request, res: Response): Promise<void> => {
  try {
    const { certificationId } = req.params;

    const mockExams = await prisma.mockExam.findMany({
      where: {
        certification_id: certificationId,
        is_active: true,
      },
      orderBy: { created_at: 'desc' },
    });

    successResponse(res, mockExams, 'Mock exams retrieved successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to retrieve mock exams', 500, error);
  }
};

// Get mock exam details with questions
export const getMockExamDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { mockExamId } = req.params;

    const mockExam = await prisma.mockExam.findUnique({
      where: { id: mockExamId },
    });

    if (!mockExam) {
      errorResponse(res, 'Mock exam not found', 404);
      return;
    }

    // For now, return the exam details and indicate questions will come from frontend data
    successResponse(res, mockExam, 'Mock exam details retrieved successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to retrieve mock exam', 500, error);
  }
};

// Start a mock exam attempt
export const startMockExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { mockExamId } = req.params;
    const userId = (req as any).user.id;

    const mockExam = await prisma.mockExam.findUnique({
      where: { id: mockExamId },
    });

    if (!mockExam) {
      errorResponse(res, 'Mock exam not found', 404);
      return;
    }

    const attempt = await prisma.mockExamAttempt.create({
      data: {
        user_id: userId,
        mock_exam_id: mockExamId,
        total_questions: mockExam.total_questions,
        correct_answers: 0,
      },
    });

    successResponse(res, attempt, 'Mock exam started successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to start mock exam', 500, error);
  }
};

// Submit mock exam answers
const mockSubmissionSchema = z.object({
  attempt_id: z.string(),
  answers: z.array(
    z.object({
      question_id: z.string(),
      selected_answer: z.string().optional(),
      time_spent_seconds: z.number().optional(),
    })
  ),
});

export const submitMockExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = mockSubmissionSchema.parse(req.body);

    const attempt = await prisma.mockExamAttempt.findUnique({
      where: { id: validated.attempt_id },
    });

    if (!attempt) {
      errorResponse(res, 'Attempt not found', 404);
      return;
    }

    // Save all answers
    await Promise.all(
      validated.answers.map((answer) =>
        prisma.mockExamAnswer.create({
          data: {
            attempt_id: validated.attempt_id,
            question_id: answer.question_id,
            selected_answer: answer.selected_answer,
            time_spent_seconds: answer.time_spent_seconds || 0,
          },
        })
      )
    );

    // Get the mock exam to check answers
    const mockExam = await prisma.mockExam.findUnique({
      where: { id: attempt.mock_exam_id },
    });

    // Update attempt with final score
    let correctCount = 0;
    // In a real scenario, we'd validate against actual question answers
    // For now, we'll accept the submission as-is
    const score = mockExam ? (correctCount / mockExam.total_questions) * 100 : 0;
    const passed = score >= (mockExam?.passing_score || 70);

    const updatedAttempt = await prisma.mockExamAttempt.update({
      where: { id: validated.attempt_id },
      data: {
        completed_at: new Date(),
        correct_answers: correctCount,
        score,
        passed,
        time_taken_seconds: Math.round(
          (new Date().getTime() - new Date(attempt.started_at).getTime()) / 1000
        ),
      },
    });

    successResponse(res, updatedAttempt, 'Mock exam submitted successfully');
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      errorResponse(res, 'Invalid submission', 400, error.errors);
    } else {
      errorResponse(res, 'Failed to submit mock exam', 500, error);
    }
  }
};

// Get user's previous quiz submissions
export const getUserQuizHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { certificationId } = req.params;
    const userId = (req as any).user.id;

    const submissions = await prisma.quizSubmission.findMany({
      where: {
        user_id: userId,
        certification_id: certificationId,
      },
      orderBy: { submitted_at: 'desc' },
      take: 10,
    });

    successResponse(res, submissions, 'Quiz history retrieved successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to retrieve quiz history', 500, error);
  }
};

// Get user's mock exam attempts
export const getUserMockHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { certificationId } = req.params;
    const userId = (req as any).user.id;

    const attempts = await prisma.mockExamAttempt.findMany({
      where: {
        user_id: userId,
        mock_exam: {
          certification_id: certificationId,
        },
      },
      include: {
        mock_exam: true,
      },
      orderBy: { started_at: 'desc' },
      take: 10,
    });

    successResponse(res, attempts, 'Mock exam history retrieved successfully');
  } catch (error: any) {
    errorResponse(res, 'Failed to retrieve mock exam history', 500, error);
  }
};
