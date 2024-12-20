import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reviews } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews.name) private readonly reviewsModel: Model<Reviews>,
  ) {}

  async createReview(data: Partial<Reviews>) {
    const newReview = new this.reviewsModel(data);
    return newReview.save();
  }

  async getReviewsByFreelancer(freelancerId: string) {
    return this.reviewsModel.find({ freelancerId }).exec();
  }
}
