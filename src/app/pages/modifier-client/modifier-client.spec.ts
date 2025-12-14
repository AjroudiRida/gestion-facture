import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierClient } from './modifier-client';

describe('ModifierClient', () => {
  let component: ModifierClient;
  let fixture: ComponentFixture<ModifierClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
