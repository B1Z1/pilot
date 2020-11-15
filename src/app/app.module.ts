import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from 'app/ui/app.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { CoreModule } from 'app/utils/core/core.module';
import { PilotPageModule } from 'app/pages/pilot-page/app/pilot-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    PilotPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
