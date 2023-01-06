import { AdminGuard } from './auth/admin.guard';
import { TasksEpComponent } from './tasks/tasks-ep/tasks-ep.component';
import { TaskIndComponent } from './tasks/task-ind/task-ind.component';
import { LoginComponent } from './auth/login/login/login.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: CreatePostComponent, canActivate: [AuthGuard]},
  { path: 'edit/:postId', component: CreatePostComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'tasks', component: TasksEpComponent, canActivate: [AdminGuard]},
  { path: 'task-ind', component: TaskIndComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})

export class AppRoutingModule {}
