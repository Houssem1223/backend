import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Endorsement } from './entities/endorsement.entity';

@Injectable()
export class EndorsementsService {
  constructor(
    @InjectModel(Endorsement.name) private readonly endorsementModel: Model<Endorsement>,
  ) {}

  async endorseSkill(skillId: string, freelancerId: string, clientId: string) {
    const existingEndorsement = await this.endorsementModel.findOne({
      skillId,
      freelancerId,
      clientId,
    });

    if (existingEndorsement) {
      // Increment count if the endorsement already exists
      existingEndorsement.count += 1;
      return existingEndorsement.save();
    } else {
      // Create a new endorsement if it doesn't exist
      const newEndorsement = new this.endorsementModel({ skillId, freelancerId, clientId });
      return newEndorsement.save();
    }
  }

  async getEndorsementsByFreelancer(freelancerId: string) {
    return this.endorsementModel.find({ freelancerId }).exec();
  }
}
