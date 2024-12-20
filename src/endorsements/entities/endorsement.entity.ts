import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically handles createdAt and updatedAt
export class Endorsement extends Document {
  @Prop({ required: true }) // Skill ID
  skillId: string;

  @Prop({ required: true }) // Freelancer being endorsed
  freelancerId: string;

  @Prop({ required: true }) // Client endorsing the skill
  clientId: string;

  @Prop({ default: 1 }) // Endorsement count
  count: number;
}

export const EndorsementSchema = SchemaFactory.createForClass(Endorsement);
