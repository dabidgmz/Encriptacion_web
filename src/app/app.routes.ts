import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { IndexUsersComponent } from './index-user/index-user.component';
import { LoginFormComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { ChatReciveComponent } from './chat-recive/chat-recive.component';
export const routes: Routes = [
    { path: 'login', component: LoginFormComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'user_index', component: IndexUsersComponent},
    { path: 'chat', component: ChatComponent},
    { path: 'recive', component: ChatReciveComponent},
];

