import { Component, OnInit } from '@angular/core';
import { ISeller } from '../models/seller.model';
import { ActivatedRoute } from '@angular/router';
import { GameStockService } from '../services/game-stock.service';

@Component({
  selector: 'app-game-sellers',
  templateUrl: './game-sellers.component.html',
  styles: []
})
export class GameSellersComponent implements OnInit {
  gameName: string;
  sellers: ISeller[];
  addMode = false;

  constructor(
    private route: ActivatedRoute,
    private gameStockService: GameStockService
  ) {}

  toggleAddSeller() {
    this.addMode = !this.addMode;
  }

  ngOnInit(): void {
    const game = this.gameStockService.getGame(this.route.snapshot.params['id']);
    this.gameName = game.name;
    this.sellers = game.sellers;
  }
}
