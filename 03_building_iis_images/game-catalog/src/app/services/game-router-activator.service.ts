import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { GameStockService } from './game-stock.service';

@Injectable()
export class GameRouterActivatorService implements CanActivate {
  constructor(private gameStockService: GameStockService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const gameExists = !!this.gameStockService.getGame(route.params['id']);
    if (!gameExists) {
      this.router.navigate(['/404'])
        .then(() => true);
    }
    return gameExists;
  }
}
