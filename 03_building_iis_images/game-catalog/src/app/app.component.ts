import { Component } from '@angular/core';
// import { Game } from './models/game.model';
// import { ISeller } from './models/seller.model';
// import { GameStockService } from './services/game-stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'Displaying Collection Demo';
  // games: Game[];
  // selectedGameInfo: string;
  // sellers: ISeller[];
  // show = true;

  // constructor(private gameStockService: GameStockService) {}

  // gameChangeHandler($event) {
  //   console.log($event);
  //   const sellers = this.gameStockService.getGameSellers($event);
  //   const selectedGame = this.gameStockService.getGame($event);
  //   this.selectedGameInfo = `${selectedGame.name}. Age:${selectedGame.getYearsFromRelease()}`;
  //   this.sellers = (sellers && sellers.length) ? sellers : [];
  // }

  // createGameEventHandler($event) {
  //   const game = this.mapper($event);
  //   this.gameStockService.addGame(game);
  // }

  // private mapper(formValues: any): Game {
  //   return new Game(formValues.name, formValues.daterelease, formValues.imageUrl);
  // }

  // ngOnInit(): void {
  //   // this.games = this.gameStockService.getGames();
  // }
}
