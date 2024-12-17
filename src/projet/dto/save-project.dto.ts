import { IsString } from 'class-validator';

export class SaveProjectDto {
  @IsString()
  userId: string;

  @IsString()
  projectId: string;
}
