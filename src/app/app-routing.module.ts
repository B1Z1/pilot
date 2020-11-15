import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome-page/app/welcome-page.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'pilot',
    loadChildren: () => import('./pages/pilot-page/app/pilot-page.module').then(m => m.PilotPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
