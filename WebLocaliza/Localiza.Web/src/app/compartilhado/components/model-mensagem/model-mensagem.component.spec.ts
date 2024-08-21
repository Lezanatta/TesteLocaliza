import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMensagemComponent } from './model-mensagem.component';

describe('ModelMensagemComponent', () => {
  let component: ModelMensagemComponent;
  let fixture: ComponentFixture<ModelMensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelMensagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
