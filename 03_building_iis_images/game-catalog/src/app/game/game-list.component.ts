import { Component, OnInit } from '@angular/core';
import { GameStockService } from '../services/game-stock.service';
import { Game } from '../models/game.model';
import { ISeller } from '../models/seller.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styles: []
})
export class GameListComponent implements OnInit {
  games: Game[];
  selectedGameInfo: string;
  sellers: ISeller[];
  
  constructor(private gameStockService: GameStockService) {}

  gameChangeHandler($event) {
    console.log($event);
    const sellers = this.gameStockService.getGameSellers($event);
    const selectedGame = this.gameStockService.getGame($event);
    this.selectedGameInfo = `${selectedGame.name}. Age:${selectedGame.getYearsFromRelease()}`;
    this.sellers = (sellers && sellers.length) ? sellers : [];
  }

  ngOnInit(): void {
    this.games = this.gameStockService.getGames();
  }
}
