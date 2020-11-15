import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { JoystickApiService } from '../../domain/api/joystick-api.service';

@Component({
  selector: 'app-joystick-text',
  templateUrl: './joystick-text.component.html',
  styleUrls: ['./joystick-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoystickTextComponent implements OnInit {

  @ViewChild('formElement')
  formElement: NgForm;

  @HostBinding('class')
  private readonly classes = 'joystick-text';

  constructor(
    private readonly socket: Socket,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly joystickApiService: JoystickApiService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.sendTextMessage();
    this.clearForm();
  }

  private sendTextMessage(): void {
    const {text} = this.formElement.value;
    this.joystickApiService.sendText(text);
  }

  private clearForm(): void {
    this.formElement.setValue({
      text: ''
    });
    this.changeDetector.detectChanges();
  }
}
