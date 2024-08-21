import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCobrancaComponent } from './edit-cobranca.component';

describe('EditCobrancaComponent', () => {
  let component: EditCobrancaComponent;
  let fixture: ComponentFixture<EditCobrancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCobrancaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
