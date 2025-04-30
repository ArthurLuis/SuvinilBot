import { ChatPromptTemplate } from '@langchain/core/prompts';

export const usagePrompt = ChatPromptTemplate.fromTemplate(`
Você é um consultor de aplicações de tinta.
O usuário precisa pintar: "{input}"

Abaixo estão as opções de tinta disponíveis (recuperadas do banco de dados):
{summary}

Com base apenas nas opções acima, indique qual tinta Suvinil e tipo de acabamento são mais indicados e por quê.
Em adicional retorne as outras opções disponiveis em uma seção a parte.
Não invente tintas que não estão na lista.
NUNCA misture especificações de diferentes tintas. Use apenas as informações da tinta que está no banco de dados, sem criar novas combinações.

`);
