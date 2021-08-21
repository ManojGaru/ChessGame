import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChessBoardPageRoutingModule } from './chess-board-routing.module';
import { ChessBoardPage } from './chess-board.page';
import { NgxChessBoardModule, NgxChessBoardService } from "ngx-chess-board";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChessBoardPageRoutingModule,
    NgxChessBoardModule.forRoot()
  ],
  declarations: [ChessBoardPage],
  
})
export class ChessBoardPageModule {}
