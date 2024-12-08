export type Gender = 'MALE' | 'FEMALE';

export interface Patient {
  id: string;
  name: string | null;
  surname: string | null;
  email: string;
  birthDate: Date | null;
  gender: Gender | null;
}
