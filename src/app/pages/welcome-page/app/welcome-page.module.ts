import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'app/utils/core/core.module';
import { WelcomePageComponent } from 'app/pages/welcome-page/ui/welcome-page.component';
import { WelcomePageRoutingModule } from 'app/pages/welcome-page/app/routes/welcome-page-routing.module';


@NgModule({
  declarations: [WelcomePageComponent],
  imports: [
    CommonModule,
    WelcomePageRoutingModule,
    FormsModule,
    CoreModule
  ],
  exports: [WelcomePageComponent]
})
export class WelcomePageModule {
}
