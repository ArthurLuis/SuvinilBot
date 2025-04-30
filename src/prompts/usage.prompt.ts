import { ChatPromptTemplate } from '@langchain/core/prompts';

export const usagePrompt = ChatPromptTemplate.fromTemplate(`
Você é um consultor de aplicações de tinta.
O usuário precisa pintar: "{input}".
Informe qual linha de produto Suvinil e tipo de acabamento
(fosco, acetinado, brilhante) são mais indicados e por quê.
`);
