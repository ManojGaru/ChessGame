import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChessBoardDetailsPage } from './chess-board-details.page';

const routes: Routes = [
  {
    path: '',
    component: ChessBoardDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChessBoardDetailsPageRoutingModule {}
