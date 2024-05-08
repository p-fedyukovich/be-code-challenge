export interface AccessCondition {
  type: 'discordRole' | 'date' | 'level';
  operator: '<' | '>' | 'contains' | 'notContains';
  value: string;
}

export interface UserData {
  completed_quests: string[];
  discordRoles: string[];
  level: number;
}
