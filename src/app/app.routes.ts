import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { IndexUsersComponent } from './index-user/index-user.component';
import { LoginFormComponent } from './login/login.component';
export const routes: Routes = [
    { path: 'login', component: LoginFormComponent},
    { path: 'user_index', component: IndexUsersComponent},
];

