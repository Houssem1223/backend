import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async createReview(@Body() body) {
    return this.reviewsService.createReview(body);
  }
  

  @Get(':freelancerId')
  async getReviews(@Param('freelancerId') freelancerId: string) {
    return this.reviewsService.getReviewsByFreelancer(freelancerId);
  }
}
