import { Test, TestingModule } from '@nestjs/testing';
import { ConditionsService } from './conditions.service';
import { ScoresModule } from '../scores.module';

describe('ConditionsService', () => {
  let service: ConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ScoresModule],
    }).compile();

    service = module.get<ConditionsService>(ConditionsService);
  });

  describe('validateDiscordRole', () => {
    describe('contains', () => {
      it('should return true', () => {
        const isValid = service.validateAccessConditions({
          questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
          userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
          claimed_at: '2023-03-15T10:44:22+0000',
          access_condition: [
            {
              type: 'discordRole',
              operator: 'contains',
              value: '1163897602547392553',
            },
          ],
          user_data: {
            completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
            discordRoles: ['1163897602547392553', '1194056197100286162'],
            level: 3,
          },
          submission_text: 'Lorem ipsum dolor sit amet.', // string
        });

        expect(isValid).toBe(true);
      });

      it('should throw error', () => {
        try {
          service.validateAccessConditions({
            questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
            userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
            claimed_at: '2023-03-15T10:44:22+0000',
            access_condition: [
              {
                type: 'discordRole',
                operator: 'contains',
                value: '1163897602547392553',
              },
            ],
            user_data: {
              completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
              discordRoles: ['1194056197100286162'],
              level: 3,
            },
            submission_text: 'Lorem ipsum dolor sit amet.', // string
          });
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });
    });

    describe('notContains', () => {
      it('should return true', () => {
        const isValid = service.validateAccessConditions({
          questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
          userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
          claimed_at: '2023-03-15T10:44:22+0000',
          access_condition: [
            {
              type: 'discordRole',
              operator: 'notContains',
              value: '1163897602547392553',
            },
          ],
          user_data: {
            completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
            discordRoles: ['1194056197100286162'],
            level: 3,
          },
          submission_text: 'Lorem ipsum dolor sit amet.', // string
        });

        expect(isValid).toBe(true);
      });

      it('should throw error', () => {
        try {
          service.validateAccessConditions({
            questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
            userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
            claimed_at: '2023-03-15T10:44:22+0000',
            access_condition: [
              {
                type: 'discordRole',
                operator: 'notContains',
                value: '1163897602547392553',
              },
            ],
            user_data: {
              completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
              discordRoles: ['1163897602547392553', '1194056197100286162'],
              level: 3,
            },
            submission_text: 'Lorem ipsum dolor sit amet.', // string
          });
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });
    });
  });

  describe('validateDate', () => {
    describe('>', () => {
      it('should return true', () => {
        const isValid = service.validateAccessConditions({
          questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
          userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
          claimed_at: '2023-03-15T10:44:22+0000',
          access_condition: [
            {
              type: 'date',
              value: '2023-02-15T10:44:22+0000',
              operator: '>',
            },
          ],
          user_data: {
            completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
            discordRoles: ['1163897602547392553', '1194056197100286162'],
            level: 3,
          },
          submission_text: 'Lorem ipsum dolor sit amet.', // string
        });

        expect(isValid).toBe(true);
      });

      it('should throw error', () => {
        try {
          service.validateAccessConditions({
            questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
            userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
            claimed_at: '2023-03-15T10:44:22+0000',
            access_condition: [
              {
                type: 'date',
                value: '2022-02-15T10:44:22+0000',
                operator: '>',
              },
            ],
            user_data: {
              completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
              discordRoles: ['1194056197100286162'],
              level: 3,
            },
            submission_text: 'Lorem ipsum dolor sit amet.', // string
          });
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });
    });

    describe('<', () => {
      it('should return true', () => {
        const isValid = service.validateAccessConditions({
          questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
          userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
          claimed_at: '2023-03-15T10:44:22+0000',
          access_condition: [
            {
              type: 'date',
              value: '2023-06-15T10:44:22+0000',
              operator: '<',
            },
          ],
          user_data: {
            completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
            discordRoles: ['1194056197100286162'],
            level: 3,
          },
          submission_text: 'Lorem ipsum dolor sit amet.', // string
        });

        expect(isValid).toBe(true);
      });

      it('should throw error', () => {
        try {
          service.validateAccessConditions({
            questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
            userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
            claimed_at: '2023-03-15T10:44:22+0000',
            access_condition: [
              {
                type: 'date',
                value: '2023-02-15T10:44:22+0000',
                operator: '<',
              },
            ],
            user_data: {
              completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
              discordRoles: ['1163897602547392553', '1194056197100286162'],
              level: 3,
            },
            submission_text: 'Lorem ipsum dolor sit amet.', // string
          });
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });
    });
  });

  describe('validateLevel', () => {
    describe('>', () => {
      it('should return true', () => {
        const isValid = service.validateAccessConditions({
          questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
          userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
          claimed_at: '2023-03-15T10:44:22+0000',
          access_condition: [
            {
              type: 'level',
              value: '4',
              operator: '>',
            },
          ],
          user_data: {
            completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
            discordRoles: ['1163897602547392553', '1194056197100286162'],
            level: 5,
          },
          submission_text: 'Lorem ipsum dolor sit amet.', // string
        });

        expect(isValid).toBe(true);
      });

      it('should throw error', () => {
        try {
          service.validateAccessConditions({
            questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
            userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
            claimed_at: '2023-03-15T10:44:22+0000',
            access_condition: [
              {
                type: 'level',
                value: '4',
                operator: '>',
              },
            ],
            user_data: {
              completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
              discordRoles: ['1194056197100286162'],
              level: 3,
            },
            submission_text: 'Lorem ipsum dolor sit amet.', // string
          });
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });
    });

    describe('<', () => {
      it('should return true', () => {
        const isValid = service.validateAccessConditions({
          questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
          userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
          claimed_at: '2023-03-15T10:44:22+0000',
          access_condition: [
            {
              type: 'level',
              value: '4',
              operator: '<',
            },
          ],
          user_data: {
            completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
            discordRoles: ['1194056197100286162'],
            level: 3,
          },
          submission_text: 'Lorem ipsum dolor sit amet.', // string
        });

        expect(isValid).toBe(true);
      });

      it('should throw error', () => {
        try {
          service.validateAccessConditions({
            questId: '4569bee2-8f42-4054-b432-68f6ddbc20b5',
            userId: 'cb413e98-44a4-4bb1-aaa1-0b91ab1707e7',
            claimed_at: '2023-03-15T10:44:22+0000',
            access_condition: [
              {
                type: 'level',
                value: '1',
                operator: '<',
              },
            ],
            user_data: {
              completed_quests: ['94e2e33e-07e9-4750-8cea-c033d7706057'],
              discordRoles: ['1163897602547392553', '1194056197100286162'],
              level: 3,
            },
            submission_text: 'Lorem ipsum dolor sit amet.', // string
          });
        } catch (err) {
          expect(err).toBeInstanceOf(Error);
        }
      });
    });
  });
});
