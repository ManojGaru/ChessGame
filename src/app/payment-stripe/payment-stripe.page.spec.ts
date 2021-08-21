import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentStripePage } from './payment-stripe.page';

describe('PaymentStripePage', () => {
  let component: PaymentStripePage;
  let fixture: ComponentFixture<PaymentStripePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentStripePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentStripePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
