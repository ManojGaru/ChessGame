import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentViewPageRoutingModule } from './tournament-view-routing.module';

import { TournamentViewPage } from './tournament-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentViewPageRoutingModule
  ],
  declarations: [TournamentViewPage]
})
export class TournamentViewPageModule {}
