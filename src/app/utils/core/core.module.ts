import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronService } from 'app/utils/core/services/electron/electron.service';

@NgModule({
  declarations: [],
  providers: [
    ElectronService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
}
