import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterClient } from './ajouter-client';

describe('AjouterClient', () => {
  let component: AjouterClient;
  let fixture: ComponentFixture<AjouterClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
