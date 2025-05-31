import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
  return Response.json({ success: true, data: "Thank You!" }, { status: 200 });
}

interface InterviewArgs {
  role: string;
  type: string;
  level: string;
  amount: string;
  techstack: string;
  userid?: string; 
}

const extractArguments = (body: any): InterviewArgs => {
  if (!body?.message?.toolCallList?.[0]?.function?.arguments) {
    throw new Error("Invalid payload: Missing toolCallList or arguments");
  }

  const args = body.message.toolCallList[0].function.arguments;


  if (!args.role || !args.type || !args.level || !args.amount || !args.techstack) {
    throw new Error("Missing required fields in arguments");
  }

  return args;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const args = extractArguments(body);
    const { role, type, level, amount, techstack, userid } = args;

    const amountNumber = parseInt(amount, 10);
    if (isNaN(amountNumber)) {
      throw new Error("Invalid amount: Must be a number");
    }

    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amountNumber}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you! <3`,
    });

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questions);
    } catch (e) {
      throw new Error("Failed to parse questions from generateText");
    }

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split("/,|\band\b/").map(t => t.trim()),
      questions: parsedQuestions,
      userId: userid || "", 
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}