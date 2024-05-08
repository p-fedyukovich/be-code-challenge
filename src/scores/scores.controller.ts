import { Body, Controller, Post } from '@nestjs/common';
import { ScoresService } from './services/scores.service';
import {
  CalculateScoreBody,
  CalculateScoreResponse,
} from './dto/calculate-score.dto';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  calculateScore(@Body() data: CalculateScoreBody): CalculateScoreResponse {
    try {
      return this.scoresService.calculateScore(data);
    } catch (error) {
      return {
        score: 0,
        status: 'fail',
      };
    }
  }
}
