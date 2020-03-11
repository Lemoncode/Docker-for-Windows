import { Component } from '@angular/core';
import { GameStockService } from '../services/game-stock.service';
import { Game } from '../models/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styles: [`
    em { color: red; }
  `]
})
export class CreateGameComponent {
  isDirty = true;
  mouseoverLogin: boolean;
  name: string;
  imageurl: string;
  daterelease: string;

  constructor(
    private gameStockService: GameStockService,
    private router: Router
  ) { }

  createGame(formValues: any) {
    this.isDirty = false;
    const game = this.mapper(formValues);
    this.gameStockService.addGame(game);
    this.router.navigate(['/games']);
  }

  private mapper(formValues: any): Game {
    return new Game(formValues.name, formValues.daterelease, formValues.imageUrl);
  }

  cancel() {
    this.router.navigate(['/games']);
  }
}
