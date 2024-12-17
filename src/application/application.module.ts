import { forwardRef, Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { MongooseModule } from '@nestjs/mongoose';  // Assurez-vous d'importer MongooseModule
import { Application, ApplicationSchema } from './entities/application.entity';  // Importer le modèle Application
import { Projet, ProjetSchema } from 'src/projet/entities/projet.entity';  // Importer le modèle Project
import { User, UserSchema } from 'src/user/entities/user.entity';;
  // Importer le modèle User
import { NotificationModule } from 'src/notification/notification.module'; // Import the NotificationModule
import { TaskModule } from 'src/task/task.module';

import { Task, TaskSchema } from 'src/task/entities/task.entity';; 
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
      { name: User.name, schema: UserSchema },
      { name: Projet.name, schema: ProjetSchema },
      {name:Task.name , schema: TaskSchema }
    ]),
    NotificationModule,
    forwardRef(() => TaskModule), // Use forwardRef here
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}