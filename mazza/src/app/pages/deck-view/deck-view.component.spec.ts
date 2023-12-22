import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDeckComponent } from './deck-view.component';

describe('OneDeckComponent', () => {
  let component: OneDeckComponent;
  let fixture: ComponentFixture<OneDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneDeckComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OneDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
