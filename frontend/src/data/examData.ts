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
  quizzes: Quiz[];
  dumps?: DumpQuestion[];
  learningMaterials: LearningMaterial[];
  mockTests: {
    name: string;
    questions: number;
    duration: number;
  }[];
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
        name: 'SnowPro Core Full Mock Test',
        questions: 100,
        duration: 180,
      },
      {
        name: 'Architecture & Warehouse Practice Test',
        questions: 40,
        duration: 90,
      },
      {
        name: 'Data Loading & Protection Practice Test',
        questions: 35,
        duration: 75,
      },
    ],
  },
  'SnowPro Specialty: Gen AI': {
    name: 'SnowPro Specialty: Gen AI',
    provider: 'Snowflake',
    description: 'Specialty Certification - LLMs, Cortex, and generative workflows within Snowflake',
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
    ],
    dumps: [
      {
        id: 1,
        question:
          'A data analyst is tasked with identifying customers who purchased items with similar feature vectors. They have a table "products" with a column storing vector embeddings. Which statement correctly describes how to define a vector column?',
        options: [
          'CREATE TABLE products (id INT, embedding VECTOR(768))',
          'CREATE TABLE products (id INT, embedding VECTOR)',
          'CREATE TABLE products (id INT, embedding ARRAY)',
          'CREATE TABLE products (id INT, embedding VARIANT)',
        ],
        correct_answer: 'CREATE TABLE products (id INT, embedding VECTOR(768))',
        explanation: 'VECTOR(dimension) is the correct syntax to define a vector column with specific dimensions.',
      },
      {
        id: 2,
        question:
          'An enterprise is deploying a RAG application using Cortex Search on a large dataset. Which configuration is recommended for optimal performance and cost efficiency?',
        options: [
          'Use X-Large or 2X-Large warehouse for each Cortex Search Service',
          'Use a dedicated warehouse of size MEDIUM or smaller',
          'Use multiple warehouses for parallel processing',
          'Warehouse size does not affect Cortex Search performance',
        ],
        correct_answer: 'Use a dedicated warehouse of size MEDIUM or smaller',
        explanation:
          'Snowflake recommends using a dedicated warehouse of MEDIUM size or smaller for each Cortex Search Service for optimal cost and performance balance.',
      },
      {
        id: 3,
        question: 'To enable users to interact with a Snowflake Cortex Agent via the agent run API, which privilege must be granted?',
        options: [
          'CREATE EXTERNAL AGENT',
          'EXECUTE privilege on CORTEX AGENT',
          'SNOWFLAKE.CORTEX_AGENT_RUNNER role',
          'All of the above',
        ],
        correct_answer: 'EXECUTE privilege on CORTEX AGENT',
        explanation:
          'Users need the EXECUTE privilege on the Cortex Agent to call it via the run API for conversational interactions.',
      },
      {
        id: 4,
        question:
          'A Snowflake developer implements a two-tier LLM access strategy with common models broadly available and specialized models for specific teams. Which approach correctly implements this?',
        options: [
          'Set CORTEX_MODELS_ALLOWLIST at account level and use SNOWFLAKE.CORTEX-MODEL-ROLE-[MODEL_NAME] for team-specific access',
          'Use only CORTEX_MODELS_ALLOWLIST without role-based restrictions',
          'Grant direct database access instead of using Cortex roles',
          'Create custom roles without using Snowflake-provided Cortex roles',
        ],
        correct_answer:
          'Set CORTEX_MODELS_ALLOWLIST at account level and use SNOWFLAKE.CORTEX-MODEL-ROLE-[MODEL_NAME] for team-specific access',
        explanation:
          'This approach uses account-level allowlist for broad access and grants specific model roles to teams for exclusive access to premium models.',
      },
      {
        id: 5,
        question:
          'A data science team wants to generate vector embeddings for product descriptions using the e5-base-v2 model. Which statement about EMBED_TEXT is correct?',
        options: [
          'It returns embeddings as VARIANT data type',
          'It returns embeddings as VECTOR data type with specified dimensions',
          'It requires pre-computed embeddings as input',
          'It only works with English text',
        ],
        correct_answer: 'It returns embeddings as VECTOR data type with specified dimensions',
        explanation:
          'EMBED_TEXT returns embeddings as VECTOR data type, with the dimension size depending on the model used (e.g., 768 for e5-base-v2).',
      },
      {
        id: 6,
        question:
          'When fine-tuning a Snowflake Document AI model for legal document extraction, which practice most effectively improves extraction accuracy?',
        options: [
          'Use only perfectly clean documents in training data',
          'Create highly complex prompts with intricate logic',
          'Include diverse documents with various layouts and explicit NULL examples',
          'Set temperature to 0.7 for creative interpretations',
        ],
        correct_answer: 'Include diverse documents with various layouts and explicit NULL examples',
        explanation:
          'Effective Document AI fine-tuning requires diverse training data representing various layouts, data variations, and explicit examples of NULL values or empty cells.',
      },
      {
        id: 7,
        question:
          'A data engineering team deploying Cortex Analyst needs to maximize accuracy and trustworthiness. Which practice is most important when configuring the semantic model?',
        options: [
          'Include all available tables and columns for maximum flexibility',
          'Include only essential tables, columns, and well-defined relationships',
          'Use complex nested hierarchies in dimensions',
          'Avoid using synonyms to reduce model complexity',
        ],
        correct_answer: 'Include only essential tables, columns, and well-defined relationships',
        explanation:
          'Best practices for Cortex Analyst semantic models involve including only essential data elements with clear definitions and relationships to improve accuracy and trustworthiness of responses.',
      },
      {
        id: 8,
        question:
          'A data engineer needs to execute the !PREDICT method on Document AI models from a pipeline. What are the essential USAGE privileges required?',
        options: [
          'USAGE on the Document AI model and READ on the stage',
          'USAGE on the model, READ on stage, and granted SNOWFLAKE.DOCUMENT_INTELLIGENCE_CREATOR role',
          'Only SNOWFLAKE.DOCUMENT_INTELLIGENCE_CREATOR role',
          'ADMIN privileges on the database',
        ],
        correct_answer:
          'USAGE on the model, READ on stage, and granted SNOWFLAKE.DOCUMENT_INTELLIGENCE_CREATOR role',
        explanation:
          'Document AI !PREDICT requires USAGE privilege on the model, READ on the stage, and the SNOWFLAKE.DOCUMENT_INTELLIGENCE_CREATOR role.',
      },
      {
        id: 9,
        question:
          'A financial institution processes call transcripts with Cortex functions. Which combination is most appropriate for summarization and sentiment classification?',
        options: [
          'Use TRANSLATE function with TRY_COMPLETE error handling',
          'Use SUMMARIZE function for summaries and COMPLETE with structured output for sentiment',
          'Use EXTRACT_ANSWER for both tasks',
          'Manual processing without Cortex functions',
        ],
        correct_answer: 'Use SUMMARIZE function for summaries and COMPLETE with structured output for sentiment',
        explanation:
          'SUMMARIZE handles long text compression and COMPLETE with structured outputs (response_format) is ideal for classification tasks like sentiment analysis.',
      },
      {
        id: 10,
        question:
          'When using Cortex Search with VECTOR_L2_DISTANCE in a Snowflake Task pipeline, what operational best practice should be considered?',
        options: [
          'Use the smallest warehouse size (XS) for cost savings',
          'Use X-Large warehouses for all vector operations',
          'Warehouse size recommendations for Cortex AI functions still apply to vector similarity functions',
          'Warehouse size has no impact on vector distance calculations',
        ],
        correct_answer: 'Warehouse size recommendations for Cortex AI functions still apply to vector similarity functions',
        explanation:
          'The Snowflake recommendation to use appropriately-sized warehouses (not too large, not too small) for Cortex AI functions extends to vector similarity functions for optimal performance and cost.',
      },
    ],
    learningMaterials: [
      {
        id: 1,
        title: 'Snowflake AI and ML Overview',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/guides-overview-ai-features',
        description: 'Complete guide to Snowflake AI Features and ML capabilities',
      },
      {
        id: 2,
        title: 'Snowflake Cortex Features',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql',
        description: 'AI SQL functions and LLM capabilities in Snowflake Cortex',
      },
      {
        id: 3,
        title: 'Cortex Search Service',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview',
        description: 'Semantic search and RAG implementation with Cortex Search',
      },
      {
        id: 4,
        title: 'Cortex Analyst Semantic Models',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-analyst',
        description: 'Building semantic models for natural language queries',
      },
      {
        id: 5,
        title: 'Document AI and Extraction',
        type: 'documentation',
        url: 'https://docs.snowflake.com/en/user-guide/snowflake-cortex/document-ai',
        description: 'Automated document processing and information extraction',
      },
      {
        id: 6,
        title: 'SnowPro Specialty: Gen AI Study Guide',
        type: 'article',
        url: 'https://www.snowflake.com/wp-content/uploads/2024/11/standard_genai_datasheet_24J23.pdf',
        description: 'Official Snowflake Gen AI certification study guide',
      },
    ],
    mockTests: [
      {
        name: 'GES-C01 Full Mock Exam',
        questions: 130,
        duration: 180,
      },
      {
        name: 'Cortex Functions & Search Practice',
        questions: 50,
        duration: 90,
      },
      {
        name: 'Cortex Analyst & Document AI Practice',
        questions: 45,
        duration: 75,
      },
      {
        name: 'Access Control & Security Practice',
        questions: 35,
        duration: 60,
      },
    ],
  },
};
