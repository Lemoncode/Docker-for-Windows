import { InjectionToken } from '@angular/core';
import { CreateGameComponent } from '../game/create-game.component';

export let CHECK_DIRTY_TOKEN = new InjectionToken('checkDirty');

export function checkDirtyState(component: CreateGameComponent) {
  if (component.isDirty) {
    return window.confirm('Changes without saving!!');
  }
  return true;
}
