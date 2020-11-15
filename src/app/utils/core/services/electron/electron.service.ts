import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class ElectronService {
  private readonly ipcRenderer$: Subject<IpcRenderer | null> = new BehaviorSubject<IpcRenderer | null>(null);

  constructor() {
    if (this.isElectron()) {
      this.setIpcRenderer();
    }
  }

  isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  selectIpcRenderer(): Observable<IpcRenderer> {
    return this.ipcRenderer$.asObservable();
  }

  private setIpcRenderer(): void {
    console.log('here');
    this.ipcRenderer$.next(window.require('electron').ipcRenderer);
  }
}
