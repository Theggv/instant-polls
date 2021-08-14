export type DuplicateCheckTypes = 'none' | 'ip' | 'cookies';

export interface PollDraft {
  title: string;
  options: string[];
  multiple: boolean;
  useCaptcha: boolean;
  checkDuplicates: DuplicateCheckTypes;
}
