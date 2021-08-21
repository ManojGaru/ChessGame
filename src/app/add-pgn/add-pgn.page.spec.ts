import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPGNPage } from './add-pgn.page';

describe('AddPGNPage', () => {
  let component: AddPGNPage;
  let fixture: ComponentFixture<AddPGNPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPGNPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPGNPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
