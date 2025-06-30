import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnTransitionComponent } from './turn-transition.component';

describe('TurnTransitionComponent', () => {
  let component: TurnTransitionComponent;
  let fixture: ComponentFixture<TurnTransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnTransitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
