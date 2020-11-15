import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilotPageComponent } from 'app/pages/pilot-page/ui/pilot-page.component';
import { PilotPageRoutingModule } from 'app/pages/pilot-page/app/routes/pilot-page-routing.module';
import { JoystickModule } from 'app/modules/joystick/domain/joystick.module';


@NgModule({
  declarations: [PilotPageComponent],
  imports: [
    CommonModule,
    PilotPageRoutingModule,
    JoystickModule
  ],
  exports: [PilotPageComponent]
})
export class PilotPageModule {
}
