export interface AppUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  appUserRole: string;
  locked: boolean;
  enabled: boolean;
}


