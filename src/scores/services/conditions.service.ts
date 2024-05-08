import { Injectable } from '@nestjs/common';
import { CalculateScoreBody } from '../dto/calculate-score.dto';
import { AccessCondition, UserData } from '../score.interfaces';

@Injectable()
export class ConditionsService {
  validateAccessConditions(data: CalculateScoreBody) {
    for (const accessCondition of data.access_condition) {
      switch (accessCondition.type) {
        case 'discordRole':
          this.validateDiscordRole(accessCondition, data.user_data);
          break;
        case 'date':
          this.validateDate(accessCondition, data.claimed_at);
          break;
        case 'level':
          this.validateLevel(accessCondition, data.user_data.level);
          break;
      }
    }

    return true;
  }

  private validateDiscordRole(
    accessCondition: AccessCondition,
    userData: UserData,
  ) {
    const isRoleIncluded = userData.discordRoles.includes(
      accessCondition.value,
    );

    if (accessCondition.operator === 'contains' && !isRoleIncluded) {
      throw new Error("User doesn't have the required role");
    }

    if (accessCondition.operator === 'notContains' && isRoleIncluded) {
      throw new Error('User has the required role');
    }
  }

  private validateDate(accessCondition: AccessCondition, claimedAt: string) {
    const claimedAtDate = new Date(claimedAt);
    const conditionValueDate = new Date(accessCondition.value);

    const isAfter = claimedAtDate > conditionValueDate;

    if (accessCondition.operator === '<' && isAfter) {
      throw new Error('Claimed date is not before the required date');
    }

    if (accessCondition.operator === '>' && !isAfter) {
      throw new Error('Claimed date is before the required date');
    }
  }

  private validateLevel(accessCondition: AccessCondition, level: number) {
    const conditionLevel = Number(accessCondition.value);

    if (isNaN(conditionLevel)) {
      throw new Error('Invalid condition level');
    }

    const isGreater = level > conditionLevel;

    if (accessCondition.operator === '<' && isGreater) {
      throw new Error('User level is greater than the required level');
    }

    if (accessCondition.operator === '>' && !isGreater) {
      throw new Error('User level is less than the required level');
    }
  }
}
