import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllTournamentPageRoutingModule } from './all-tournament-routing.module';

import { AllTournamentPage } from './all-tournament.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllTournamentPageRoutingModule
  ],
  declarations: [AllTournamentPage]
})
export class AllTournamentPageModule {}
