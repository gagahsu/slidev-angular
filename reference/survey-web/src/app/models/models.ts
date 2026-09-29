// 與後端 API 對應的型別（見 SURVEY-SPEC.md §7）
export interface AppResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface PageResult<T> {
  content: T[];
  page: number;          // 從 0 開始
  size: number;
  totalElements: number;
  totalPages: number;
}

export type QuestionType = 'SINGLE' | 'MULTI' | 'TEXT';
export type SurveyStatus = 'DRAFT' | 'NOT_STARTED' | 'ONGOING' | 'ENDED';

export interface Option {
  id?: number;
  label: string;
}

export interface Question {
  id?: number;
  title: string;
  type: QuestionType;
  required: boolean;
  options: Option[];       // 選項是「陣列」
}

export interface Survey {
  id?: number;
  title: string;
  description: string;
  startDate: string;       // yyyy-MM-dd
  endDate: string;
  published: boolean;
  status?: SurveyStatus;
  statusLabel?: string;
  questions: Question[];
}

export interface Answer {
  questionId: number;
  questionTitle?: string;
  values: string[];        // 單選 / 文字：一個值；多選：多個值
}

export interface Response {
  id?: number;
  surveyId?: number;
  submittedAt?: string;
  name: string;
  phone: string;
  email: string;
  age?: number | null;
  answers: Answer[];
}

export interface OptionStat { label: string; count: number; percent: number; }
export interface QuestionStat {
  questionId: number;
  title: string;
  type: QuestionType;
  answeredCount: number;
  options: OptionStat[];
  texts: string[];
}
export interface Statistics {
  surveyId: number;
  title: string;
  totalResponses: number;
  questions: QuestionStat[];
}

export interface UserInfo { id: number; name: string; email: string; phone: string; role: 'USER' | 'ADMIN'; }
export interface LoginResponse { accessToken: string; refreshToken: string; user: UserInfo; }
