import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ChessBoardDetailsPageRoutingModule } from './chess-board-details-routing.module';

import { ChessBoardDetailsPage } from './chess-board-details.page';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChessBoardDetailsPageRoutingModule,
    NgxChessBoardModule.forRoot(),
    ColorPickerModule
  ],
  declarations: [ChessBoardDetailsPage],
  providers:[FileChooser,FilePath,File,FileOpener,FileTransfer]
})
export class ChessBoardDetailsPageModule {}
