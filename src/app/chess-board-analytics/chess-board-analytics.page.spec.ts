import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChessBoardAnalyticsPage } from './chess-board-analytics.page';

describe('ChessBoardAnalyticsPage', () => {
  let component: ChessBoardAnalyticsPage;
  let fixture: ComponentFixture<ChessBoardAnalyticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessBoardAnalyticsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChessBoardAnalyticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
