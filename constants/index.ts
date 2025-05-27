import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.

- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
  clientMessages:[],
  serverMessages:[]
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
  {
    id: "3",
    userId: "user2",
    role: "Data Scientist",
    type: "Technical",
    techstack: ["Tailwind", "vercel", "React", "NumPy"],
    level: "Mid",
    questions: [
      "Explain the difference between supervised and unsupervised learning.",
    ],
    finalized: true,
    createdAt: "2024-05-10T09:45:00Z",
  },
];




// damn bro! use this whenever they chaged the assistant configuration.

export const generator={
  "name": "test",
  "nodes": [
    {
      "name": "start",
      "type": "conversation",
      "isStart": true,
      "metadata": {
        "position": {
          "x": -188.82552787692674,
          "y": 124.33161394637187
        }
      },
      "prompt": "You will initiate the conversation by saying \"Hello, {{username}}! Let's prepare your interview. I'll ask you a few questions and prepare an interview jus for you. Are you ready?\" and then you have to ask user \n5 questions-What's the role user's applying for? what's the type of interview?(technical or behavioral or mixed). The level of job experience (senior or junior). Techstack that he's proficient with. Amount of questions that are supposed to be asked.",
      "voice": {
        "model": "aura-2",
        "voiceId": "cordelia",
        "provider": "deepgram"
      },
      "variableExtractionPlan": {
        "output": []
      },
      "messagePlan": {
        "firstMessage": ""
      }
    },
    {
      "name": "conversation_1",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": 285.58209819913907,
          "y": 199.39358460375342
        }
      },
      "prompt": "Extract the variables specified without missing anything.",
      "voice": {
        "model": "aura-2",
        "voiceId": "thalia",
        "provider": "deepgram"
      },
      "variableExtractionPlan": {
        "output": [
          {
            "enum": [],
            "type": "string",
            "title": "role",
            "description": "What role would you like to train for?"
          },
          {
            "enum": [],
            "type": "string",
            "title": "type",
            "description": "Are you aiming for a technical, behavioral or a mixed type of interview?"
          },
          {
            "enum": [],
            "type": "string",
            "title": "level",
            "description": "The job experience level required"
          },
          {
            "enum": [],
            "type": "string",
            "title": "techstack",
            "description": "A list of technologies to cover during the job interview"
          },
          {
            "enum": [],
            "type": "string",
            "title": "amount",
            "description": "How many questions would you like me to prepare for you?"
          }
        ]
      }
    },
    {
      "name": "node_1747665292980",
      "type": "apiRequest",
      "metadata": {
        "position": {
          "x": 322.2231267742686,
          "y": 442.9331747246701
        }
      },
      "method": "POST",
      "url": "https://interview-assist-ecru.vercel.app/api/vapi/generate",
      "headers": {
        "type": "object",
        "properties": {}
      },
      "body": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string",
            "value": "{{role}}",
            "description": ""
          },
          "type": {
            "type": "string",
            "value": "{{type}}",
            "description": ""
          },
          "level": {
            "type": "string",
            "value": "{{level}}",
            "description": ""
          },
          "amount": {
            "type": "string",
            "value": "{{amount}}",
            "description": ""
          },
          "userid": {
            "type": "string",
            "value": "{{userid}}",
            "description": ""
          },
          "techstack": {
            "type": "string",
            "value": "{{techstack}}",
            "description": ""
          }
        }
      },
      "output": {
        "type": "object",
        "properties": {}
      },
      "mode": "blocking",
      "hooks": []
    },
    {
      "name": "conversation_1747665482529",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": -191.07202470563396,
          "y": 575.7876529966671
        }
      },
      "prompt": "Say that the interview has been generated and thank the user for the call. And end the call",
      "voice": {
        "model": "aura-2",
        "voiceId": "thalia",
        "provider": "deepgram"
      }
    },
    {
      "name": "hangup_1747665504014",
      "type": "hangup",
      "metadata": {
        "position": {
          "x": -97.96788207338105,
          "y": 751.810096635722
        }
      }
    }
  ],
  "edges": [
    {
      "from": "start",
      "to": "conversation_1",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    },
    {
      "from": "conversation_1",
      "to": "node_1747665292980",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    },
    {
      "from": "node_1747665292980",
      "to": "conversation_1747665482529",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    },
    {
      "from": "conversation_1747665482529",
      "to": "hangup_1747665504014",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    }
  ],
  "model": {
    "model": "gpt-4o",
    "messages": [
      {
        "role": "system",
        "content": "You are Ronnie and you are a mock interviewer who will speak exactly as a human and try to generate most human like interaction. If user doesn't give any response ask him to give a reply in a respectful manner. Keep the conversation professional. Please note that you will initiate the conversation."
      }
    ],
    "provider": "openai",
    "temperature": 0.7
  }
}