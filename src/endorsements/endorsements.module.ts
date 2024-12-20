import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EndorsementsService } from './endorsements.service';
import { EndorsementsController } from './endorsements.controller';
import { Endorsement, EndorsementSchema } from './entities/endorsement.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Endorsement.name, schema: EndorsementSchema }]),
  ],
  providers: [EndorsementsService],
  controllers: [EndorsementsController],
})
export class EndorsementsModule {}
