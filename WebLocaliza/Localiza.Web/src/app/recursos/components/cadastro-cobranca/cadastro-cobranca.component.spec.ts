import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCobrancaComponent } from './cadastro-cobranca.component';

describe('CadastroCobrancaComponent', () => {
  let component: CadastroCobrancaComponent;
  let fixture: ComponentFixture<CadastroCobrancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroCobrancaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
