import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllTournamentPage } from './all-tournament.page';

const routes: Routes = [
  {
    path: '',
    component: AllTournamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTournamentPageRoutingModule {}
