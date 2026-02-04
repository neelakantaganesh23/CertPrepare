import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Adding remaining Snowflake certifications...');

  try {
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
    console.log('✓ Added SnowPro Associate: Platform (SOL-C01)');

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
    console.log('✓ Added SnowPro Advanced: Data Engineer (DEA-C02)');

    const snowproAdvDataScientist = await prisma.certification.create({
      data: {
        name: 'SnowPro Advanced: Data Scientist (DSA-C03)',
        description: 'Advanced-level certification for Data Scientists - Requires Core certification. Includes Gen AI, MLflow, and ML model management. Updated 2025',
        passing_score: 75,
        duration_minutes: 150,
        total_questions: 60,
      },
    });
    console.log('✓ Added SnowPro Advanced: Data Scientist (DSA-C03)');

    const snowproAdvAdministrator = await prisma.certification.create({
      data: {
        name: 'SnowPro Advanced: Administrator (ADA-C02)',
        description: 'Advanced-level certification for Administrators - Requires Core certification. Security, account governance, and system administration. Updated 2025',
        passing_score: 75,
        duration_minutes: 150,
        total_questions: 60,
      },
    });
    console.log('✓ Added SnowPro Advanced: Administrator (ADA-C02)');

    const snowproAdvArchitect = await prisma.certification.create({
      data: {
        name: 'SnowPro Advanced: Architect (ARA-C01)',
        description: 'Advanced-level certification for Solutions Architects - Requires Core certification. Enterprise-scale architecture design and best practices',
        passing_score: 75,
        duration_minutes: 150,
        total_questions: 60,
      },
    });
    console.log('✓ Added SnowPro Advanced: Architect (ARA-C01)');

    const snowproAdvDataAnalyst = await prisma.certification.create({
      data: {
        name: 'SnowPro Advanced: Data Analyst (DAA-C01)',
        description: 'Advanced-level certification for Data Analysts - Requires Core certification. Advanced analytics, data visualization, and business intelligence',
        passing_score: 75,
        duration_minutes: 150,
        total_questions: 60,
      },
    });
    console.log('✓ Added SnowPro Advanced: Data Analyst (DAA-C01)');

    const snowproAdvSecurityEngineer = await prisma.certification.create({
      data: {
        name: 'SnowPro Advanced: Security Engineer (SEA-C01)',
        description: 'Advanced-level certification for Security Engineers - Requires Core certification. Security architecture, governance, and compliance in Snowflake',
        passing_score: 75,
        duration_minutes: 150,
        total_questions: 60,
      },
    });
    console.log('✓ Added SnowPro Advanced: Security Engineer (SEA-C01)');

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
    console.log('✓ Added SnowPro Specialty: Snowpark (SPS-C01)');

    const snowproSpecialtyNativeApps = await prisma.certification.create({
      data: {
        name: 'SnowPro Specialty: Native Apps (NAS-C01)',
        description: 'Specialty Certification - For Marketplace app builders. Building, testing, and deploying native applications on Snowflake Marketplace',
        passing_score: 70,
        duration_minutes: 120,
        total_questions: 50,
      },
    });
    console.log('✓ Added SnowPro Specialty: Native Apps (NAS-C01)');

    console.log('✅ Successfully added 9 remaining Snowflake certifications!');
  } catch (error) {
    console.error('❌ Error adding certifications:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
