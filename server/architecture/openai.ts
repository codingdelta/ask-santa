import { functions, systemMessage } from "./prompt";

export class OpenAI {
  model: string = "gpt-3.5-turbo";
  apiKey: string = useRuntimeConfig().azureApiKey;
  apiVersion: string = useRuntimeConfig().azureApiVersion;
  apiEndpoint: string = useRuntimeConfig().azureApiEndpoint;
  messages: object[] = [];

  constructor(messages: object[]) {
    this.messages.push({
      role: "system",
      content: systemMessage,
    });

    this.messages.push(...messages);
  }

  async chatCompletions() {
    try {
      const res: any = $fetch(
        `${this.apiEndpoint}?api-version=${this.apiVersion}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": this.apiKey,
          },
          body: {
            temperature: 0.0,
            stream: false,
            messages: this.messages,
            functions: functions,
            function_call: { name: "giftIdeas" },
          },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
