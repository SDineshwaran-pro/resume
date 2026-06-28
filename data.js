// ── DEFAULT RESUME DATA ──
// This file holds all default content.
// The admin panel saves overrides to localStorage under key 'resumeData'

const DEFAULT_DATA = {
  meta: {
    name: "Dineshwaran S",
    title: "AI Engineer · Data Engineer · Agentic Systems Builder",
    phone: "+91 8220206209",
    email: "spdineshwaran4@gmail.com",
    location: "Coimbatore, Tamil Nadu, India",
    remoteReady: true,
  },

  experience: [
    {
      id: "exp-1",
      role: "Programmer Analyst (Data & AI Engineering)",
      company: "Cognizant Technology Solutions",
      division: "Life Science, Healthcare | AI & Analytics",
      location: "Coimbatore, Tamil Nadu, India",
      period: "May 2025 – Present",
      bullets: [
        "Owned end-to-end design and delivery of production ETL pipelines (Airflow DAGs) processing 500M+ healthcare records daily (HIV, Oncology, PrEP) on AWS EMR with PySpark — reducing manual effort by 40%.",
        "Implemented DataOps CI/CD via GitHub Actions with automated data-quality checks, SLA alerting, and pipeline monitoring — cutting failed jobs by 35%.",
        "Processed 1TB+ daily on AWS EMR; surfaced actionable business insights via AWS Athena, improving reporting efficiency by 30%.",
        "Led UAT cycles, guided support teams on production releases, and maintained cross-functional documentation in Confluence and Azure DevOps.",
        "Defined and tracked delivery against flow metrics and SLA dashboards, making pipeline health visible and actionable across stakeholders."
      ]
    },
    {
      id: "exp-2",
      role: "Programmer Analyst Trainee",
      company: "Cognizant Technology Solutions",
      division: "Life Science, Healthcare | AI & Analytics",
      location: "Coimbatore, Tamil Nadu, India",
      period: "May 2024 – May 2025",
      bullets: [
        "Built a condition-based expense approval & escalation chatbot POC using AiseraGPT (no-code/low-code LLM workflow builder). Designed multi-step decision flows and integrated the GitHub API for live repository data.",
        "Diagnosed the approval bottleneck first — mapped the manual workflow end-to-end, confirmed AI/automation was the right intervention, then scoped a focused MVP.",
        "Built foundational DataOps infrastructure: Airflow DAGs, PySpark on EMR, S3 lifecycle policies, Athena queries, and automated monitoring / quality checks."
      ]
    },
    {
      id: "exp-3",
      role: "Intern",
      company: "Cognizant Technology Solutions",
      division: "Life Science, Healthcare | AI & Analytics",
      location: "Coimbatore, Tamil Nadu, India",
      period: "Dec 2023 – Apr 2024",
      bullets: [
        "Developed and deployed Informatica PowerCenter ETL mappings integrating heterogeneous healthcare data sources for analytics.",
        "Wrote Python data-processing scripts and optimised SQL/MySQL queries; resolved pipeline failures and improved execution time by 25–30%."
      ]
    }
  ],

  skills: [
    {
      category: "Cloud Platforms",
      items: ["AWS EMR", "AWS S3", "AWS Athena", "AWS Glue"]
    },
    {
      category: "Big Data & Processing",
      items: ["PySpark", "Apache Airflow", "Hadoop (EMR)", "Apache Spark"]
    },
    {
      category: "DataOps & CI/CD",
      items: ["GitHub Actions", "CI/CD Pipelines", "SLA Monitoring", "Data Quality Checks", "DataOps"]
    },
    {
      category: "Programming",
      items: ["Python", "Java", "SQL", "Bash / Shell Scripting", "HTML", "CSS"]
    },
    {
      category: "Databases & Query",
      items: ["MySQL", "AWS Athena", "MySQL Workbench", "SQL"]
    },
    {
      category: "ETL & Integration",
      items: ["Informatica PowerCenter", "AWS Glue", "Airflow DAGs"]
    },
    {
      category: "DevOps & Version Control",
      items: ["GitHub", "Git", "GitHub Actions", "Azure DevOps"]
    },
    {
      category: "AI & Prompt Engineering",
      items: ["AiseraGPT", "Claude AI", "Microsoft Co-Pilot", "LLM", "RAG", "Prompt Engineering"]
    },
    {
      category: "Tools & Documentation",
      items: ["Confluence", "Azure DevOps", "MS Excel", "MS Word", "MS PowerPoint"]
    }
  ],

  achievements: [
    {
      id: "ach-1",
      icon: "🏆",
      title: "Cognizant Cheers Coral Award – Rise the Bar",
      description: "Recognised for rapid skill acquisition, end-to-end ownership of complex tasks, and measurable team impact across the AI & Analytics division.",
      link: null,
      linkLabel: null
    },
    {
      id: "ach-2",
      icon: "🌐",
      title: "Hiring4Jobs Website — Revenue-Generating Product",
      description: "Built a job vacancy blog website from scratch where people can find jobs and get redirected to the official application page. Used Claude AI and Microsoft Co-Pilot to accelerate development. Now generating revenue through Google AdSense.",
      link: "https://hiring4jobs.com",
      linkLabel: "Visit hiring4jobs.com ↗"
    },
    {
      id: "ach-3",
      icon: "🎓",
      title: "Alumni Legacy Award",
      description: "Honoured for mentoring junior students and conducting mock technical interviews — reflects cross-functional leadership and knowledge transfer at the college level.",
      link: null,
      linkLabel: null
    },
    {
      id: "ach-4",
      icon: "🥇",
      title: "Hackathon & Academic Competition Winner",
      description: "Winner / Runner-up in multiple paper presentations, hackathons, and debugging contests during undergraduate studies, demonstrating consistent technical excellence.",
      link: null,
      linkLabel: null
    }
  ],

  certifications: [
    {
      id: "cert-1",
      name: "Claude Certified Architect – Foundation",
      issuer: "Anthropic",
      year: "2025",
      icon: "🤖",
      description: "Validates proficiency in designing, prompting, and deploying Claude-based AI systems including agentic architectures, tool use, safety guardrails, and prompt engineering best practices.",
      link: null,
      linkLabel: null
    }
  ],

  education: [
    {
      id: "edu-1",
      degree: "B.E. Computer Science & Engineering",
      institution: "Kongunadu College of Engineering & Technology",
      period: "2019 – 2023",
      grade: "CGPA: 8.71 / 10"
    },
    {
      id: "edu-2",
      degree: "12th Standard",
      institution: "Little Angels Higher Secondary School",
      period: "2018 – 2019",
      grade: "79.1%"
    },
    {
      id: "edu-3",
      degree: "10th Standard",
      institution: "The Modern Academy Matriculation School",
      period: "2016 – 2017",
      grade: "97.4%"
    }
  ],

  social: [
    {
      label: "LinkedIn",
      icon: "🔗",
      url: "https://linkedin.com/in/dineshwaran-s",
      placeholder: true
    },
    {
      label: "GitHub",
      icon: "🐙",
      url: "https://github.com/dineshwaran-s",
      placeholder: true
    },
    {
      label: "Website",
      icon: "🌐",
      url: "https://hiring4jobs.com",
      placeholder: false
    }
  ]
};

// ── LOAD DATA (localStorage overrides default) ──
function loadData() {
  try {
    const saved = localStorage.getItem('resumeData');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch(e) {}
  return DEFAULT_DATA;
}

window.RESUME_DATA = loadData();
