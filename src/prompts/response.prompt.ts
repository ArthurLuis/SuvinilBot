import { ChatPromptTemplate } from '@langchain/core/prompts';

export const responsePrompt = ChatPromptTemplate.fromTemplate(`
Você é um especialista em tintas Suvinil.
Contexto combinado dos agentes:
{context}

Pergunta original:
{question}

Com base no contexto acima, responda de forma clara e objetiva,
indicando a(s) tinta(s) recomendada(s) e um breve motivo.
`);
