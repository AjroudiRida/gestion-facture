import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterFacture } from './ajouter-facture';

describe('AjouterFacture', () => {
  let component: AjouterFacture;
  let fixture: ComponentFixture<AjouterFacture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterFacture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterFacture);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
