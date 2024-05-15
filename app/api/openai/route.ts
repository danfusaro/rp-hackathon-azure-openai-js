import { ChatPayload } from "@/app/lib/types/ChatPayload";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
/**
 * This is a type that defines a type ConverSationStyle using the export keyword.
 * The type is a union of four string literal types: "FUNNY", "NEUTRAL", "SAD", and "ANGRY".
 * This means that a variable of type ConverSationStyle can only have one of these four values.
 */

/**
 * A simple function that makes a request to the Azure Open AI API.
 */
const simpleOpenAIRequest = async (payload: ChatPayload) => {
  // // create a new configuration object with the base path set to the Azure OpenAI endpoint
  // const configuration = new Configuration({
  //   basePath: process.env.AZURE_OPEN_AI_BASE, //https://YOUR_AZURE_OPENAI_NAME.openai.azure.com/openai/deployments/YOUR_AZURE_OPENAI_DEPLOYMENT_NAME
  // });

  const openai = new OpenAIClient(
    process.env.AZURE_OPEN_AI_BASE,
    new AzureKeyCredential(process.env.AZURE_OPEN_AI_KEY)
  );

  // const deploymentId = "gpt-4-turbo-2024-04-09";
  const deploymentId = "gpt-35-turbo-16k";
  const completion = await openai.getChatCompletions(
    deploymentId,
    [
      {
        role: "system",
        content: payload.system, // set the personality of the AI
      },
      {
        role: "user",
        content: payload.prompt, // set the prompt to the user's input
      },
    ],
    {
      functions: [
        {
          name: "set_data",
          parameters: payload.schema,
          description: "JSON parser for all results",
        },
      ],
      functionCall: { name: "set_data" },
    }
  );

  return completion.choices[0].message?.functionCall?.arguments; // return the response from the AI, make sure to handle error cases
};

/**
 * Main entry point for the API.
 **/

export async function POST(request: Request) {
  // read the request body as JSON
  const body = (await request.json()) as ChatPayload;
  const response = await simpleOpenAIRequest(body);
  return new Response(response);
}
