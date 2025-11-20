import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      isFamiliar: [false],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      nomeFamiliar: [''],
      nomeHospede: [''],
      cpfHospede: [''],
    });

    this.setupFamiliarValidation();
  }

  setupFamiliarValidation(): void {
    // ... (mantenha sua lógica de validação aqui, ela está correta) ...
    this.loginForm.get('isFamiliar')?.valueChanges.subscribe((isFamiliar: boolean) => {
        if (isFamiliar) {
            this.loginForm.get('nomeFamiliar')?.setValidators([Validators.required]);
            this.loginForm.get('nomeHospede')?.setValidators([Validators.required]);
            this.loginForm.get('cpfHospede')?.setValidators([Validators.required, Validators.minLength(11)]);
            this.loginForm.get('email')?.clearValidators();
            this.loginForm.get('senha')?.clearValidators();
        } else {
            this.loginForm.get('nomeFamiliar')?.clearValidators();
            this.loginForm.get('nomeHospede')?.clearValidators();
            this.loginForm.get('cpfHospede')?.clearValidators();
            this.loginForm.get('email')?.setValidators([Validators.required, Validators.email]);
            this.loginForm.get('senha')?.setValidators([Validators.required, Validators.minLength(6)]);
        }
        this.loginForm.get('nomeFamiliar')?.updateValueAndValidity();
        this.loginForm.get('nomeHospede')?.updateValueAndValidity();
        this.loginForm.get('cpfHospede')?.updateValueAndValidity();
        this.loginForm.get('email')?.updateValueAndValidity();
        this.loginForm.get('senha')?.updateValueAndValidity();
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Preencha corretamente os campos.';
      return;
    }

    const payload = this.loginForm.value;

    // Lógica para ADMIN (Email/Senha)
    if (!payload.isFamiliar) {
      const { email, senha } = payload;

      this.authService.login(email, senha).subscribe({
        next: (sucesso) => {
          if (sucesso) {
            // Verifica o perfil para redirecionar para o lugar certo
            const perfil = this.authService.getPerfil();
            
            if (perfil === 'ADMIN') {
                this.router.navigate(['/admin/dashboard']);
            } else if (perfil === 'CUIDADOR_PROFISSIONAL') {
                 // Se tiver rota específica para cuidador, redirecione aqui
                 // Por enquanto pode ser a mesma dashboard ou outra
                 this.router.navigate(['/admin/dashboard']); 
            } else {
                // Fallback
                this.router.navigate(['/home']);
            }
          } else {
            this.errorMessage = 'Email ou senha inválidos.';
          }
        },
        error: (err) => {
          console.error(err);
          // Trata o erro 401 especificamente se quiser
          if (err.status === 401) {
              this.errorMessage = 'Email ou senha incorretos.';
          } else {
              this.errorMessage = 'Erro de conexão com o servidor.';
          }
        }
      });
    } else {
      // Lógica para FAMILIAR (Mantida igual, assumindo que loginFamiliar trata o redirecionamento ou retorna true)
      const { nomeFamiliar, nomeHospede, cpfHospede } = payload;
      // ... (sua lógica de familiar) ...
        alert('Funcionalidade de login familiar em desenvolvimento/mock.');
    }
  }
}