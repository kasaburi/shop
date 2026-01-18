import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kalata } from './kalata';

describe('Kalata', () => {
  let component: Kalata;
  let fixture: ComponentFixture<Kalata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kalata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kalata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
