import { Injectable } from '@nestjs/common';
import { EnvironmentAgentService } from 'src/agents/environment/environment-agent.service';
import { ResistanceAgentService } from 'src/agents/resistance/resistance-agent.service';
import { UsageAgentService } from 'src/agents/usage/usage-agent.service';

@Injectable()
export class OrchestratorService {
  constructor(
    private readonly envAgent: EnvironmentAgentService,
    private readonly resAgent: ResistanceAgentService,
    private readonly usageAgent: UsageAgentService,
  ) {}

  async composeContext(userMessage: string): Promise<string> {
    const [envCtx, resCtx, usageCtx] = await Promise.all([
      this.envAgent.run(userMessage),
      this.resAgent.run(userMessage),
      this.usageAgent.run(userMessage),
    ]);

    const context = [
      '**Environment Analysis:**',
      envCtx,
      '**Resistance Analysis:**',
      resCtx,
      '**Usage Analysis:**',
      usageCtx,
    ].join('\n\n');

    return context;
  }
}
