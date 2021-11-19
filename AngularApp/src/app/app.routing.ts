import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { StudentViewComponent } from "./student-view";
import { ProfessorViewComponent } from "./professor-view";
import { AdminViewComponent } from "./admin-view";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student-view', component: StudentViewComponent },
  { path: 'professor-view', component: ProfessorViewComponent },
  { path: 'admin-view', component: AdminViewComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
