import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPGNPage } from './add-pgn.page';

const routes: Routes = [
  {
    path: '',
    component: AddPGNPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPGNPageRoutingModule {}
