import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerativeModel,
  GenerateContentResult,
  Part
} from "@google/generative-ai";
import { env } from './env';

// Initialize Gemini with error handling
let genAI: GoogleGenerativeAI;
try {
  genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY!);
} catch (error) {
  console.error('Failed to initialize Gemini AI:', error);
  throw error;
}

// Define safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export async function analyzeBillImage(imageData: string): Promise<string> {
  try {
    const model: GenerativeModel = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings,
    });

    const base64ImageData = imageData.replace(/^data:image\/[a-z]+;base64,/, "");

    const promptParts: Part[] = [
      {
        text: `You are a medical bill analysis expert. First, verify if the uploaded image is a medical bill or medical-related document.

If the image is NOT a medical bill or medical-related document, respond only with:
"I apologize, but I can only analyze medical bills. The uploaded image does not appear to be a medical bill or medical-related document."

If it IS a medical bill, provide the analysis in the following format:

## Summary
- Provide a simple, one-paragraph summary of the bill
- Highlight the most important things the patient needs to know
- Clearly state the total amount the patient needs to pay

## Detailed Breakdown
1. Key Dates:
   - When services were provided
   - When payment is due

2. Costs Explained:
   - Total bill amount
   - What insurance covered (if shown)
   - Patient's responsibility
   - Break down any confusing charges in simple terms

3. Services Received:
   - List each medical service in plain English
   - Explain any medical terms or codes in parentheses
   - Show the cost for each service

4. Insurance Details (if present):
   - Insurance company name
   - What they paid
   - Explain any insurance terms (like deductible, copay) in simple terms

5. Action Items:
   - Clear steps on what the patient needs to do next
   - Payment options available
   - Due dates for payment

## Additional Notes
- Flag any potential errors or unusual charges
- Suggest questions to ask the provider if something seems unclear
- Mention if any important information is missing from the bill

Please format the response in clear markdown with appropriate headings and bullet points.
For any information not visible in the image, indicate with "Not shown in the bill".
Use simple, everyday language and avoid medical jargon where possible.`
      },
      {
        inlineData: {
          data: base64ImageData,
          mimeType: "image/jpeg"
        }
      }
    ];

    const result: GenerateContentResult = await model.generateContent(promptParts);
    const response = await result.response;
    
    if (response.promptFeedback?.blockReason) {
      throw new Error(`Response blocked: ${response.promptFeedback.blockReason}`);
    }

    return response.text();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to analyze medical bill');
  }
}

export async function chatWithBill(
  question: string,
  imageData: string,
  previousAnalysis: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      safetySettings,
    });

    const base64ImageData = imageData.replace(/^data:image\/[a-z]+;base64,/, "");

    const promptParts: Part[] = [
      {
        text: `You are a friendly and helpful medical bill expert assistant. Your goal is to help users understand their medical bills in a conversational way.

Key Guidelines:
- Be warm and engaging in your responses
- Use natural, conversational language
- Keep responses focused on the medical bill and its details
- If the user asks about something unrelated to the bill, politely redirect them back to bill-related questions
- Explain complex terms in simple language
- Be empathetic when discussing costs and charges

Context for this conversation:
Previous Bill Analysis:
${previousAnalysis}

User's Question:
${question}

Remember to:
1. Stay friendly and approachable
2. Keep answers clear and simple
3. Only provide information that's relevant to this specific medical bill
4. If unsure about any details, acknowledge it and suggest what information might be needed
5. If the user asks about something not shown in the bill, politely mention that it's not visible in the current document

If the image is not a medical bill, respond only with:
"I apologize, but I can only help with questions about medical bills. The uploaded image does not appear to be a medical bill or medical-related document."

Please provide a conversational yet informative response that helps the user understand their medical bill better.`
      },
      {
        inlineData: {
          data: base64ImageData,
          mimeType: "image/jpeg"
        }
      }
    ];

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    
    if (response.promptFeedback?.blockReason) {
      throw new Error(`Response blocked: ${response.promptFeedback.blockReason}`);
    }

    return response.text();
  } catch (error) {
    console.error('Error in chat:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to process question');
  }
} 