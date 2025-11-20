import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';

// Tipos de campo suportados
type CampoTipo =
  | 'text'
  | 'email'
  | 'password'
  | 'date'
  | 'select'
  | 'number'
  | 'textarea'
  | 'array';

// Estrutura de opções para selects
interface Opcao {
  value: string;
  label: string;
}

// Estrutura de configuração de cada campo
export interface CampoConfig {
  nome: string; // nome do campo (precisa bater com o backend)
  label: string; // label exibida no formulário
  tipo: CampoTipo; // tipo de input
  placeholder?: string; // placeholder opcional
  validacao?: any[]; // validadores Angular (ex: [Validators.required])
  opcoes?: Opcao[]; // opções para select
  arrayItemPlaceholder?: string; // placeholder para itens de array
}

@Component({
  selector: 'app-form-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-cadastro.html',
  styleUrls: ['./form-cadastro.scss'],
})
export class FormCadastro {
  @Input() campos: CampoConfig[] = []; // configuração dos campos
  @Input() initialValue: any = null; // valores iniciais (edição)
  @Input() salvarLabel = 'Salvar'; // texto do botão
  @Input() titulo?: string; // título opcional

  @Output() submitForm = new EventEmitter<any>(); // evento de submit

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: Record<string, any> = {};

    this.campos.forEach((c) => {
      if (c.tipo === 'array') {
        group[c.nome] = this.fb.array([]);
      } else {
        const valorInicial = this.initialValue?.[c.nome] ?? '';
        group[c.nome] = [valorInicial, c.validacao || []];
      }
    });

    this.form = this.fb.group(group);

    // Preencher arrays iniciais se vierem no initialValue
    this.campos
      .filter((c) => c.tipo === 'array')
      .forEach((c) => {
        const arr = this.form.get(c.nome) as FormArray;
        const valores = Array.isArray(this.initialValue?.[c.nome]) ? this.initialValue[c.nome] : [];
        valores.forEach((v: string) => arr.push(this.fb.control(v)));
      });
  }

  // helper para retornar FormControl com cast seguro
  getControl(name: string): FormControl | null {
    return this.form.get(name) as FormControl | null;
  }

  // helper para retornar FormArray com cast seguro
  getArray(name: string): FormArray<FormControl> {
    return this.form.get(name) as FormArray<FormControl>;
  }

  addArrayItem(name: string): void {
    const arr = this.getArray(name);
    arr.push(new FormControl(''));
  }

  removeArrayItem(name: string, index: number): void {
    const arr = this.getArray(name);
    if (arr && arr.length > index) {
      arr.removeAt(index);
    }
  }

  // Submissão
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(this.form.value);
  }
}
