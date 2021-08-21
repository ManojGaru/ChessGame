import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChessBoardPage } from './chess-board.page';

const routes: Routes = [
  {
    path: '',
    component: ChessBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChessBoardPageRoutingModule {}
