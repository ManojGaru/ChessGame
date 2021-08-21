import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRoundsPage } from './add-rounds.page';

describe('AddRoundsPage', () => {
  let component: AddRoundsPage;
  let fixture: ComponentFixture<AddRoundsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoundsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRoundsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
