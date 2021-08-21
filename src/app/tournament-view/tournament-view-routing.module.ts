import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentViewPage } from './tournament-view.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentViewPageRoutingModule {}
