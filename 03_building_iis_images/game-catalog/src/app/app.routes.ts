import { Routes } from '@angular/router';
import { GameListComponent } from './game/game-list.component';
import { CreateGameComponent } from './game/create-game.component';
import { CreateSellerComponent } from './seller/create-seller.component';
import { GameSellersComponent } from './game/game-sellers.component';
import { GameRouterActivatorService } from './services/game-router-activator.service';
import { NotFoundComponent } from './errors/not-found.component';
import { CHECK_DIRTY_TOKEN } from './services/check-dirty.service';

export const appRoutes: Routes = [
  { path: 'games', component: GameListComponent },
  { path: 'games/new', component: CreateGameComponent, canDeactivate: [CHECK_DIRTY_TOKEN] },
  { path: 'games/:id', component: GameSellersComponent, canActivate: [GameRouterActivatorService] },
  { path: 'seller/new', component: CreateSellerComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', redirectTo: '/games',  pathMatch: 'full' },
];
