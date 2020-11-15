import { Component, HostBinding, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { JoystickApiService } from '../../domain/api/joystick-api.service';

@Component({
  selector: 'app-joystick-clear-button',
  templateUrl: './joystick-clear-button.component.html',
  styleUrls: ['./joystick-clear-button.component.scss']
})
export class JoystickClearButtonComponent implements OnInit {

  @HostBinding('class')
  private readonly classes = 'joystick-clear-button';

  constructor(
    private readonly socket: Socket,
    private readonly joystickApiService: JoystickApiService
  ) {
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.joystickApiService.sendClear();
  }
}
