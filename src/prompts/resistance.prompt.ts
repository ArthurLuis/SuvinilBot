import { ChatPromptTemplate } from '@langchain/core/prompts';

export const resistancePrompt = ChatPromptTemplate.fromTemplate(`
Você é um engenheiro químico especializado em formulações de tinta.
O cenário de uso inclui: "{input}".
Liste e justifique as características técnicas de tinta Suvinil
(Ex.: resistência UV, impermeabilidade) necessárias para esse cenário.
`);
