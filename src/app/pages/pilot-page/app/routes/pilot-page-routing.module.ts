import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PilotPageComponent } from 'app/pages/pilot-page/ui/pilot-page.component';

const routes: Routes = [
  {
    path: '',
    component: PilotPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PilotPageRoutingModule {
}
