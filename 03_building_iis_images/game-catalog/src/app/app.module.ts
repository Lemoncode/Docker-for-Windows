import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameSummaryComponent } from './game/game-summary.component';
import { GameSellersComponent } from './game/game-sellers.component';
import { CreateGameComponent } from './game/create-game.component';
import { GameListComponent } from './game/game-list.component';
import { CreateSellerComponent } from './seller/create-seller.component';
import { NavbarComponent } from './shell/navbar.component';
import { NotFoundComponent } from './errors/not-found.component';
import { SellerDetailsComponent } from './seller/seller-details.component';

import { AvailablePipe } from './shared/available.pipe';

import { GameStockService } from './services/game-stock.service';
import { SellerCategoryService } from './services/seller-category.service';
import { GameRouterActivatorService } from './services/game-router-activator.service';
import { CHECK_DIRTY_TOKEN, checkDirtyState } from './services/check-dirty.service';

import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    GameSummaryComponent,
    GameSellersComponent,
    CreateGameComponent,
    GameListComponent,
    CreateSellerComponent,
    NavbarComponent,
    NotFoundComponent,
    SellerDetailsComponent,
    AvailablePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    GameStockService,
    SellerCategoryService,
    GameRouterActivatorService,
    {
      provide: CHECK_DIRTY_TOKEN,
      useValue: checkDirtyState,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
