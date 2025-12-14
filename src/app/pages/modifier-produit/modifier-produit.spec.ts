import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierProduit } from './modifier-produit';

describe('ModifierProduit', () => {
  let component: ModifierProduit;
  let fixture: ComponentFixture<ModifierProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierProduit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierProduit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
