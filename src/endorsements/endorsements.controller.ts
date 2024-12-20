import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { EndorsementsService } from './endorsements.service';

@Controller('endorsements')
export class EndorsementsController {
  constructor(private readonly endorsementService: EndorsementsService) {}

  @Post()
  async endorseSkill(@Body() body: { skillId: string; freelancerId: string; clientId: string }) {
    const { skillId, freelancerId, clientId } = body;
    return this.endorsementService.endorseSkill(skillId, freelancerId, clientId);
  }

  @Get(':freelancerId')
  async getEndorsements(@Param('freelancerId') freelancerId: string) {
    return this.endorsementService.getEndorsementsByFreelancer(freelancerId);
  }
}
