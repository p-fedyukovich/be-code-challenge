import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './services/scores.service';
import { ConditionsService } from './services/conditions.service';

@Module({
  controllers: [ScoresController],
  providers: [ScoresService, ConditionsService],
})
export class ScoresModule {}
