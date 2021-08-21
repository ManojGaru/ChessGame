import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChessBoardAnalyticsPage } from './chess-board-analytics.page';

const routes: Routes = [
  {
    path: '',
    component: ChessBoardAnalyticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChessBoardAnalyticsPageRoutingModule {}
