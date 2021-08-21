import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { NgxChessBoardModule } from 'ngx-chess-board';
import { ColorPickerModule } from 'ngx-color-picker';

import { ChessBoardAnalyticsPageRoutingModule } from './chess-board-analytics-routing.module';

import { ChessBoardAnalyticsPage } from './chess-board-analytics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChessBoardAnalyticsPageRoutingModule,
    NgxChessBoardModule.forRoot(),
    ColorPickerModule
  ],
  declarations: [ChessBoardAnalyticsPage],
  providers:[FileChooser,FilePath,File,FileOpener,FileTransfer]
})
export class ChessBoardAnalyticsPageModule {}
