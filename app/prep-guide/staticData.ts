export const staticGuides = [
  {
    _id: "google-1",
    type: "company",
    title: "Google",
    difficulty: "Advanced",
    tags: ["FAANG", "Algorithms", "System Design"],
    bookmarksCount: 156,
    content: {
      processOverview: "1 Phone Screen, 4-5 Onsite Interviews (Coding, System Design, Googleyness)",
      commonQuestions: [
        { question: "Reverse a Linked List", answer: "Use three pointers: prev, curr, next..." },
        { question: "Design YouTube", answer: "Focus on CDN, Video Storage, and Metadata DB..." }
      ],
      codingTopics: ["Dynamic Programming", "Graph Theory", "Trees", "Hash Maps"],
      behavioralQuestions: ["Tell me about a time you failed.", "How do you handle conflict?"],
      tips: "Always communicate your thought process clearly before writing code."
    }
  },
  {
    _id: "amazon-1",
    type: "company",
    title: "Amazon",
    difficulty: "Intermediate",
    tags: ["FAANG", "Leadership Principles"],
    bookmarksCount: 204,
    content: {
      processOverview: "1 Online Assessment (OA), 1 Phone Screen, 4 Onsite (Heavy on LPs)",
      commonQuestions: [
        { question: "Two Sum", answer: "Use a Hash Map to store complements." },
        { question: "Design Amazon E-commerce", answer: "Microservices architecture, caching inventory." }
      ],
      codingTopics: ["Arrays", "Strings", "Trees"],
      behavioralQuestions: ["Describe a time you showed Customer Obsession.", "When did you disagree and commit?"],
      tips: "Know the 16 Leadership Principles inside out and map them to your past experiences using the STAR method."
    }
  },
  {
    _id: "meta-1",
    type: "company",
    title: "Meta",
    difficulty: "Advanced",
    tags: ["FAANG", "React", "Scalability"],
    bookmarksCount: 180,
    content: {
      processOverview: "1 Phone Screen, 4 Onsite Interviews (2 Coding, 1 System Design, 1 Behavioral)",
      commonQuestions: [
        { question: "Valid Palindrome II", answer: "Use two pointers and allow at most one deletion." },
        { question: "Design Facebook News Feed", answer: "Focus on caching, fan-out on write vs read, and ranking systems." }
      ],
      codingTopics: ["Arrays", "Strings", "Trees", "Graphs", "Backtracking"],
      behavioralQuestions: ["Tell me about a time you had a conflict with a coworker.", "What's the most impactful project you've worked on?"],
      tips: "Speed and correctness are key. Practice medium/hard LeetCode problems heavily."
    }
  },
  {
    _id: "netflix-1",
    type: "company",
    title: "Netflix",
    difficulty: "Advanced",
    tags: ["FAANG", "Culture", "Algorithms"],
    bookmarksCount: 145,
    content: {
      processOverview: "1-2 Phone Screens, 1 Take-Home or Live Coding, Virtual Onsite (Technical and Culture)",
      commonQuestions: [
        { question: "LRU Cache", answer: "Use a Doubly Linked List and a Hash Map." },
        { question: "Design Netflix Video Streaming", answer: "Focus on Open Connect (CDN), adaptive bitrate streaming, and stateless microservices." }
      ],
      codingTopics: ["Design", "Heaps", "Hash Maps", "Graphs"],
      behavioralQuestions: ["How do you embody the 'Freedom and Responsibility' culture?", "Tell me about a time you gave candid feedback."],
      tips: "Familiarize yourself intensely with their Culture Memo. Culture fit is weighted very highly."
    }
  },
  {
    _id: "apple-1",
    type: "company",
    title: "Apple",
    difficulty: "Intermediate",
    tags: ["FAANG", "Core OS", "Hardware"],
    bookmarksCount: 190,
    content: {
      processOverview: "1-2 Phone Screens (often FaceTime), followed by a 6-hour Onsite Interview",
      commonQuestions: [
        { question: "Merge Intervals", answer: "Sort by start time, then merge overlapping intervals." },
        { question: "Design Apple Pay", answer: "Focus on security, tokenization, and distributed transactions." }
      ],
      codingTopics: ["Linked Lists", "Trees", "Arrays", "Concurrency"],
      behavioralQuestions: ["Why Apple?", "Describe a difficult bug you had to solve and how you went about it."],
      tips: "Expect domain-specific questions depending on the team (e.g., iOS, Core Data, Hardware)."
    }
  },
  {
    _id: "role-backend-1",
    type: "role",
    title: "Backend Developer",
    difficulty: "Intermediate",
    tags: ["Node.js", "Databases", "APIs"],
    bookmarksCount: 120,
    content: {
      requiredSkills: ["Node.js / Python / Java", "RESTful API Design", "SQL & NoSQL", "Caching (Redis)"],
      faqs: [
        { question: "What is the main difference between SQL and NoSQL?", answer: "Relational vs Non-relational, strict schema vs flexible schema, ACID vs BASE." },
        { question: "How do you structure a scalable backend?", answer: "Microservices, message queues, load balancers, caching." }
      ],
      roadmap: "1. Learn a Language -> 2. Master DBs -> 3. Build REST/GraphQL APIs -> 4. Understand Caching -> 5. Learn Docker/K8s"
    }
  },
  {
    _id: "role-frontend-1",
    type: "role",
    title: "Frontend Developer",
    difficulty: "Beginner",
    tags: ["React", "CSS", "JavaScript"],
    bookmarksCount: 98,
    content: {
      requiredSkills: ["HTML/CSS/JS", "React/Vue", "State Management", "Web Performance"],
      faqs: [
        { question: "Explain the Virtual DOM", answer: "An in-memory representation of the real DOM. React uses it to batch updates efficiently." },
        { question: "What is CSS Grid vs Flexbox?", answer: "Grid is 2D, Flexbox is 1D layout." }
      ],
      roadmap: "1. Basics (HTML/CSS/JS) -> 2. Framework (React) -> 3. State Management (Redux/Zustand) -> 4. Next.js"
    }
  },
  {
    _id: "role-fullstack-1",
    type: "role",
    title: "Full Stack Developer",
    difficulty: "Advanced",
    tags: ["React", "Node.js", "System Design", "AWS"],
    bookmarksCount: 250,
    content: {
      requiredSkills: ["Frontend Frameworks (React/Vue)", "Backend Engineering (Node.js/Django)", "Database Design (SQL/NoSQL)", "Cloud Deployment (AWS/Vercel)"],
      faqs: [
        { question: "How do you connect a React frontend to a Node backend?", answer: "Typically using REST APIs or GraphQL over HTTP, handling CORS, and managing auth tokens." },
        { question: "What are trade-offs between Monolithic and Microservices architectures?", answer: "Monoliths are easier to deploy and debug initially; microservices scale better independently but add network complexity." }
      ],
      roadmap: "1. Master Frontend (HTML/JS/React) -> 2. Master Backend (Node/Express/DBs) -> 3. Learn System Design -> 4. Understand DevOps/Deployment"
    }
  }
];
