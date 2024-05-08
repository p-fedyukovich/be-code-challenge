import { Module } from '@nestjs/common';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [ScoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
