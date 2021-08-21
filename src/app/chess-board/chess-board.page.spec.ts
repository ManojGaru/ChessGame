import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChessBoardPage } from './chess-board.page';

describe('ChessBoardPage', () => {
  let component: ChessBoardPage;
  let fixture: ComponentFixture<ChessBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessBoardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChessBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
