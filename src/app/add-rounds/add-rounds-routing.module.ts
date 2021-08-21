import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddRoundsPage } from './add-rounds.page';

const routes: Routes = [
  {
    path: '',
    component: AddRoundsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRoundsPageRoutingModule {}
