import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TournamentViewPage } from './tournament-view.page';

describe('TournamentViewPage', () => {
  let component: TournamentViewPage;
  let fixture: ComponentFixture<TournamentViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
