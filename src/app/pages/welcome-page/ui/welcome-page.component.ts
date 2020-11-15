import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { IpcRenderer } from 'electron';
import { ElectronService } from 'app/utils/core/services/electron/electron.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomePageComponent implements OnInit {

  isActivated = false;
  pilotAddress: string;

  @ViewChild('buttonElement')
  buttonElement: ElementRef<HTMLButtonElement>;

  @ViewChild('inputElement')
  inputElement: ElementRef<HTMLInputElement>;

  @HostBinding('class.welcome-page')
  private readonly classWelcomePage = true;

  private ipcRenderer: IpcRenderer;

  constructor(
    private readonly electronService: ElectronService,
    private readonly renderer: Renderer2,
    private readonly changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.selectIpcRenderer();
  }

  onButtonClick(): void {
    if (!this.pilotAddress) {
      return;
    }

    if (this.isActivated) {
      this.renderer.removeClass(this.buttonElement.nativeElement, 'welcome-page__button--active');
      this.inputElement.nativeElement.disabled = false;
      this.turnOffServer();
    } else {
      this.renderer.addClass(this.buttonElement.nativeElement, 'welcome-page__button--active');
      this.inputElement.nativeElement.disabled = true;
      this.turnOnServer();
    }

    this.isActivated = !this.isActivated;
    this.changeDetector.detectChanges();
  }

  private selectIpcRenderer(): void {
    this.electronService.selectIpcRenderer()
      .subscribe((ipcRenderer: IpcRenderer | null) => {
        if (!ipcRenderer) {
          return;
        }

        this.ipcRenderer = ipcRenderer;
      });
  }

  private turnOnServer(): void {
    this.ipcRenderer.sendSync('turnon', this.pilotAddress);
  }

  private turnOffServer(): void {
    this.ipcRenderer.sendSync('turnoff');
  }
}
