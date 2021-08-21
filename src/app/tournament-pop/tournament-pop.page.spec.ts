import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TournamentPopPage } from './tournament-pop.page';

describe('TournamentPopPage', () => {
  let component: TournamentPopPage;
  let fixture: ComponentFixture<TournamentPopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentPopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentPopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
