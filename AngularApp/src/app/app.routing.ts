import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { StudentViewComponent } from "./student-view";
import { ProfessorViewComponent } from "./professor-view";
import { AdminViewComponent } from "./admin-view";
import {LogoutComponent} from "./services/logout.component";
import {AuthGaurdService} from "./services/auth.service";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'student-view', component: StudentViewComponent ,canActivate:[AuthGaurdService], data: { roles: ['Student','Admin','Professor'] }},
  { path: 'professor-view', component: ProfessorViewComponent,canActivate:[AuthGaurdService], data: { roles: ['Professor','Admin'] }},
  { path: 'admin-view', component: AdminViewComponent, canActivate:[AuthGaurdService], data: { roles: 'Admin' }},
  { path: 'logout', component: LogoutComponent, canActivate:[AuthGaurdService] },

  // otherwise redirect to login
  { path: '**', redirectTo: 'login' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
export class Router {
}
