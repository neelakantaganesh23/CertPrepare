export interface Quiz {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

export interface DumpQuestion {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
}

export interface LearningMaterial {
  id: number;
  title: string;
  type: 'documentation' | 'video' | 'article';
  url: string;
  description: string;
}

export interface ExamData {
  name: string;
  provider: string;
  description: string;
  overview?: {
    examVersion?: string;
    totalQuestions?: number;
    questionTypes?: string;
    timeLimit?: string;
    languages?: string;
    registrationFee?: string;
    passingScore?: string;
    prerequisites?: string;
    deliveryOptions?: string[];
    domains?: Array<{ name: string; weight: string }>;
    recommendedResources?: Array<{
      title: string;
      url: string;
      type: string;
    }>;
  };
  quizzes: Quiz[];
  dumps?: DumpQuestion[];
  learningMaterials: LearningMaterial[];
  mockTests: Array<{
    id: number;
    name: string;
    questionsCount: number;
    duration: number;
  }>;
}

export const examDatabase: Record<string, ExamData> = {
  'SnowPro Core (COF-C02)': {
    name: 'SnowPro Core (COF-C02)',
    provider: 'Snowflake',
    description: 'Foundation Level - Understanding Snowflake architecture, data loading, and account management',
    quizzes: [
      {
        id: 1,
        category: 'Snowflake Architecture',
        question:
          'Which layer of the Snowflake architecture is responsible for managing metadata, authentication, and access control?',
        options: [
          'Database Storage',
          'Cloud Services',
          'Query Processing',
          'Virtual Warehouse',
        ],
        correct_answer: 'Cloud Services',
        explanation:
          "The Cloud Services layer is the 'brain' of Snowflake. It handles authentication, metadata management, query parsing/optimization, and access control. It is stateless and runs across multiple availability zones.",
      },
      {
        id: 2,
        category: 'Virtual Warehouses',
        question:
          'You have a complex query that is taking too long to execute on an X-Small warehouse. Which action should you take to improve the performance of this specific query?',
        options: [
          'Scale Out (add more clusters)',
          'Scale Up (resize to a larger warehouse)',
          'Enable Auto-suspend',
          'Change the cloud provider',
        ],
        correct_answer: 'Scale Up (resize to a larger warehouse)',
        explanation:
          'Scaling Up (resizing) increases the compute resources (CPU/Memory) available for a single query, which reduces execution time for complex operations. Scaling Out (adding clusters) is for handling concurrency (multiple users), not single query speed.',
      },
      {
        id: 3,
        category: 'Data Protection',
        question: 'What is the fixed retention period for Fail-safe in Snowflake for permanent tables?',
        options: ['1 day', '7 days', '14 days', '90 days'],
        correct_answer: '7 days',
        explanation:
          'Fail-safe is a non-configurable 7-day period that occurs immediately after the Time Travel retention period ends. It is accessible only by Snowflake support for disaster recovery.',
      },
      {
        id: 4,
        category: 'Data Loading',
        question: 'Which command is primarily used to bulk load data from a stage into a Snowflake table?',
        options: ['INSERT INTO', 'PUT', 'COPY INTO <table>', 'GET'],
        correct_answer: 'COPY INTO <table>',
        explanation:
          "COPY INTO <table> is the command used for bulk loading data from external or internal stages. 'PUT' uploads files to a stage, 'GET' downloads them, and 'INSERT' is for single-row entries.",
      },
      {
        id: 5,
        category: 'Performance Optimization',
        question:
          'How long does the Query Result Cache persist a result set, provided the underlying data has not changed?',
        options: ['1 hour', '12 hours', '24 hours', '7 days'],
        correct_answer: '24 hours',
        explanation:
          'The Result Cache holds results for 24 hours. If the exact same query is run again and the data hasn\'t changed, Snowflake returns the result from the cache without using compute credits. The timer resets every time the result is accessed.',
      },
      {
        id: 6,
        category: 'Storage',
        question: 'What is the default compression method used by Snowflake for micro-partitions?',
        options: ['GZIP', 'LZO', 'ZSTD', 'Snowflake automatically manages compression (proprietary)'],
        correct_answer: 'Snowflake automatically manages compression (proprietary)',
        explanation:
          'Snowflake automatically compresses all data stored in micro-partitions using its own proprietary, highly efficient columnar compression algorithms. Users do not select the compression type for internal storage.',
      },
      {
        id: 7,
        category: 'Virtual Warehouses',
        question: "A Multi-Cluster Warehouse set to 'Auto-scale' mode is best suited for which scenario?",
        options: [
          'Loading a single 500GB file',
          'Handling high concurrency with many users running queries at once',
          'Running a complex machine learning model',
          'Reducing storage costs',
        ],
        correct_answer: 'Handling high concurrency with many users running queries at once',
        explanation:
          'Auto-scaling adds additional clusters (Scaling Out) to handle queuing issues when many users submit queries simultaneously. It ensures consistent performance during peak hours.',
      },
      {
        id: 8,
        category: 'Account & Security',
        question: 'Which role is most appropriate for creating and managing users, roles, and object grants?',
        options: ['SYSADMIN', 'SECURITYADMIN', 'PUBLIC', 'ACCOUNTADMIN'],
        correct_answer: 'SECURITYADMIN',
        explanation:
          'SECURITYADMIN (or USERADMIN) is the role designated for managing users, roles, and grants. While ACCOUNTADMIN can do this, best practice dictates using SECURITYADMIN to separate duties.',
      },
      {
        id: 9,
        category: 'Data Loading',
        question:
          'Which Snowflake object is used to automatically load data from cloud storage as soon as a file lands in an S3 bucket?',
        options: ['Task', 'Stream', 'Snowpipe', 'Virtual Warehouse'],
        correct_answer: 'Snowpipe',
        explanation:
          'Snowpipe is Snowflake\'s continuous data ingestion service. It detects new files in a stage (via event notifications like SQS/SNS) and loads them in micro-batches near real-time.',
      },
      {
        id: 10,
        category: 'Architecture',
        question:
          "Snowflake is described as a 'Multi-Cluster Shared Data' architecture. What does 'Shared Data' refer to?",
        options: [
          'All customers share the same database tables',
          'All compute nodes share access to a single persistent storage layer',
          'Data is shared publicly on the internet',
          'Compute resources are shared between all accounts',
        ],
        correct_answer: 'All compute nodes share access to a single persistent storage layer',
        explanation:
          'In Snowflake, storage is decoupled from compute. \'Shared Data\' means that all virtual warehouses (compute clusters) can access the same underlying data in the storage layer (S3/Blob/GCS) without copying it.',
      },
      {
        id: 11,
        category: 'Data Protection',
        question: 'What is the maximum Time Travel retention period available for Snowflake Enterprise Edition?',
        options: ['1 day', '7 days', '60 days', '90 days'],
        correct_answer: '90 days',
        explanation: 'Enterprise Edition and higher allow for Time Travel retention to be configured up to 90 days. Standard Edition is limited to 1 day.',
      },
      {
        id: 12,
        category: 'Storage',
        question: 'Which of the following best describes a Micro-partition?',
        options: [
          'A mutable block of data that can be updated in place',
          'An uncompressed row-based file',
          'An immutable, compressed, columnar storage unit',
          'A temporary file used only for caching',
        ],
        correct_answer: 'An immutable, compressed, columnar storage unit',
        explanation:
          'Micro-partitions are the fundamental unit of storage in Snowflake. They are immutable (cannot be changed, only replaced), compressed, and store data in a columnar format.',
      },
      {
        id: 13,
        category: 'Performance Optimization',
        question:
          'Which feature helps prune micro-partitions by co-locating similar data in the same micro-partitions based on one or more columns?',
        options: ['Indexing', 'Clustering (or Automatic Clustering)', 'Partitioning', 'Hashing'],
        correct_answer: 'Clustering (or Automatic Clustering)',
        explanation:
          'Snowflake does not use traditional indexes. Instead, it uses Clustering Keys to sort data. This allows the query engine to skip (prune) micro-partitions that do not contain relevant data for a query.',
      },
      {
        id: 14,
        category: 'Data Sharing',
        question:
          "When sharing data using Snowflake Secure Data Sharing, is data copied to the consumer's account?",
        options: [
          'Yes, it is fully replicated',
          'No, it is accessed via the metadata layer without copying',
          'Yes, but only incrementally',
          "No, but the consumer pays for the storage",
        ],
        correct_answer: 'No, it is accessed via the metadata layer without copying',
        explanation:
          "Secure Data Sharing allows consumers to query data directly from the provider's storage. No actual data is copied or moved, ensuring 'live' access.",
      },
      {
        id: 15,
        category: 'Semi-Structured Data',
        question:
          'Which Snowflake data type is best used to store semi-structured data like JSON, Avro, or Parquet?',
        options: ['VARCHAR', 'BLOB', 'VARIANT', 'ARRAY'],
        correct_answer: 'VARIANT',
        explanation:
          'The VARIANT data type is optimized to store semi-structured data. Snowflake can parse the internal structure of VARIANT columns to optimize queries on nested fields.',
      },
    ],
    learningMaterials: [
      {
        id: 1,
        title: 'Snowflake Architecture Overview',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/intro-key-concepts.html',
        description: 'Learn about Snowflake\'s three-layer architecture and key concepts',
      },
      {
        id: 2,
        title: 'Virtual Warehouses Guide',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/warehouses.html',
        description: 'Comprehensive guide to creating and managing virtual warehouses',
      },
      {
        id: 3,
        title: 'Data Loading & Unloading',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/data-load-overview.html',
        description: 'Learn about COPY, Snowpipe, and other data loading methods',
      },
      {
        id: 4,
        title: 'Performance Optimization',
        type: 'article',
        url: 'https://docs.snowflake.com/en/user-guide/performance-tuning-overview.html',
        description: 'Best practices for optimizing query performance',
      },
      {
        id: 5,
        title: 'Time Travel & Data Recovery',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/data-time-travel.html',
        description: 'Understand Time Travel, Fail-safe, and data recovery options',
      },
    ],
    mockTests: [
      {
        id: 1,
        name: 'SnowPro Core Full Mock Test',
        questionsCount: 100,
        duration: 180,
      },
      {
        id: 2,
        name: 'Architecture & Warehouse Practice Test',
        questionsCount: 40,
        duration: 90,
      },
      {
        id: 3,
        name: 'Data Loading & Protection Practice Test',
        questionsCount: 35,
        duration: 75,
      },
    ],
  },
  'SnowPro Specialty: Gen AI': {
    name: 'SnowPro® Specialty: Gen AI',
    provider: 'Snowflake',
    description: 'The SnowPro® Specialty: Gen AI Certification Exam will validate specialized knowledge, skills, and best practices used to leverage Gen AI methodologies in Snowflake including key concepts, features, and programming constructs.',
    overview: {
      examVersion: 'GES-C01',
      totalQuestions: 55,
      questionTypes: 'Multiple Select, Multiple Choice, Interactive',
      timeLimit: '85 minutes',
      languages: 'English',
      registrationFee: '$225 USD (India: $180 USD)',
      passingScore: '750+ (Scaled Scoring 0-1000)',
      prerequisites: 'SnowPro Core Certification or SnowPro Associate: Platform Certification',
      deliveryOptions: ['Online Proctoring', 'Onsite Testing Centers'],
      domains: [
        { name: 'Snowflake for Gen AI Overview', weight: '26%' },
        { name: 'Snowflake Gen AI & LLM Functions', weight: '40%' },
        { name: 'Snowflake Gen AI Governance', weight: '22%' },
        { name: 'Snowflake Document AI', weight: '12%' },
      ],
      recommendedResources: [
        {
          title: 'Official Snowflake Documentation',
          url: 'https://docs.snowflake.com/en/guides-overview-ai-features',
          type: 'documentation',
        },
        {
          title: 'SnowPro Gen AI Study Guide',
          url: 'https://www.snowflake.com/wp-content/uploads/2024/11/standard_genai_datasheet_24J23.pdf',
          type: 'pdf',
        },
        {
          title: 'Medium Blog: How I Passed the SnowPro Specialty Gen AI Certification',
          url: 'https://cristian-70480.medium.com/how-i-passed-the-snowpro-specialty-gen-ai-certification-exam-80307d7786a5',
          type: 'article',
        },
        {
          title: 'YouTube Tutorial',
          url: 'https://youtu.be/9HsQX_vigYM?si=Gj1QHlqEmG5VxJdD',
          type: 'video',
        },
        {
          title: 'Udemy Practice Tests',
          url: 'https://www.udemy.com/course/practice-tests-for-the-snowpro-gen-ai-specialist-exam-j/',
          type: 'course',
        },
      ],
    },
    quizzes: [
      {
        id: 1,
        category: 'Snowflake Cortex',
        question: 'What are the key principles behind Snowflake AI Features design?',
        options: [
          'Data is shared with other customers for better model training',
          'Full security, data privacy, and control with RBAC',
          'Models are trained using customer data in public environments',
          'All AI models run outside Snowflake security perimeter',
        ],
        correct_answer: 'Full security, data privacy, and control with RBAC',
        explanation:
          'Snowflake AI Features follow three key principles: Full security (models run inside Snowflake perimeter), Data privacy (customer data not used for training other models), and Control (RBAC for access control).',
      },
      {
        id: 2,
        category: 'Cortex LLM Functions',
        question: 'Which function is used to generate vector embeddings for text data in Snowflake Cortex?',
        options: [
          'SNOWFLAKE.CORTEX.COMPLETE',
          'SNOWFLAKE.CORTEX.EMBED_TEXT',
          'SNOWFLAKE.CORTEX.SUMMARIZE',
          'SNOWFLAKE.CORTEX.TRANSLATE',
        ],
        correct_answer: 'SNOWFLAKE.CORTEX.EMBED_TEXT',
        explanation:
          'The SNOWFLAKE.CORTEX.EMBED_TEXT function is used to generate vector embeddings for text data, which can be used for semantic search, similarity comparisons, and other vector-based operations.',
      },
      {
        id: 3,
        category: 'Cortex Search',
        question: 'What does Cortex Search Service provide for RAG applications?',
        options: [
          'Only keyword-based search capabilities',
          'Hybrid search with both vector and keyword search',
          'Manual index management without automation',
          'No support for multilingual content',
        ],
        correct_answer: 'Hybrid search with both vector and keyword search',
        explanation:
          'Cortex Search Service is designed to provide a hybrid search engine (vector + keyword) on text data, handling embedding, infrastructure maintenance, and search parameter tuning automatically for RAG applications.',
      },
      {
        id: 4,
        category: 'Document AI',
        question: 'What is the maximum file size for documents processed by AI_PARSE_DOCUMENT?',
        options: ['10 MB', '50 MB', '100 MB', '500 MB'],
        correct_answer: '100 MB',
        explanation:
          'The AI_PARSE_DOCUMENT function has a maximum file size limit of 100 MB and can handle up to 300 pages per document.',
      },
      {
        id: 5,
        category: 'Model Registry',
        question: 'Which privilege is required to log a custom model into the Model Registry?',
        options: [
          'CREATE EXTERNAL AGENT',
          'CREATE MODEL',
          'USAGE privilege on CORTEX_MODEL_ROLE',
          'GRANT ROLE SNOWFLAKE.CORTEX_USER',
        ],
        correct_answer: 'CREATE MODEL',
        explanation: 'The CREATE MODEL privilege is required to log and register custom models in the Snowflake Model Registry.',
      },
      {
        id: 6,
        category: 'Cortex Analyst',
        question: 'What is the purpose of dimensions in a Cortex Analyst semantic model?',
        options: [
          'To store numerical values only',
          'To define categorical data with optional synonyms for natural language understanding',
          'To set the warehouse size for queries',
          'To configure security policies',
        ],
        correct_answer: 'To define categorical data with optional synonyms for natural language understanding',
        explanation:
          'Dimensions in Cortex Analyst semantic models define categorical data (like state, product_category) and can include synonyms to map business terms to technical column names, improving natural language understanding.',
      },
      {
        id: 7,
        category: 'Vector Functions',
        question: 'What is the purpose of VECTOR_COSINE_SIMILARITY function?',
        options: [
          'To store embedding data',
          'To measure similarity between two vectors using cosine distance',
          'To create new embeddings',
          'To filter vector results',
        ],
        correct_answer: 'To measure similarity between two vectors using cosine distance',
        explanation:
          'VECTOR_COSINE_SIMILARITY computes the cosine similarity between two vectors, returning a value between -1 and 1, where 1 indicates identical direction.',
      },
      {
        id: 8,
        category: 'Access Control',
        question:
          'How can you restrict LLM access to only specific models for certain roles in Snowflake Cortex?',
        options: [
          'Using CORTEX_MODELS_ALLOWLIST parameter at account level',
          'Using SNOWFLAKE.CORTEX_MODEL_ROLE-[MODEL_NAME] roles and custom policies',
          'Using RBAC with SNOWFLAKE.CORTEX_USER role',
          'All of the above',
        ],
        correct_answer: 'All of the above',
        explanation:
          'Snowflake provides multiple mechanisms for access control: account-level allowlist, model-specific roles, and RBAC policies can all be combined to create fine-grained access control strategies.',
      },
      {
        id: 9,
        category: 'Cortex Copilot',
        question: 'How does Snowflake Copilot handle sensitive data like PII when generating SQL?',
        options: [
          'Transmits sampled PII to external LLMs',
          'Uses only metadata (table, column names, data types) without accessing raw data',
          'Directly accesses raw data within tables',
          'Requires explicit column-level grants for data access',
        ],
        correct_answer: 'Uses only metadata (table, column names, data types) without accessing raw data',
        explanation:
          'Snowflake Copilot is a fine-tuned model running securely inside Cortex that uses only metadata (database/schema/table/column names and data types), ensuring data remains within governance boundary and respects RBAC.',
      },
      {
        id: 10,
        category: 'Cost Management',
        question: 'How are costs calculated for Snowflake Cortex LLM functions?',
        options: [
          'Per query execution',
          'Per token usage by the model',
          'Per warehouse size used',
          'Per number of users',
        ],
        correct_answer: 'Per token usage by the model',
        explanation:
          'Snowflake Cortex LLM functions billing is based on token usage - both input and output tokens are counted and billed according to the specific model used.',
      },
      {
        id: 11,
        category: 'Cortex Functions',
        question: 'A data application developer is configuring inference with a newly fine-tuned llama3.1-70b model via AI_COMPLETE and expects structured JSON output. Which of the following statements accurately describes how to configure this inference?',
        options: [
          'Basic LLM configuration without structured output support',
          'Using response_format parameter with JSON schema validation',
          'Structured outputs only available for specific models',
          'No limitations on JSON schema complexity',
          'Multiple model support with consistent structured output',
        ],
        correct_answer: 'Using response_format parameter with JSON schema validation',
        explanation: 'Snowflake Cortex supports structured outputs through the response_format parameter, allowing configuration of JSON schemas for inference results.',
      },
      {
        id: 12,
        category: 'Data Governance',
        question: 'A data analyst is using Snowflake Copilot in Snowsight to generate SQL queries for a new dataset containing customer PII. How does Snowflake Copilot operate with respect to data access and governance?',
        options: [
          'Copilot transmits sampled PII data to external LLMs',
          'Copilot accesses raw data directly from customer tables',
          'Copilot runs securely inside Cortex and uses only metadata without accessing raw data',
          'Copilot requires explicit column-level grants for data access',
          'Copilot stores PII data temporarily for performance optimization',
        ],
        correct_answer: 'Copilot runs securely inside Cortex and uses only metadata without accessing raw data',
        explanation: 'Snowflake Copilot is powered by a fine-tuned model running inside Cortex, leveraging only metadata (database/schema/table/column names and data types), ensuring data remains within Snowflake\'s governance boundary and respects RBAC.',
      },
      {
        id: 13,
        category: 'Model Registry',
        question: 'A data engineering team wants to deploy a proprietary PyCaret classification model for inference within Snowpark Container Services (SPCS). Which is a correct step in registering this custom model in the Snowflake Model Registry?',
        options: [
          'Register the model directly without serialization',
          'Convert the model to a specific format before registration',
          'Create a compute pool before model registration',
          'Use Model Registry with proper metadata and model artifacts',
          'Store model weights in a separate location',
        ],
        correct_answer: 'Use Model Registry with proper metadata and model artifacts',
        explanation: 'The Snowflake Model Registry requires proper model artifacts and metadata to register custom models for deployment within SPCS.',
      },
      {
        id: 14,
        category: 'Cost Optimization',
        question: 'A data scientist is leveraging Snowflake Cortex LLM functions to process extensive text data. To manage their budget effectively, which statement accurately describes how costs are incurred?',
        options: [
          'Costs are based on the number of queries executed',
          'Costs are calculated based on token usage by each function',
          'Costs depend on the warehouse size used',
          'Costs are fixed regardless of data volume',
          'Costs are per user account per month',
        ],
        correct_answer: 'Costs are calculated based on token usage by each function',
        explanation: 'Snowflake Cortex LLM functions are billed based on token consumption. Both input and output tokens are counted, with costs varying by model and usage volume.',
      },
      {
        id: 15,
        category: 'Structured Outputs',
        question: 'A Snowflake developer is tasked with enhancing a daily data pipeline to extract structured information from system event descriptions into strict JSON format. Which approach best ensures structured JSON output with defined fields?',
        options: [
          'Use COMPLETE without structured output specification',
          'Use COMPLETE with response_format for JSON schema definition',
          'Use EXTRACT_ANSWER with manual JSON parsing',
          'Use TRY_COMPLETE for error handling of extraction',
          'Implement post-processing for JSON structure validation',
        ],
        correct_answer: 'Use COMPLETE with response_format for JSON schema definition',
        explanation: 'COMPLETE with response_format parameter is the most effective approach to guarantee structured JSON output with defined fields and data types, ensuring data quality for downstream analytics.',
      },
      {
        id: 16,
        category: 'Access Control',
        question: 'A Snowflake administrator needs to implement granular access control for LLMs with an account-level allowlist for select models and a specific team requiring additional model access. Which approach correctly establishes this strategy?',
        options: [
          'Configure CORTEX_MODELS_ALLOWLIST only at account level',
          'Use only SNOWFLAKE.CORTEX_USER role for all users',
          'Combine CORTEX_MODELS_ALLOWLIST with model-specific CORTEX_MODEL_ROLE grants',
          'Grant all Cortex models to all users',
          'Restrict access through warehouse-level policies',
        ],
        correct_answer: 'Combine CORTEX_MODELS_ALLOWLIST with model-specific CORTEX_MODEL_ROLE grants',
        explanation: 'Proper LLM access control combines account-level allowlist configuration with model-specific role grants, enabling both broad access and targeted permissions.',
      },
      {
        id: 17,
        category: 'Vector Embeddings',
        question: 'A data scientist needs to generate vector embeddings for product descriptions using the e5-base-v2 model. Which SQL function is appropriate for this task?',
        options: [
          'SNOWFLAKE.CORTEX.COMPLETE',
          'SNOWFLAKE.CORTEX.EMBED_TEXT_768',
          'SNOWFLAKE.CORTEX.SUMMARIZE',
          'SNOWFLAKE.CORTEX.TRANSLATE',
          'SNOWFLAKE.CORTEX.CLASSIFY_TEXT',
        ],
        correct_answer: 'SNOWFLAKE.CORTEX.EMBED_TEXT_768',
        explanation: 'The EMBED_TEXT_768 function generates vector embeddings for text data, suitable for semantic search, similarity comparisons, and RAG applications.',
      },
      {
        id: 18,
        category: 'Document AI',
        question: 'A data science team is fine-tuning a Snowflake Document AI model to improve extraction accuracy for complex legal documents. Which practice should the team follow to most effectively improve accuracy?',
        options: [
          'Prioritize extensive prompt engineering with intricate logic',
          'Limit training data exclusively to perfectly formatted documents',
          'Set temperature parameter to high value for creative interpretations',
          'Ensure training dataset includes diverse documents with expert annotations',
          'Use only automated annotation without human review',
        ],
        correct_answer: 'Ensure training dataset includes diverse documents with expert annotations',
        explanation: 'Fine-tuning effectiveness improves with diverse training datasets representing various document layouts and explicit expert annotations, helping the model learn complex extraction patterns.',
      },
      {
        id: 19,
        category: 'Cortex Analyst',
        question: 'A data engineering team is deploying Snowflake Cortex Analyst for natural language queries over structured sales data. Which practice should be implemented to maximize accuracy?',
        options: [
          'Include all available tables and columns in the semantic model',
          'Define semantic models with only the most common columns',
          'Create a semantic model with relevant dimensions, facts, and synonyms for improved natural language understanding',
          'Use raw table names without business-friendly aliases',
          'Avoid defining relationships between tables',
        ],
        correct_answer: 'Create a semantic model with relevant dimensions, facts, and synonyms for improved natural language understanding',
        explanation: 'Effective Cortex Analyst deployment requires semantic models with well-defined dimensions, facts, and synonyms that map business terms to technical columns, improving natural language understanding.',
      },
      {
        id: 20,
        category: 'Document Processing',
        question: 'A data engineering team implementing Document AI solution needs to execute the PREDICT method on staged vendor invoices. Which privilege is essential for successful execution?',
        options: [
          'USAGE privilege on the Document AI model',
          'USAGE privilege on the invoice_processing_schema',
          'READ privilege on the raw_invoices_stage',
          'All of the above',
          'Only CREATE privilege on the schema',
        ],
        correct_answer: 'All of the above',
        explanation: 'Document AI PREDICT method requires multiple privileges: USAGE on the model, USAGE on the schema, and READ on the stage, along with the SNOWFLAKE.DOCUMENT_INTELLIGENCE_CREATOR role.',
      },
      {
        id: 21,
        category: 'Vector Functions',
        question: 'A data engineer is building a product recommendation system using VECTOR_COSINE_SIMILARITY on pre-computed embeddings. Which statement is TRUE regarding the VECTOR data type?',
        options: [
          'Maximum dimensions supported is 8,192',
          'Maximum dimensions supported is 65,536',
          'VECTOR can be used as primary key in regular tables',
          'VECTOR data type cannot be indexed',
          'All dimensions must be identical across all vectors in a column',
        ],
        correct_answer: 'Maximum dimensions supported is 65,536',
        explanation: 'Snowflake VECTOR data type supports up to 65,536 dimensions. VECTOR_COSINE_SIMILARITY returns values between -1 and 1, indicating the similarity of two vectors.',
      },
      {
        id: 22,
        category: 'Access Control',
        question: 'An administrator has configured CORTEX_MODELS_ALLOWLIST to permit only mistral-large model. A user with SNOWFLAKE.CORTEX_USER role attempts to execute COMPLETE queries with various models. Which queries will execute successfully?',
        options: [
          'Only queries using mistral-large model',
          'Only queries using llama3.1-70b model',
          'Queries using any Cortex model',
          'All COMPLETE queries regardless of model',
          'No queries will execute due to role conflicts',
        ],
        correct_answer: 'Only queries using mistral-large model',
        explanation: 'When CORTEX_MODELS_ALLOWLIST is configured, only models in the allowlist are permitted, regardless of individual role grants. This provides account-level governance.',
      },
      {
        id: 23,
        category: 'Text Processing',
        question: 'A financial institution wants to process call transcripts: summarize lengthy calls (up to 20,000 tokens) and classify sentiment. Which Cortex functions are most appropriate?',
        options: [
          'Use SUMMARIZE for both tasks',
          'Use COMPLETE for both tasks',
          'Use SUMMARIZE for transcripts and COMPLETE with response_format for sentiment classification',
          'Use TRANSLATE for both tasks',
          'Manual processing without Cortex functions',
        ],
        correct_answer: 'Use SUMMARIZE for transcripts and COMPLETE with response_format for sentiment classification',
        explanation: 'SUMMARIZE efficiently handles long transcripts, while COMPLETE with structured outputs (response_format) is ideal for classification tasks like sentiment analysis.',
      },
      {
        id: 24,
        category: 'Performance Optimization',
        question: 'An engineering team is building an analytics pipeline comparing 512-dimensional customer activity vectors using VECTOR_L2_DISTANCE. Which best practice should be considered?',
        options: [
          'Always use the smallest warehouse size for cost savings',
          'Use X-Large or larger warehouses for all vector operations',
          'Use appropriately-sized warehouses following Cortex function recommendations',
          'Warehouse size has no impact on vector similarity performance',
          'Always use auto-scaling for vector queries',
        ],
        correct_answer: 'Use appropriately-sized warehouses following Cortex function recommendations',
        explanation: 'Snowflake recommends using appropriately-sized warehouses (typically MEDIUM or smaller, not oversized) for Cortex AI and vector similarity functions for optimal performance and cost efficiency.',
      },
      {
        id: 25,
        category: 'Cost and Governance',
        question: 'An operations manager is monitoring Cortex Analyst REST API deployment for cost and compliance. Which statement correctly describes cost calculation?',
        options: [
          'Credit consumption is flat rate per API call',
          'Cost is based on tokens processed by underlying LLMs',
          'Cost is 67 Credits per 1,000 messages processed',
          'Cost varies only by user count',
          'All Cortex Analyst usage is free with subscriptions',
        ],
        correct_answer: 'Cost is based on tokens processed by underlying LLMs',
        explanation: 'Cortex Analyst cost is primarily based on token usage by underlying LLMs. More complex natural language queries lead to higher token usage and costs.',
      },
      {
        id: 26,
        category: 'Conversational AI',
        question: 'A developer is using SNOWFLAKE.CORTEX.COMPLETE for a multi-turn conversation app. They want creative responses, controlled length, JSON structure, and safety filtering. Which parameter is critical for JSON structure?',
        options: [
          'temperature parameter',
          'max_tokens parameter',
          'response_format parameter',
          'top_p parameter',
          'stop_sequences parameter',
        ],
        correct_answer: 'response_format parameter',
        explanation: 'The response_format parameter ensures structured JSON output with defined schema. Temperature controls creativity, max_tokens controls length, and messages parameter maintains conversation history.',
      },
      {
        id: 27,
        category: 'RAG Applications',
        question: 'A developer is building a RAG pipeline using Cortex Search and COMPLETE function. Which is crucial for effective multi-turn RAG chatbots?',
        options: [
          'Query Cortex Search and LLM in single SQL statement',
          'Pass all previous user prompts and model responses in messages parameter',
          'Store conversation history in separate Snowflake tables',
          'Use TRY_COMPLETE to handle retrieval failures',
          'Concatenate retrieved context directly without formatting',
        ],
        correct_answer: 'Pass all previous user prompts and model responses in messages parameter',
        explanation: 'For multi-turn RAG chatbots, maintaining conversation context by passing previous prompts and responses in the messages parameter is crucial for coherent and contextual responses.',
      },
      {
        id: 28,
        category: 'Text Chunking',
        question: 'A team is preparing unstructured data for a RAG application involving text extraction, chunking, embedding, and Cortex Search indexing. Where does SNOWFLAKE.CORTEX.SPLIT_TEXT_RECURSIVE_CHARACTER fit in the pipeline?',
        options: [
          'Post-processing step for LLM-generated responses',
          'Replaces manual text chunking entirely',
          'Input for text embedding functions to convert chunks into vectors',
          'Automatically detects factual inconsistencies',
          'Applied after embedding for semantic indexing',
        ],
        correct_answer: 'Input for text embedding functions to convert chunks into vectors',
        explanation: 'SPLIT_TEXT_RECURSIVE_CHARACTER divides large documents into smaller chunks that serve as direct input for embedding functions, converting them into vector representations for semantic indexing in Cortex Search.',
      },
    ],
    dumps: [
      {
        id: 1,
        question: 'A Snowflake developer wants to configure inference with a newly fine-tuned llama3.1-70b model via AI_COMPLETE and expects a structured JSON output. Which statements accurately describe how to configure this inference and potential limitations within Snowflake Cortex?',
        options: [
          'Option A - Basic LLM configuration without structured output support',
          'Option B - Using response_format parameter with JSON schema validation',
          'Option C - Structured outputs only available for specific models',
          'Option D - No limitations on JSON schema complexity',
          'Option E - Multiple model support with consistent structured output',
        ],
        correct_answer: 'Option B - Using response_format parameter with JSON schema validation',
        explanation: 'Snowflake Cortex supports structured outputs through the response_format parameter, allowing configuration of JSON schemas for inference results.',
      },
      {
        id: 2,
        question: 'A data analyst is using Snowflake Copilot in Snowsight to generate SQL queries for a new dataset containing customer PII. Which statements accurately describe how Snowflake Copilot operates with respect to data access, governance, and model interaction?',
        options: [
          'Copilot transmits sampled PII data to external LLMs',
          'Copilot accesses raw data directly from customer tables',
          'Copilot runs securely inside Cortex and uses only metadata without accessing raw data',
          'Copilot requires explicit column-level grants for data access',
          'Copilot respects RBAC policies within Snowflake governance boundary',
        ],
        correct_answer: 'Copilot runs securely inside Cortex and uses only metadata without accessing raw data',
        explanation: 'Snowflake Copilot is powered by a fine-tuned model running inside Cortex, leveraging only metadata (database/schema/table/column names and data types), ensuring data remains within Snowflake\'s governance boundary and respects RBAC.',
      },
      {
        id: 3,
        question: 'A data engineering team wants to deploy a proprietary PyCaret classification model saved as pycaret_best_model.pkl for inference within Snowpark Container Services (SPCS). They need to register this custom model in the Snowflake Model Registry. Which of the following is a correct and essential step in this process?',
        options: [
          'Register the model directly without serialization',
          'Convert the model to a specific format before registration',
          'Create a compute pool before model registration',
          'Use Model Registry with proper metadata and model artifacts',
          'Store model weights in a separate location',
        ],
        correct_answer: 'Use Model Registry with proper metadata and model artifacts',
        explanation: 'The Snowflake Model Registry requires proper model artifacts and metadata to register custom models for deployment within SPCS.',
      },
      {
        id: 4,
        question: 'A data scientist is leveraging various Snowflake Cortex LLM functions to process extensive text data for an application. To effectively manage their budget, they need a clear understanding of how costs are incurred for each specific function. Which statements accurately describe how costs are calculated for Snowflake Cortex LLM functions, with a particular focus on token usage?',
        options: [
          'Costs are based on query execution time only',
          'Costs are calculated by token usage (input + output tokens)',
          'Different models have different token pricing rates',
          'Token counting includes both prompt and completion tokens',
          'All functions have uniform pricing regardless of complexity',
        ],
        correct_answer: 'Costs are calculated by token usage (input + output tokens)',
        explanation: 'Snowflake Cortex LLM functions are billed based on token usage, with both input and output tokens counted and priced according to the specific model used.',
      },
      {
        id: 5,
        question: 'A Snowflake developer is tasked with enhancing a daily data pipeline to extract structured information from raw text descriptions of system events, specifically extracting event_name (string) and severity_level (string, restricted to "low", "medium", "high", "critical"), with the output as a strictly formatted JSON object. Which statements are correct regarding AI_COMPLETE with structured outputs in a data pipeline?',
        options: [
          'Using TRY_COMPLETE allows graceful handling of model failures by returning NULL',
          'The response_format correctly defines expected JSON structure using enum for restricted values',
          'JSON schema complexity does not impact token processing and billing',
          'Temperature 0.7 is optimal for consistent and deterministic JSON outputs',
          'The additionalProperties field must be set to false in every schema node',
        ],
        correct_answer: 'The response_format correctly defines expected JSON structure using enum for restricted values',
        explanation: 'The response_format parameter in AI_COMPLETE allows defining JSON schemas with enum constraints for field value restrictions, ensuring structured outputs.',
      },
      {
        id: 6,
        question: 'A Snowflake administrator needs to implement a granular access control strategy for LLMs with an account-level allowlist while allowing a specific data science team exclusive access to the claude-3-5-sonnet model. Which set of commands would correctly establish this access control?',
        options: [
          'Using only account-level CORTEX_MODELS_ALLOWLIST parameter',
          'Combining account-level allowlist with role-specific model grants',
          'Using custom roles without Snowflake-provided Cortex roles',
          'Granting direct database access to specific models',
          'Using database-level permissions for model access',
        ],
        correct_answer: 'Combining account-level allowlist with role-specific model grants',
        explanation: 'Granular access control requires using CORTEX_MODELS_ALLOWLIST at the account level combined with SNOWFLAKE.CORTEX_MODEL_ROLE-[MODEL_NAME] role grants for team-specific access.',
      },
      {
        id: 7,
        question: 'A data scientist needs to generate vector embeddings for product descriptions stored in the PRODUCT_DESCRIPTION column using the e5-base-v2 model. Which statements correctly describe using the SNOWFLAKE.CORTEX.EMBED_TEXT function?',
        options: [
          'The function returns embeddings as VARIANT data type',
          'The function returns embeddings as VECTOR data type with specified dimensions',
          'The function supports batch processing of multiple rows',
          'The e5-base-v2 model produces 768-dimensional vectors',
          'The function requires pre-computed embeddings as input',
        ],
        correct_answer: 'The function returns embeddings as VECTOR data type with specified dimensions',
        explanation: 'SNOWFLAKE.CORTEX.EMBED_TEXT returns embeddings as VECTOR data type with dimension size determined by the model (768 for e5-base-v2).',
      },
      {
        id: 8,
        question: 'A data science team is fine-tuning a Snowflake Document AI model to improve extraction accuracy of specific fields from complex legal documents. They are observing low confidence scores and inconsistent value keys for extracted entities. Which two practices should the team follow to most effectively improve the model\'s extraction accuracy?',
        options: [
          'Prioritize extensive prompt engineering with intricate logic',
          'Limit training data to perfectly formatted and clean documents only',
          'Ensure training dataset includes diverse documents with various layouts and explicit NULL examples',
          'Set temperature to 0.7 for creative interpretations',
          'Actively involve subject matter experts in annotation and evaluation',
        ],
        correct_answer: 'Ensure training dataset includes diverse documents with various layouts and explicit NULL examples',
        explanation: 'Effective Document AI fine-tuning requires diverse training data representing various layouts and variations. Subject matter expert involvement is critical for defining data values and evaluating model effectiveness.',
      },
      {
        id: 9,
        question: 'A data engineering team is deploying Snowflake Cortex Analyst over a SALES_DATA table with columns like PRODUCT_CATEGORY, SALES_AMOUNT, and ORDER_DATE. To maximize accuracy and trustworthiness of responses, which practices should be implemented when configuring their semantic model?',
        options: [
          'Include all available tables and columns for flexibility',
          'Define clear relationships and dimensions with business synonyms',
          'Include detailed documentation for each semantic element',
          'Use complex nested hierarchies in dimensions',
          'Validate semantic model against expected business queries',
        ],
        correct_answer: 'Define clear relationships and dimensions with business synonyms',
        explanation: 'Cortex Analyst semantic models should include only essential tables and columns with clear definitions. Dimensions should have synonyms to map business terms to technical column names.',
      },
      {
        id: 10,
        question: 'A data engineering team is implementing a Document AI solution to automate extraction of vendor invoice details from documents in a stage. The invoice_pipeline role needs to execute the !PREDICT method. Which USAGE privileges are essential for successful execution, assuming SNOWFLAKE.DOCUMENT_INTELLIGENCE_CREATOR role is already granted?',
        options: [
          'USAGE on the Document AI model only',
          'USAGE on model, READ on stage, and SNOWFLAKE.DOCUMENT_INTELLIGENCE_CREATOR role',
          'ADMIN privileges on the database',
          'Only SNOWFLAKE.DOCUMENT_INTELLIGENCE_CREATOR role is sufficient',
          'USAGE on stage and CREATE on schema',
        ],
        correct_answer: 'USAGE on model, READ on stage, and SNOWFLAKE.DOCUMENT_INTELLIGENCE_CREATOR role',
        explanation: 'Document AI !PREDICT requires: USAGE privilege on the Document AI model, READ privilege on the stage containing documents, and the SNOWFLAKE.DOCUMENT_INTELLIGENCE_CREATOR role.',
      },
      {
        id: 11,
        question: 'A data engineer is tasked with implementing a product recommendation system using VECTOR_COSINE_SIMILARITY with pre-computed product embeddings. Which statements are TRUE regarding VECTOR_COSINE_SIMILARITY and Snowflake\'s VECTOR data type?',
        options: [
          'The maximum dimension supported is 128',
          'The maximum dimension supported is 65,536',
          'VECTOR columns can be defined without specifying dimensions',
          'Direct comparison operators like = and != can be used on VECTOR columns',
          'VECTOR_COSINE_SIMILARITY values range from -1 to 1',
        ],
        correct_answer: 'The maximum dimension supported is 65,536',
        explanation: 'Snowflake VECTOR data type supports up to 65,536 dimensions. VECTOR_COSINE_SIMILARITY returns values between -1 and 1, indicating similarity direction.',
      },
      {
        id: 12,
        question: 'An administrator has configured CORTEX_MODELS_ALLOWLIST to only permit the mistral-large model at account level. A user with PUBLIC role, granted both SNOWFLAKE.CORTEX_USER and SNOWFLAKE."CORTEX-MODEL-ROLE-LLAMA3.1-70B" roles attempts to execute several COMPLETE queries. Which queries will successfully execute?',
        options: [
          'Queries using mistral-large model',
          'Queries using llama3.1-70b model',
          'Queries using any model in the allowlist',
          'Only queries with TRY_COMPLETE wrapper',
          'No queries will execute due to role conflicts',
        ],
        correct_answer: 'Queries using mistral-large model',
        explanation: 'When CORTEX_MODELS_ALLOWLIST is configured at account level, only models in the allowlist are permitted, regardless of individual role grants.',
      },
      {
        id: 13,
        question: 'A financial institution wants to develop a Snowflake pipeline to process call transcripts, performing two tasks: summarize lengthy technical support calls (up to 20,000 tokens) into actionable insights, and classify sentiment as positive, neutral, or negative. Which combination of Snowflake Cortex functions and prompt engineering is most appropriate?',
        options: [
          'Use SUMMARIZE for summarization and TRANSLATE for sentiment',
          'Use COMPLETE with careful prompts for both summarization and sentiment classification',
          'Use SUMMARIZE for transcripts and COMPLETE with structured outputs for sentiment',
          'Use EXTRACT_ANSWER for both tasks',
          'Manual processing without Cortex functions',
        ],
        correct_answer: 'Use SUMMARIZE for transcripts and COMPLETE with structured outputs for sentiment',
        explanation: 'SUMMARIZE efficiently handles long transcripts (handles 20,000+ tokens), while COMPLETE with structured outputs (response_format) is ideal for classification tasks like sentiment analysis.',
      },
      {
        id: 14,
        question: 'An engineering team is building an analytics pipeline where daily customer activity vectors (512 dimensions) are compared using VECTOR_L2_DISTANCE, orchestrated with Snowflake Tasks. Which operational best practice should be considered for vector processing at scale?',
        options: [
          'Use the smallest warehouse size for cost savings',
          'Use X-Large or larger warehouses for all vector operations',
          'Warehouse size recommendations for Cortex functions also apply to vector similarity functions',
          'Warehouse size has no impact on vector performance',
          'Always use auto-scaling for vector queries',
        ],
        correct_answer: 'Warehouse size recommendations for Cortex functions also apply to vector similarity functions',
        explanation: 'Snowflake recommends using appropriately-sized warehouses (typically MEDIUM or smaller, not oversized) for Cortex AI functions, including vector similarity functions, for optimal performance and cost.',
      },
      {
        id: 15,
        question: 'An operations manager is monitoring cost and compliance for a Cortex Analyst deployment via REST API. Which statements correctly describe Cortex Analyst cost and governance aspects?',
        options: [
          'Credit consumption is based on tokens processed by LLMs',
          'Credit usage is 67 Credits per 1,000 messages processed',
          'The CORTEX.ANALYST_QUERIES view tracks requests including generated SQL',
          'The QUERY_ACCELERATION_STATISTICS view provides REST API usage details',
          'Azure OpenAI models ensure data remains within Snowflake governance boundary',
        ],
        correct_answer: 'Credit consumption is based on tokens processed by LLMs',
        explanation: 'Cortex Analyst cost is primarily based on token usage by underlying LLMs. More complex queries lead to higher token usage and costs.',
      },
      {
        id: 16,
        question: 'A data application developer is using SNOWFLAKE.CORTEX.COMPLETE for a multi-turn conversational application. They want responses to be creative, not excessively long, adhere to JSON structure, and be filtered for safety. Which options have the most impact?',
        options: [
          'Setting temperature to 0 for deterministic responses',
          'Including a max_tokens parameter for response length control',
          'Using response_format parameter for JSON structure adherence',
          'Setting temperature to high values for creative responses',
          'Passing previous prompts and responses in the messages parameter',
        ],
        correct_answer: 'Using response_format parameter for JSON structure adherence',
        explanation: 'The response_format parameter ensures structured JSON output. Temperature controls creativity (higher = more creative), max_tokens controls length, and messages parameter maintains conversation history.',
      },
      {
        id: 17,
        question: 'A data engineering team is setting up an automated pipeline to process call center transcripts, extracting customer name, primary issue, and proposed resolution into structured JSON format using a SQL task. Which approach would most effectively extract this information and guarantee structured JSON output?',
        options: [
          'Use COMPLETE without structured output specification',
          'Use COMPLETE with response_format for JSON schema definition',
          'Use EXTRACT_ANSWER with manual JSON parsing',
          'Use TRY_COMPLETE for error handling of extraction failures',
          'Implement post-processing for JSON structure validation',
        ],
        correct_answer: 'Use COMPLETE with response_format for JSON schema definition',
        explanation: 'COMPLETE with response_format parameter is the most effective approach to guarantee structured JSON output with defined fields and data types.',
      },
      {
        id: 18,
        question: 'A development team is creating a search application using Cortex Search with snowflake-arctic-embed-l-v2.0 embedding model. After loading 10 million rows (500 tokens each), they observe significant EMBED_TEXT_TOKENS cost. Which two strategies should be prioritized to minimize embedding costs?',
        options: [
          'Switch to smaller embedding models',
          'Reduce the number of documents indexed',
          'Implement incremental updates only for new documents',
          'Use batch processing to optimize token consumption',
          'Compress documents before embedding',
        ],
        correct_answer: 'Implement incremental updates only for new documents',
        explanation: 'To minimize embedding costs, prioritize: 1) Incremental updates (avoid re-embedding existing documents), 2) Batch processing to optimize token usage per operation.',
      },
      {
        id: 19,
        question: 'A data application developer is building a Streamlit chat application using a RAG pattern with Cortex Search Service for retrieval and an LLM for responses. Which practices are crucial when integrating Cortex Search with COMPLETE for a RAG chatbot?',
        options: [
          'Pass all previous prompts and responses in the messages parameter',
          'Query Cortex Search and LLM within a single SQL statement',
          'Use TRY_COMPLETE to handle retrieval failures',
          'Concatenate retrieved context directly with user prompt',
          'Store conversation history in Snowflake tables',
        ],
        correct_answer: 'Pass all previous prompts and responses in the messages parameter',
        explanation: 'For multi-turn RAG chatbots, maintaining conversation context by passing previous prompts and responses in the messages parameter is crucial for coherent responses.',
      },
      {
        id: 20,
        question: 'An AI developer is building a Snowflake pipeline to prepare unstructured data for a RAG application, involving text extraction, splitting into chunks, generating embeddings, and indexing for Cortex Search. What is the typical operational placement of SNOWFLAKE.CORTEX.SPLIT_TEXT_RECURSIVE_CHARACTER within this pipeline?',
        options: [
          'A post-processing step for breaking down LLM-generated responses',
          'Replaces the need for manual text chunking',
          'Input for text embedding functions to convert chunks into vectors',
          'Automatically detects and corrects factual inconsistencies',
          'Applied after embedding functions for semantic indexing',
        ],
        correct_answer: 'Input for text embedding functions to convert chunks into vectors',
        explanation: 'SPLIT_TEXT_RECURSIVE_CHARACTER divides large text documents into smaller chunks that serve as direct input for embedding functions, converting them into vector representations for semantic indexing in Cortex Search.',
      },
      {
        id: 21,
        question: 'A data science team is using SNOWFLAKE.CORTEX.CLASSIFY_TEXT to categorize product reviews into detailed segments like "Bug Report - Critical", "Feature Request - UI/UX", "General Praise", or "Query - Billing Issue". For highly nuanced reviews, they find the initial classifications lack precision and are concerned about compute costs. Which strategies should they employ to optimize classification accuracy and manage costs effectively?',
        options: [
          'Augment categories with explicit descriptions and examples to improve accuracy, understanding this increases input token costs',
          'Include a concise task_description in the options argument to guide the model for complex scenarios',
          'Pre-process input text to remove stop words and punctuation to reduce token costs',
          'Set temperature to 0.0 in CLASSIFY_TEXT to ensure deterministic and cheaper inference',
          'All of the above strategies should be combined',
        ],
        correct_answer: 'Augment categories with explicit descriptions and examples to improve accuracy, understanding this increases input token costs',
        explanation: 'Adding detailed category descriptions and examples improves classification accuracy for nuanced reviews, though it increases input tokens. Task descriptions and temperature settings are also useful but description augmentation is primary for precision.',
      },
      {
        id: 22,
        question: 'A Gen AI developer is deploying a customer support chatbot using SNOWFLAKE.CORTEX.COMPLETE and has enabled Cortex Guard for safety. When a user prompt causes the LLM to attempt generating prohibited content, what is the expected outcome?',
        options: [
          'The COMPLETE function raises a SQL exception with PROHIBITED_CONTENT error',
          'Returns a generic pre-defined filtered message like "Response filtered by Cortex Guard"',
          'The LLM automatically rephrase harmful content to comply with guidelines',
          'The account is temporarily locked until manual intervention',
          'Returns NULL value signifying no safe response could be generated',
        ],
        correct_answer: 'The COMPLETE function raises a SQL exception with PROHIBITED_CONTENT error',
        explanation: 'When Cortex Guard detects prohibited content, the COMPLETE function raises a SQL exception that the application must handle, rather than filtering or returning NULL.',
      },
      {
        id: 23,
        question: 'A data engineering team needs to configure their Snowflake environment for AI_PARSE_DOCUMENT and EMBED_TEXT_1024 with voyage-multilingual-2 model. These capabilities are only available via cross-region inference. What is the correct configuration action?',
        options: [
          'Set CORTEX_ENABLED_CROSS_REGION to CURRENT_REGION only',
          'Enable CORTEX_ENABLED_CROSS_REGION to ANY_REGION to access unavailable models automatically',
          'Manually specify the region parameter in each function call',
          'Use CORTEX_MODELS_ALLOWLIST to restrict to local models',
          'Deploy a separate Snowflake account in the target region',
        ],
        correct_answer: 'Enable CORTEX_ENABLED_CROSS_REGION to ANY_REGION to access unavailable models automatically',
        explanation: 'Setting CORTEX_ENABLED_CROSS_REGION to ANY_REGION allows Snowflake to automatically use cross-region inference for models and capabilities not available in the local region.',
      },
      {
        id: 24,
        question: 'An organization operating in AWS US West 2 region needs to process sensitive customer support tickets using Cortex LLM functions. What is a key data safety consideration when enabling CORTEX_ENABLED_CROSS_REGION?',
        options: [
          'It increases compute costs if cross-region model is more expensive',
          'User inputs and outputs are stored in cache in the remote region',
          'User inputs, prompts, and outputs are not stored or cached in the remote region',
          'Data is encrypted but keys are managed by third-party cloud providers',
          'Automatic replication happens without user consent',
        ],
        correct_answer: 'User inputs, prompts, and outputs are not stored or cached in the remote region',
        explanation: 'When enabling cross-region inference, Snowflake ensures that user inputs, prompts, and outputs are not stored or cached in the remote region, protecting data privacy and security.',
      },
      {
        id: 25,
        question: 'A Gen AI developer is using SNOWFLAKE.CORTEX.COMPLETE to generate concise summaries of legal documents. The LLM sometimes provides overly creative or off-topic responses. Which combination of techniques should be prioritized to improve factual accuracy?',
        options: [
          'Use "creative writer" persona with temperature 0.9 for diverse summaries',
          'Implement first principles thinking in prompt and set temperature to 0 for deterministic output',
          'Instruct the model to "think out loud" and set max_tokens to large value',
          'Provide task description on broad themes and set top_p to 0.5',
          'Rely solely on comprehensive list of stop sequences',
        ],
        correct_answer: 'Implement first principles thinking in prompt and set temperature to 0 for deterministic output',
        explanation: 'For legal document summarization, using first principles thinking in prompts combined with temperature set to 0 ensures deterministic, factually accurate output without creative hallucinations.',
      },
      {
        id: 26,
        question: 'A marketing analyst uses SNOWFLAKE.CORTEX.SENTIMENT function to gauge customer feedback sentiment. Which statement correctly describes the expected output format and interpretation of the sentiment_score?',
        options: [
          'Output is string "Positive" or "Negative", score close to 1 indicates strong positive',
          'Output is floating-point number between -1 and 1, where 1 is positive and -1 is negative',
          'Output is JSON object with "label" field, values around 0 indicate neutral',
          'Output is boolean (TRUE/FALSE) indicating if sentiment is positive',
          'Output is integer between 0 and 100, higher values indicate more positive',
        ],
        correct_answer: 'Output is floating-point number between -1 and 1, where 1 is positive and -1 is negative',
        explanation: 'The SENTIMENT function returns a floating-point score between -1 and 1, where 1 indicates strong positive sentiment, -1 indicates strong negative sentiment, and values near 0 indicate neutral sentiment.',
      },
      {
        id: 27,
        question: 'A data engineer is building a RAG pipeline that heavily relies on SNOWFLAKE.CORTEX.EMBED_TEXT_768 to process millions of documents daily. Which statements are true regarding cost and performance? (Select all that apply)',
        options: [
          'Billing is based on number of output tokens generated by the embedding model',
          'Use smaller virtual warehouse (MEDIUM or less) as larger ones do not improve performance',
          'The snowflake-arctic-embed model has 512 token context window and truncates longer texts',
          'Text should be split into chunks of no more than 512 tokens for optimal retrieval quality',
          'Fixed cost of 1.50 Credits per one million tokens processed',
        ],
        correct_answer: 'Use smaller virtual warehouse (MEDIUM or less) as larger ones do not improve performance',
        explanation: 'EMBED_TEXT_768 is billed based on input tokens (not output tokens), performs better with smaller warehouses, and the model supports 512 token context with truncation for longer texts.',
      },
      {
        id: 28,
        question: 'An enterprise is deploying a RAG application using Snowflake Cortex Search on a large dataset of customer support tickets. The operations team is concerned about managing compute costs and ensuring efficient hourly index refreshes. Which considerations are relevant for optimizing cost and performance of Cortex Search Service?',
        options: [
          'Use X-Large warehouse size for maximum index refresh performance',
          'Configure smaller dedicated warehouse (MEDIUM or smaller) for cost efficiency',
          'Set AUTO_REFRESH to FALSE to manually control refresh timing',
          'Use independent compute pool separate from regular query warehouse',
          'Schedule refreshes during off-peak hours to reduce concurrent query load',
        ],
        correct_answer: 'Configure smaller dedicated warehouse (MEDIUM or smaller) for cost efficiency',
        explanation: 'Cortex Search Service performs efficiently with smaller dedicated warehouses (MEDIUM or smaller). Larger warehouses do not improve performance and increase costs unnecessarily.',
      },
    ],
    learningMaterials: [
      {
        id: 1,
        title: 'Official Snowflake AI Features Documentation',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/guides-overview-ai-features',
        description: 'Complete guide to Snowflake AI Features and ML capabilities - Official reference',
      },
      {
        id: 2,
        title: 'Snowflake Cortex: AI SQL Functions',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql',
        description: 'Complete reference for Cortex LLM functions, embedding models, and AI capabilities',
      },
      {
        id: 3,
        title: 'Cortex Search Service Guide',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview',
        description: 'Semantic search and RAG (Retrieval Augmented Generation) implementation',
      },
      {
        id: 4,
        title: 'Cortex Analyst: Semantic Models',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst',
        description: 'Building semantic models for natural language queries and BI integration',
      },
      {
        id: 5,
        title: 'Document AI: Extraction & Processing',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/document-ai',
        description: 'Automated document processing, information extraction, and parsing',
      },
      {
        id: 6,
        title: 'GES-C01 Actual Exam Questions Database',
        type: 'article',
        url: 'https://www.actual4test.com/exam/GES-C01-questions',
        description: 'Real GES-C01 exam questions (351+ questions) with verified answers and explanations',
      },
      {
        id: 7,
        title: 'Certified Exam Dumps & Practice Tests',
        type: 'article',
        url: 'https://freedumps.certqueen.com/ges-c01-exam-dumps-snowpro-specialty-gen-ai-certification/',
        description: 'Free GES-C01 exam dumps with Q&A format and detailed explanations',
      },
      {
        id: 8,
        title: 'Valid IT Exam Dumps - GES-C01 (V8.02)',
        type: 'article',
        url: 'https://www.dumpsbase.com/freedumps/real-ges-c01-dumps-v8-02-for-the-snowpro-specialty-gen-ai-certification-exam-preparation-check-ges-c01-free-dumps-part-1-q1-q40-first.html',
        description: 'Latest GES-C01 V8.02 exam dumps with verified questions (Parts 1-3, Q1-Q100+)',
      },
      {
        id: 9,
        title: 'FreeCram GES-C01 Exam Questions',
        type: 'article',
        url: 'https://www.freecram.com/Snowflake-certification/GES-C01-exam-questions.html',
        description: 'Free GES-C01 exam questions collection with detailed answers',
      },
      {
        id: 10,
        title: 'BrainDumpsStudy GES-C01 Exam Dumps',
        type: 'article',
        url: 'https://www.braindumpstudy.com/snowpro-specialty-gen-ai-certification-exam-dumps17517.html',
        description: 'Comprehensive GES-C01 exam dumps with real-world scenarios',
      },
      {
        id: 11,
        title: 'GES-C01 Gen AI Specialty Complete Study Guide',
        type: 'article',
        url: 'https://studylib.net/doc/27990087/ges-c01---gen-ai-specialty---complete-exam-preparation-guide',
        description: 'Complete exam preparation guide covering all GES-C01 domains',
      },
      {
        id: 12,
        title: 'SnowPro Specialty: Gen AI Study Resources',
        type: 'article',
        url: 'https://www.scribd.com/document/924495989/Snow-Pro-Gena-i-Study-Guide',
        description: 'Study guide for SnowPro Gen AI specialty certification',
      },
      {
        id: 13,
        title: 'Google Books: Gen AI Architecture Patterns',
        type: 'article',
        url: 'https://books.google.co.in/books?id=5mR0EQAAQBAJ&pg=PA58&source=gbs_toc_r&cad=2#v=onepage&q&f=false',
        description: 'Reference material on GenAI architecture patterns and best practices',
      },
    ],
    mockTests: [
      {
        id: 1,
        name: 'GES-C01 Full Mock Exam',
        questionsCount: 130,
        duration: 180,
      },
      {
        id: 2,
        name: 'Cortex Functions & Search Practice',
        questionsCount: 50,
        duration: 90,
      },
      {
        id: 3,
        name: 'Cortex Analyst & Document AI Practice',
        questionsCount: 45,
        duration: 75,
      },
      {
        id: 4,
        name: 'Access Control & Security Practice',
        questionsCount: 35,
        duration: 60,
      },
    ],
  },
};
