import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './home.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate:[HomeGuard]
  },
   {
    path: 'home',
    loadChildren: ()=>import('./home/home.module').then(m => m.HomePageModule)
   },
   {
    path: 'tasks-home',
    loadChildren: ()=>import('./tasks/tasks-home/tasks-home.module').then(m => m.TasksHomePageModule)
   },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tasks-create',
    loadChildren: () => import('./tasks/tasks-create/tasks-create.module').then(m => m.TasksCreatePageModule)
  },
  {
    path: 'tasks-view',
    loadChildren: () => import('./tasks/tasks-view/tasks-view.module').then( m => m.TasksViewPageModule)
  },
  {
    path: 'money-manager-home',
    loadChildren: () => import('./money-manager/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./money-manager/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'spend-graphs',
    loadChildren: () => import('./money-manager/spend-graphs/spend-graphs.module').then( m => m.SpendGraphsPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./money-manager/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
