import { Test, TestingModule } from '@nestjs/testing';
import { ScoresService } from './scores.service';
import { ScoresModule } from '../scores.module';

describe('ScoresService', () => {
  let service: ScoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScoresModule],
    }).compile();

    service = module.get<ScoresService>(ScoresService);
  });

  it('should return 0 score if contains bad words', () => {
    const res = service.calculateScore({
      questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [],
      user_data: {
        completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
        discordRoles: ['1163897602547392553', '1194056197100286162'],
        level: 3,
      },
      submission_text: "Don't be an ash0le",
    });

    expect(res).toMatchObject({
      score: 0,
      status: 'fail',
    });
  });

  it('should return 1 score if contains only punctuations', () => {
    const res = service.calculateScore({
      questId: '4569bee2-8f42-4054-b432-68f6ddbc20b1',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [],
      user_data: {
        completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
        discordRoles: ['1163897602547392553', '1194056197100286162'],
        level: 3,
      },
      submission_text: '. ! ? ,',
    });

    expect(res).toMatchObject({
      score: 1,
      status: 'fail',
    });
  });

  it('should return 3 score if contains all happy words ', () => {
    const res = service.calculateScore({
      questId: '4569bee2-8f42-4054-b432-68f6ddbc20b2',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [],
      user_data: {
        completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
        discordRoles: ['1163897602547392553', '1194056197100286162'],
        level: 3,
      },
      submission_text: ['joyful', 'vibrant', 'euphoric', 'delighted'].join(' '),
    });

    expect(res).toMatchObject({
      score: 3,
      status: 'fail',
    });
  });

  it('should return 2 score if contains repetitive sequences', () => {
    const res = service.calculateScore({
      questId: '4569bee2-8f42-4054-b432-68f6ddbc20b3',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [],
      user_data: {
        completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
        discordRoles: ['1163897602547392553', '1194056197100286162'],
        level: 3,
      },
      submission_text: 'abaaba',
    });

    expect(res).toMatchObject({
      score: 2,
      status: 'fail',
    });
  });

  it('should return 6  score success if all requirements are met', () => {
    const res = service.calculateScore({
      questId: '4569bee2-8f42-4054-b432-68f6ddbc20b4',
      userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
      claimed_at: '2023-03-15T10:44:22+0000',
      access_condition: [],
      user_data: {
        completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
        discordRoles: ['1163897602547392553', '1194056197100286162'],
        level: 3,
      },
      submission_text:
        'I am joyful and vibrant and happy, because I wrote this tests!! Yeaaaah!',
    });

    expect(res).toMatchObject({
      score: 6,
      status: 'success',
    });
  });
});
