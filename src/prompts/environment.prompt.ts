import { ChatPromptTemplate } from '@langchain/core/prompts';

export const environmentPrompt = ChatPromptTemplate.fromTemplate(`
Você é um especialista em tintas Suvinil.
O usuário descreveu um ambiente com estas características:
"{input}"

Explique quais propriedades de tinta (ex.: resistência à umidade, anti-mofo)
são mais adequadas para esse ambiente.
`);
