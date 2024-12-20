import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class Reviews extends Document {
  @Prop({ required: true }) // Title field, no unique constraint unless explicitly needed
  title: string;

  @Prop({ required: true }) // Freelancer ID
  freelancerId: string;

  @Prop({ required: true }) // Client ID
  userId: string;

  @Prop({ required: true }) // Project ID
  projectId: string;

  @Prop({ required: true, type: Number, min: 0,max: 5 }) // Rating (decimal between 0 and 5)
  rating: number;

  @Prop({ required: false }) // Review text (optional)
  review: string;

  // Timestamps are automatically handled by `{ timestamps: true }`
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);
