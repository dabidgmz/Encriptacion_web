import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { IndexUsersComponent } from './index-user/index-user.component';
export const routes: Routes = [
    { path: 'user_index', component: IndexUsersComponent},
];

