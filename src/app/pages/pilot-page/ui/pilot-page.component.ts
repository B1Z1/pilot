import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pilot-page',
  templateUrl: './pilot-page.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PilotPageComponent {
  constructor() {
  }
}
