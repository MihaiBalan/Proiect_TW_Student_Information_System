import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUser } from './appUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppUserService{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){ }

  public getAppUsers(appUserRole: string): Observable<AppUser[]>{
    return this.http.get<AppUser[]>(`${this.apiServerUrl}/ProiectTW/all/${appUserRole}`);
  }

  public getAppUserById(appUserId: number): Observable<AppUser>{
    return this.http.get<AppUser>(`${this.apiServerUrl}/ProiectTW/findById/${appUserId}`);
  }

  public getAppUserByEmail(appUserEmail: string | null): Observable<AppUser>{
    return this.http.get<AppUser>(`${this.apiServerUrl}/ProiectTW/findByEmail/${appUserEmail}`);
  }

  public addAppUser(appUser: AppUser): Observable<AppUser>{
    return this.http.post<AppUser>(`${this.apiServerUrl}/ProiectTW/add`,appUser);
  }

  public updateAppUser(appUser: AppUser | undefined): Observable<AppUser>{
    return this.http.put<AppUser>(`${this.apiServerUrl}/ProiectTW/update`, appUser);
  }

  public deleteAppUser(appUserId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/ProiectTW/delete/${appUserId}`);
  }

  public cryptPassword(password: string): Observable<ArrayBuffer>{
    // @ts-ignore
    return this.http.get<string>(`${this.apiServerUrl}/ProiectTW/cryptPass/${password}`,  {responseType: 'text'});
  }
}
