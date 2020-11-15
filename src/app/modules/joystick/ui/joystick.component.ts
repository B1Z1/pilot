import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoystickComponent implements OnInit {

  @HostBinding('class')
  private readonly classes = 'joystick';

  constructor() {
  }

  ngOnInit(): void {
  }

}
