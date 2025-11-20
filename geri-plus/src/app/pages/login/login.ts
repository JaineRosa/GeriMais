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
      email: ['', [Validators.required, Validators.email]], // usado só para Admin
      senha: ['', [Validators.required, Validators.minLength(6)]], // usado só para Admin
      nomeFamiliar: [''], // usado só para Familiar
      nomeHospede: [''], // usado só para Familiar
      cpfHospede: [''], // usado só para Familiar
    });

    this.setupFamiliarValidation();
  }

  setupFamiliarValidation(): void {
    this.loginForm.get('isFamiliar')?.valueChanges.subscribe((isFamiliar: boolean) => {
      if (isFamiliar) {
        // 🔹 Familiar → exige nomeFamiliar, nomeHospede e cpfHospede
        this.loginForm.get('nomeFamiliar')?.setValidators([Validators.required]);
        this.loginForm.get('nomeHospede')?.setValidators([Validators.required]);
        this.loginForm
          .get('cpfHospede')
          ?.setValidators([Validators.required, Validators.minLength(11)]);
        this.loginForm.get('email')?.clearValidators();
        this.loginForm.get('senha')?.clearValidators();
      } else {
        // 🔹 Admin → exige email e senha
        this.loginForm.get('nomeFamiliar')?.clearValidators();
        this.loginForm.get('nomeHospede')?.clearValidators();
        this.loginForm.get('cpfHospede')?.clearValidators();
        this.loginForm.get('email')?.setValidators([Validators.required, Validators.email]);
        this.loginForm.get('senha')?.setValidators([Validators.required, Validators.minLength(6)]);
      }

      // Atualiza validação
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
    console.log('Payload enviado:', payload);

    if (!payload.isFamiliar) {
      // 🔹 Login Admin
      const { email, senha } = payload;
      if (email && senha) {
        alert('Login Admin realizado com sucesso!');
        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            token: 'mock-token-123',
            expiresIn: 3600,
            user: {
              id: '1',
              nome: 'Admin Mock',
              email,
              tipoUsuario: 'ADMIN',
            },
          })
        );
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage = 'Email ou senha inválidos.';
      }
    } else {
      // 🔹 Login Familiar
      const { nomeFamiliar, nomeHospede, cpfHospede } = payload;
      if (nomeFamiliar && nomeHospede && cpfHospede.length === 11) {
        alert('Login Familiar realizado com sucesso!');
        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            token: 'mock-token-123',
            expiresIn: 3600,
            user: {
              id: '2',
              nome: nomeFamiliar,
              tipoUsuario: 'FAMILIAR',
              hospede: {
                nome: nomeHospede,
                cpf: cpfHospede,
              },
            },
          })
        );
        // 👉 Redireciona para o painel do idoso (mockando id = 123)
        this.router.navigate([`/painel-idoso/123`]);
      } else {
        this.errorMessage = 'Dados do familiar inválidos.';
      }
    }
  }
}
