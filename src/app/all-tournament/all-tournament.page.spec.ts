import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllTournamentPage } from './all-tournament.page';

describe('AllTournamentPage', () => {
  let component: AllTournamentPage;
  let fixture: ComponentFixture<AllTournamentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTournamentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllTournamentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
