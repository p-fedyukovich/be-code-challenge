import { AccessCondition, UserData } from '../score.interfaces';

export interface CalculateScoreBody {
  questId: string;
  userId: string;
  claimed_at: string;
  access_condition: AccessCondition[];
  user_data: UserData;
  submission_text: string;
}

export interface CalculateScoreResponse {
  status: 'success' | 'fail';
  score: number;
}
