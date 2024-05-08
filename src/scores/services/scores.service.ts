import { Injectable } from '@nestjs/common';
import {
  CalculateScoreBody,
  CalculateScoreResponse,
} from '../dto/calculate-score.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Filter = require('bad-words');
import { ConditionsService } from './conditions.service';

@Injectable()
export class ScoresService {
  private readonly userQuests: Map<string, Set<string>> = new Map();

  private static HAPPY_WORDS = new Set([
    'joyful',
    'happy',
    'vibrant',
    'thrilled',
    'euphoric',
    'cheerful',
    'delighted',
  ]);

  private static PUNCTUATIONS = new Set([',', '.', '?', '!']);
  private readonly badWordsFilter: any;

  constructor(private readonly conditionsService: ConditionsService) {
    this.badWordsFilter = new Filter();
  }

  calculateScore(data: CalculateScoreBody): CalculateScoreResponse {
    this.checkUserQuest(data);

    this.conditionsService.validateAccessConditions(data);

    const isProfane = this.isSubmissionTextProfane(data.submission_text);

    const score = isProfane
      ? 0
      : this.getSubmissionTextScore(data.submission_text);

    this.userQuests.get(data.userId)?.add(data.questId);

    return {
      score,
      status: score < 5 ? 'fail' : 'success',
    };
  }

  private checkUserQuest(data: CalculateScoreBody) {
    let userQuests = this.userQuests.get(data.userId);

    if (!userQuests) {
      userQuests = new Set(data.user_data.completed_quests);
      this.userQuests.set(data.userId, userQuests);
    } else {
      data.user_data.completed_quests.forEach((questId) => {
        userQuests.add(questId);
      });
    }

    if (userQuests.has(data.questId)) {
      throw new Error('User has already completed this quest');
    }
  }

  private getSubmissionTextScore(text: string): number {
    let score = 0;

    const charArray = text.toLowerCase().split('');

    const usedHappyWords: Set<string> = new Set();
    let hasPunctuation = false;
    let lastWord = '';

    charArray.some((char) => {
      hasPunctuation = hasPunctuation || ScoresService.PUNCTUATIONS.has(char);

      if (char.match(/[a-z]/)) {
        lastWord = lastWord + char;

        if (
          ScoresService.HAPPY_WORDS.has(lastWord) &&
          usedHappyWords.size < 3
        ) {
          usedHappyWords.add(lastWord);
        }
      } else {
        lastWord = '';
      }

      return hasPunctuation && usedHappyWords.size >= 3;
    });

    score += Number(hasPunctuation);
    score += usedHappyWords.size;

    if (text.match(/(.+)\1/g)) {
      score += 2;
    }

    return score;
  }

  private isSubmissionTextProfane(text: string) {
    return this.badWordsFilter.isProfane(text);
  }
}
