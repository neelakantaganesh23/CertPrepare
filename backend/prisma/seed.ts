import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create certifications - Snowflake
  const snowproCoreFoundation = await prisma.certification.create({
    data: {
      name: 'SnowPro Core (COF-C02)',
      description: 'Foundation Level - Understanding Snowflake architecture, data loading, and account management',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const snowproSpecialtyGenAI = await prisma.certification.create({
    data: {
      name: 'SnowPro Specialty: Gen AI',
      description: 'Specialty Certification - LLMs, Cortex, and generative workflows within Snowflake',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  // Associate Level (New for 2025)
  const snowproAssociatePlatform = await prisma.certification.create({
    data: {
      name: 'SnowPro Associate: Platform (SOL-C01)',
      description: 'Entry-level tier for beginners - Basic navigation, Snowflake Notebooks, Cortex LLM functions, and roles. Unproctored and lower cost. Launched Feb 3, 2025',
      passing_score: 65,
      duration_minutes: 90,
      total_questions: 40,
    },
  });

  // Advanced Role-Based Level
  const snowproAdvDataEngineer = await prisma.certification.create({
    data: {
      name: 'SnowPro Advanced: Data Engineer (DEA-C02)',
      description: 'Advanced-level certification for Data Engineers - Requires Core certification. Deep technical skills for data pipeline design and optimization. Updated 2025',
      passing_score: 75,
      duration_minutes: 150,
      total_questions: 60,
    },
  });

  const snowproAdvDataScientist = await prisma.certification.create({
    data: {
      name: 'SnowPro Advanced: Data Scientist (DSA-C03)',
      description: 'Advanced-level certification for Data Scientists - Requires Core certification. Includes Gen AI, MLflow, and ML model management. Updated 2025',
      passing_score: 75,
      duration_minutes: 150,
      total_questions: 60,
    },
  });

  const snowproAdvAdministrator = await prisma.certification.create({
    data: {
      name: 'SnowPro Advanced: Administrator (ADA-C02)',
      description: 'Advanced-level certification for Administrators - Requires Core certification. Security, account governance, and system administration. Updated 2025',
      passing_score: 75,
      duration_minutes: 150,
      total_questions: 60,
    },
  });

  const snowproAdvArchitect = await prisma.certification.create({
    data: {
      name: 'SnowPro Advanced: Architect (ARA-C01)',
      description: 'Advanced-level certification for Solutions Architects - Requires Core certification. Enterprise-scale architecture design and best practices',
      passing_score: 75,
      duration_minutes: 150,
      total_questions: 60,
    },
  });

  const snowproAdvDataAnalyst = await prisma.certification.create({
    data: {
      name: 'SnowPro Advanced: Data Analyst (DAA-C01)',
      description: 'Advanced-level certification for Data Analysts - Requires Core certification. Advanced analytics, data visualization, and business intelligence',
      passing_score: 75,
      duration_minutes: 150,
      total_questions: 60,
    },
  });

  const snowproAdvSecurityEngineer = await prisma.certification.create({
    data: {
      name: 'SnowPro Advanced: Security Engineer (SEA-C01)',
      description: 'Advanced-level certification for Security Engineers - Requires Core certification. Security architecture, governance, and compliance in Snowflake',
      passing_score: 75,
      duration_minutes: 150,
      total_questions: 60,
    },
  });

  // Specialty Series
  const snowproSpecialtySnowpark = await prisma.certification.create({
    data: {
      name: 'SnowPro Specialty: Snowpark (SPS-C01)',
      description: 'Specialty Certification - For Python/Java developers. Snowpark SDK, API-first development, and application deployment on Snowflake',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const snowproSpecialtyNativeApps = await prisma.certification.create({
    data: {
      name: 'SnowPro Specialty: Native Apps (NAS-C01)',
      description: 'Specialty Certification - For Marketplace app builders. Building, testing, and deploying native applications on Snowflake Marketplace',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  // Create certifications - Azure
  const azFundamentals = await prisma.certification.create({
    data: {
      name: 'Azure Fundamentals (AZ-900)',
      description: 'Cloud concepts, Azure architecture, and billing',
      passing_score: 70,
      duration_minutes: 85,
      total_questions: 40,
    },
  });

  const dpFundamentals = await prisma.certification.create({
    data: {
      name: 'Azure Data Fundamentals (DP-900)',
      description: 'Core data concepts (Batch vs. Streaming), SQL vs. NoSQL, and analytics workloads',
      passing_score: 70,
      duration_minutes: 60,
      total_questions: 40,
    },
  });

  const aiFundamentals = await prisma.certification.create({
    data: {
      name: 'Azure AI Fundamentals (AI-900)',
      description: 'Machine Learning, Computer Vision, NLP, and Azure AI workloads',
      passing_score: 70,
      duration_minutes: 60,
      total_questions: 40,
    },
  });

  const dp203 = await prisma.certification.create({
    data: {
      name: 'Azure Data Engineer Associate (DP-203)',
      description: 'Designing data storage, data processing, and security with Databricks and Synapse Analytics',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const dp100 = await prisma.certification.create({
    data: {
      name: 'Azure Data Scientist Associate (DP-100)',
      description: 'Building and operating machine learning solutions with Azure Machine Learning, MLflow, and Databricks',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const ai102 = await prisma.certification.create({
    data: {
      name: 'Azure AI Engineer Associate (AI-102)',
      description: 'Building, managing, and deploying AI solutions using Azure AI Services and OpenAI',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const dp300 = await prisma.certification.create({
    data: {
      name: 'Administering Azure SQL Solutions (DP-300)',
      description: 'Managing SQL Server on Azure (IaaS and PaaS), performance tuning, and high availability',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const az204 = await prisma.certification.create({
    data: {
      name: 'Azure Developer Associate (AZ-204)',
      description: 'Developing for Azure storage, PaaS solutions (App Service, Functions), and authentication',
      passing_score: 70,
      duration_minutes: 150,
      total_questions: 50,
    },
  });

  const az400 = await prisma.certification.create({
    data: {
      name: 'DevOps Engineer Expert (AZ-400)',
      description: 'CI/CD pipelines, GitHub Actions, Azure DevOps, and site reliability engineering (SRE)',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const az104 = await prisma.certification.create({
    data: {
      name: 'Azure Administrator Associate (AZ-104)',
      description: 'Managing virtual networks (VNETs), identities, storage accounts, and VM governance',
      passing_score: 70,
      duration_minutes: 150,
      total_questions: 50,
    },
  });

  const az305 = await prisma.certification.create({
    data: {
      name: 'Azure Solutions Architect Expert (AZ-305)',
      description: 'Designing high-level infrastructure, business continuity, disaster recovery, and identity solutions',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const az500 = await prisma.certification.create({
    data: {
      name: 'Azure Security Engineer Associate (AZ-500)',
      description: 'Identity management, platform protection, and securing data/applications',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  // Create certifications - AWS
  const awsCloudPractitioner = await prisma.certification.create({
    data: {
      name: 'AWS Certified Cloud Practitioner (CLF-C02)',
      description: 'General cloud knowledge and AWS fundamentals',
      passing_score: 70,
      duration_minutes: 90,
      total_questions: 65,
    },
  });

  const awsSolutionsArchitectAssociate = await prisma.certification.create({
    data: {
      name: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      description: 'The most popular cloud certification globally - designing scalable and reliable AWS solutions',
      passing_score: 72,
      duration_minutes: 130,
      total_questions: 65,
    },
  });

  const awsDeveloper = await prisma.certification.create({
    data: {
      name: 'AWS Certified Developer – Associate (DVA-C02)',
      description: 'Developing and deploying applications on AWS',
      passing_score: 72,
      duration_minutes: 130,
      total_questions: 65,
    },
  });

  const awsDataEngineer = await prisma.certification.create({
    data: {
      name: 'AWS Certified Data Engineer – Associate (DEA-C01)',
      description: 'Designing and managing data pipelines on AWS (New exam, critical for data professionals)',
      passing_score: 72,
      duration_minutes: 130,
      total_questions: 65,
    },
  });

  const awsSysOps = await prisma.certification.create({
    data: {
      name: 'AWS Certified SysOps Administrator – Associate (SOA-C02)',
      description: 'Managing and operating AWS systems',
      passing_score: 72,
      duration_minutes: 130,
      total_questions: 65,
    },
  });

  const awsSolutionsArchitectProfessional = await prisma.certification.create({
    data: {
      name: 'AWS Certified Solutions Architect – Professional (SAP-C02)',
      description: 'Expert-level AWS architecture design with 2+ years of experience',
      passing_score: 72,
      duration_minutes: 180,
      total_questions: 65,
    },
  });

  const awsDevOps = await prisma.certification.create({
    data: {
      name: 'AWS Certified DevOps Engineer – Professional (DOP-C02)',
      description: 'Expert-level CI/CD pipelines and infrastructure automation',
      passing_score: 72,
      duration_minutes: 180,
      total_questions: 65,
    },
  });

  const awsMachineLearning = await prisma.certification.create({
    data: {
      name: 'AWS Certified Machine Learning – Specialty (MLS-C01)',
      description: 'Deep dive into ML solutions on AWS with SageMaker and other AWS ML services',
      passing_score: 72,
      duration_minutes: 180,
      total_questions: 65,
    },
  });

  const awsSecurity = await prisma.certification.create({
    data: {
      name: 'AWS Certified Security – Specialty (SCS-C02)',
      description: 'Securing AWS infrastructure and applications',
      passing_score: 72,
      duration_minutes: 180,
      total_questions: 65,
    },
  });

  const awsAdvancedNetworking = await prisma.certification.create({
    data: {
      name: 'AWS Certified Advanced Networking – Specialty (ANS-C01)',
      description: 'Complex networking solutions and architectures on AWS',
      passing_score: 72,
      duration_minutes: 170,
      total_questions: 65,
    },
  });

  // Create certifications - GCP
  const gcpCloudDigitalLeader = await prisma.certification.create({
    data: {
      name: 'Google Cloud Digital Leader (CDL)',
      description: 'General GCP concepts and cloud fundamentals',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const gcpAssociateCloudEngineer = await prisma.certification.create({
    data: {
      name: 'Google Cloud Associate Cloud Engineer (ACE)',
      description: 'Hands-on GCP implementation and deployment',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const gcpDataEngineer = await prisma.certification.create({
    data: {
      name: 'Google Cloud Professional Data Engineer (PDE)',
      description: 'The Gold Standard for Big Data on GCP - designing and operating data pipelines',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const gcpMachineLearningEngineer = await prisma.certification.create({
    data: {
      name: 'Google Cloud Professional Machine Learning Engineer (PMLE)',
      description: 'Building and deploying ML solutions on GCP with Vertex AI and BigQuery ML',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const gcpCloudArchitect = await prisma.certification.create({
    data: {
      name: 'Google Cloud Professional Cloud Architect (PCA)',
      description: 'Broad architecture skills and designing scalable GCP solutions',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const gcpCloudDeveloper = await prisma.certification.create({
    data: {
      name: 'Google Cloud Professional Cloud Developer (PCD)',
      description: 'Developing and deploying applications on GCP',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const gcpCloudSecurityEngineer = await prisma.certification.create({
    data: {
      name: 'Google Cloud Professional Cloud Security Engineer (PCS)',
      description: 'Securing GCP infrastructure and applications',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const gcpDatabaseEngineer = await prisma.certification.create({
    data: {
      name: 'Google Cloud Professional Cloud Database Engineer (PCDB)',
      description: 'Managing and optimizing databases on GCP',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const gcpNetworkEngineer = await prisma.certification.create({
    data: {
      name: 'Google Cloud Professional Cloud Network Engineer (PCNE)',
      description: 'Designing and managing complex network architectures on GCP',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  // Create certifications - Databricks
  const databricksDataEngineerAssociate = await prisma.certification.create({
    data: {
      name: 'Databricks Certified Data Engineer Associate',
      description: 'Python/SQL, Lakehouse basics, and Apache Spark fundamentals',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const databricksDataEngineerProfessional = await prisma.certification.create({
    data: {
      name: 'Databricks Certified Data Engineer Professional',
      description: 'Production pipelines, Delta Live Tables (DLT), and advanced Spark optimization',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const databricksDataAnalystAssociate = await prisma.certification.create({
    data: {
      name: 'Databricks Certified Data Analyst Associate',
      description: 'SQL, Dashboards, and data visualization with Databricks',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const databricksGenerativeAIEngineer = await prisma.certification.create({
    data: {
      name: 'Databricks Certified Generative AI Engineer Associate',
      description: 'Large Language Models (LLMs), RAG, Vector Databases, and LLM Application Development',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const databricksMachineLearningAssociate = await prisma.certification.create({
    data: {
      name: 'Databricks Certified Machine Learning Associate',
      description: 'Machine learning pipelines and model development with Databricks',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  const databricksMachineLearningProfessional = await prisma.certification.create({
    data: {
      name: 'Databricks Certified Machine Learning Professional',
      description: 'Advanced ML operations, production pipelines, and MLflow expertise',
      passing_score: 70,
      duration_minutes: 120,
      total_questions: 50,
    },
  });

  console.log('✅ Created all certifications (45+ certifications)');

  // Create topics for AWS Solutions Architect Associate
  const awsArchitectTopics = await Promise.all([
    prisma.topic.create({
      data: {
        certification_id: awsSolutionsArchitectAssociate.id,
        name: 'EC2 & Auto Scaling',
        description: 'Elastic Compute Cloud and scaling strategies',
        order_index: 1,
      },
    }),
    prisma.topic.create({
      data: {
        certification_id: awsSolutionsArchitectAssociate.id,
        name: 'S3 & Storage',
        description: 'Simple Storage Service and other storage options',
        order_index: 2,
      },
    }),
    prisma.topic.create({
      data: {
        certification_id: awsSolutionsArchitectAssociate.id,
        name: 'Database Services',
        description: 'RDS, DynamoDB, and other database options',
        order_index: 3,
      },
    }),
  ]);

  console.log('✅ Created topics');

  // Create sample questions for AWS
  const question1 = await prisma.question.create({
    data: {
      topic_id: awsArchitectTopics[0].id,
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

  // Create topics for Azure Data Engineer
  const azureDataEngineerTopics = await Promise.all([
    prisma.topic.create({
      data: {
        certification_id: dp203.id,
        name: 'Data Storage Design',
        description: 'Azure data storage options and architecture',
        order_index: 1,
      },
    }),
    prisma.topic.create({
      data: {
        certification_id: dp203.id,
        name: 'Data Processing',
        description: 'Databricks, Synapse Analytics, and Data Factory',
        order_index: 2,
      },
    }),
  ]);

  console.log('✅ Created sample topics and questions');

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
