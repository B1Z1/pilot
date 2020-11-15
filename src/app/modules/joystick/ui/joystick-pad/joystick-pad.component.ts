import {
  AfterViewInit, ApplicationRef,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { JoystickApiService } from '../../domain/api/joystick-api.service';

@Component({
  selector: 'app-joystick-pad',
  templateUrl: './joystick-pad.component.html',
  styleUrls: ['./joystick-pad.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoystickPadComponent implements OnInit, AfterViewInit {

  private static SEND_INTERVAL = 50;

  @ViewChild('joystickButton')
  joystickButton: ElementRef<HTMLDivElement>;

  @HostBinding('class')
  private readonly classes = 'joystick-pad';

  private clickedX = 0;
  private clickedY = 0;

  private deviceCenterX = 0;
  private deviceCenterY = 0;

  private computerNextX = 0;
  private computerNextY = 0;

  private moveInterval: Subscription;

  private isMoved = false;

  private readonly joystickBaseX = -64;
  private readonly joystickBaseY = -64;
  private readonly maximumRadius = 96;
  private readonly joystickRadius = 64;

  constructor(
    private readonly renderer: Renderer2,
    private readonly joystickApiService: JoystickApiService,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setCenterCoords();
  }

  onJoystickTouchStart(event: TouchEvent): void {
    const {pageX, pageY} = event.changedTouches[0];
    const clickedX = this.deviceCenterX - pageX;
    const clickedY = this.deviceCenterY - pageY;

    this.setClickedPosition(clickedX, clickedY);
    this.subscribeOnMoveInterval();
  }

  onJoystickTouchMove(event: TouchEvent): void {
    const {newX, newY} = this.calculateCoordsFromTouchEvent(event);
    const nextComputerX = newX - this.joystickBaseX;
    const nextComputerY = newY - this.joystickBaseY;

    this.isMoved = true;

    this.setComputerNextPosition(nextComputerX, nextComputerY);
    this.setJoystickBallCoords(newX, newY);
  }

  onJoystickTouchEnd(): void {
    if (!this.isMoved) {
      this.joystickApiService.sendClick();
    } else {
      this.resetJoystickCoords();
    }

    this.isMoved = false;

    this.unsubscribeFromMoveInterval();
  }

  private setCenterCoords(): void {
    const {innerWidth, innerHeight} = window;
    this.deviceCenterX = innerWidth / 2;
    this.deviceCenterY = innerHeight / 2;
  }

  private subscribeOnMoveInterval(): void {
    this.moveInterval = interval(JoystickPadComponent.SEND_INTERVAL)
      .subscribe(() => {
        this.joystickApiService.sendMove(this.computerNextX, this.computerNextY);
      });
  }

  private unsubscribeFromMoveInterval(): void {
    this.moveInterval.unsubscribe();
  }

  private calculateCoordsFromTouchEvent(event: TouchEvent): { newX: number, newY: number } {
    const {pageX, pageY} = event.changedTouches[0];
    const halfJoystickRadius = this.joystickRadius / 2;
    const dX = this.deviceCenterX - pageX - this.clickedX;
    const dY = this.deviceCenterY - pageY - this.clickedY;
    const angle = this.getAngle(dX, dY);
    const distance = this.getDistance(dX, dY) + halfJoystickRadius;
    let newX = dX;
    let newY = dY;

    if (distance >= this.maximumRadius) {
      const radiusDiff = this.maximumRadius - halfJoystickRadius;
      newX = radiusDiff * Math.cos(angle);
      newY = radiusDiff * Math.sin(angle);
    }

    newX = this.joystickBaseX - newX;
    newY = this.joystickBaseY - newY;

    return {newX, newY};
  }

  private resetJoystickCoords(): void {
    this.setJoystickBallCoords(this.joystickBaseX, this.joystickBaseY);
    this.setComputerNextPosition(0, 0);
  }

  private setJoystickBallCoords(x: number, y: number): void {
    this.renderer.setStyle(this.joystickButton.nativeElement, 'transform', `translate(${ x }px, ${ y }px)`);
  }

  private setComputerNextPosition(x: number, y: number): void {
    this.computerNextX = x;
    this.computerNextY = y;
  }

  private setClickedPosition(x: number, y: number): void {
    this.clickedX = x;
    this.clickedY = y;
  }

  private getAngle(dX: number, dY: number): number {
    return Math.atan2(dY, dX);
  }

  private getDistance(dX: number, dY: number): number {
    return Math.sqrt(dX ** 2 + dY ** 2);
  }
}
