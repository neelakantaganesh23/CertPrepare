import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create certifications
  const aws = await prisma.certification.create({
    data: {
      name: 'AWS Solutions Architect Professional',
      description: 'Master AWS cloud architecture and design',
      passing_score: 72,
      duration_minutes: 180,
      total_questions: 65,
    },
  });

  const azure = await prisma.certification.create({
    data: {
      name: 'Azure Administrator',
      description: 'Manage Azure infrastructure and services',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const pmp = await prisma.certification.create({
    data: {
      name: 'PMP - Project Management Professional',
      description: 'Professional project management certification',
      passing_score: 68,
      duration_minutes: 230,
      total_questions: 200,
    },
  });

  console.log('✅ Created certifications');

  // Create topics for AWS
  const awsTopics = await Promise.all([
    prisma.topic.create({
      data: {
        certification_id: aws.id,
        name: 'EC2 & Auto Scaling',
        description: 'Elastic Compute Cloud and scaling strategies',
        order_index: 1,
      },
    }),
    prisma.topic.create({
      data: {
        certification_id: aws.id,
        name: 'S3 & Storage',
        description: 'Simple Storage Service and other storage options',
        order_index: 2,
      },
    }),
    prisma.topic.create({
      data: {
        certification_id: aws.id,
        name: 'Database Services',
        description: 'RDS, DynamoDB, and other database options',
        order_index: 3,
      },
    }),
  ]);

  console.log('✅ Created topics');

  // Create sample questions
  const question1 = await prisma.question.create({
    data: {
      topic_id: awsTopics[0].id,
      question_text: 'What does EC2 stand for?',
      type: 'MULTIPLE_CHOICE',
      difficulty: 'EASY',
      explanation: 'EC2 stands for Elastic Compute Cloud, which is the primary compute service in AWS.',
      answers: {
        create: [
          { answer_text: 'Elastic Compute Cloud', is_correct: true, order_index: 0 },
          { answer_text: 'Enhanced Cloud Computing', is_correct: false, order_index: 1 },
          { answer_text: 'Elastic Cloud Computing', is_correct: false, order_index: 2 },
          { answer_text: 'Elastic Container Cloud', is_correct: false, order_index: 3 },
        ],
      },
    },
  });

  console.log('✅ Created sample questions');

  console.log('🌱 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
