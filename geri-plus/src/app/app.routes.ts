import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Sobre } from './pages/sobre/sobre';
import { Dashboard } from './pages/admin-dashboard/dashboard/dashboard';
import { PainelIdoso } from './pages/painel-idoso/painel-idoso';

// Guards
import { authGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { AdminLayout } from './pages/admin-dashboard/components/admin-layout/admin-layout';
import { ListPrescricaoMedicaComponent } from './pages/admin-dashboard/list-prescricao-medica/list-prescricao-medica';
import { CadPrescricoMedica } from './pages/admin-dashboard/cadastros/cad-prescrico-medica/cad-prescrico-medica';
import { ListSaudeDiaria } from './pages/admin-dashboard/list-saude-diaria/list-saude-diaria';
import { CadSaudeDiaria } from './pages/admin-dashboard/cadastros/cad-saude-diaria/cad-saude-diaria';

export const routes: Routes = [
  { path: '', component: Home }, // rota raiz com navbar e footer
  { path: 'login', component: Login }, // sem navbar e footer
  { path: 'sobre', component: Sobre }, // rota para "Sobre Nós"

  // 🔹 Admin Dashboard
  {
    path: 'admin',
    canActivate: [authGuard, RoleGuard],
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'cadastros/idoso',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/idoso/idoso').then((m) => m.Idoso),
      },
      {
        path: 'cadastros/responsavel',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/responsavel/responsavel').then(
            (m) => m.Responsavel
          ),
      },
      {
        path: 'cadastros/cuidador',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/cuidador/cuidador').then((m) => m.Cuidador),
      },
      {
        path: 'cadastros/visitante',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/visitante/visitante').then((m) => m.Visitante),
      },
      {
        path: 'cadastros/medico',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/medico/medico').then((m) => m.Medico),
      },
      {
        path: 'cadastros/medicamento',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/medicamento/medicamento').then(
            (m) => m.Medicamento
          ),
      },
      {
        path: 'cadastros/admin',
        loadComponent: () =>
          import('./pages/admin-dashboard/cadastros/admin/admin').then((m) => m.Admin),
      },
      {
        path: 'cadastros/prescricao',
        loadComponent: () =>
          import(
            './pages/admin-dashboard/cadastros/cad-prescrico-medica/cad-prescrico-medica'
          ).then((m) => m.CadPrescricoMedica),
      },
      {
        path: 'prescricoes/editar/:id',
        component: CadPrescricoMedica,
        title: 'Editar Prescrição',
      },
      {
        path: 'lista-prescricoes',
        component: ListPrescricaoMedicaComponent,
        title: 'Lista de Prescrições',
      },
      {
        path: 'registro-diario',
        loadComponent: () =>
          import('./pages/admin-dashboard/registro-diario/registro-diario').then(
            (m) => m.RegistroDiario
          ),
      },
      {
        path: 'notificacoes',
        loadComponent: () =>
          import('./pages/admin-dashboard/notificacoes/notificacoes').then((m) => m.Notificacoes),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full', // <-- redireciona /admin para /admin/dashboard
      },
      {
        path: 'saude-diaria/lista',
        component: ListSaudeDiaria,
        title: 'Lista de Registros de Saúde',
        // Adicione canActivate aqui se houver guarda de rota (ex: login/autenticação)
      },
      {
        path: 'saude-diaria/cadastrar',
        component: CadSaudeDiaria,
        title: 'Novo Registro de Saúde',
      },
      {
        // Rota para EDIÇÃO, usando um parâmetro (id) na URL
        path: 'saude-diaria/cadastrar/:id',
        component: CadSaudeDiaria,
        title: 'Editar Registro de Saúde',
      },
    ],
  },

  // 🔹 Painel do Idoso
  {
    path: 'painel-idoso/:id',
    component: PainelIdoso,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dados', pathMatch: 'full' },
      {
        path: 'dados',
        loadComponent: () =>
          import('./pages/painel-idoso/dados-gerais/dados-gerais').then((m) => m.DadosGerais),
      },
      {
        path: 'medicamentos',
        loadComponent: () =>
          import('./pages/painel-idoso/medicamentos/medicamentos').then((m) => m.Medicamentos),
      },
      {
        path: 'recomendacoes',
        loadComponent: () =>
          import('./pages/painel-idoso/recomendacoes-medicas/recomendacoes-medicas').then(
            (m) => m.RecomendacoesMedicas
          ),
      },
      {
        path: 'notificacoes',
        loadComponent: () =>
          import('./pages/painel-idoso/notificacoes/notificacoes').then((m) => m.Notificacoes),
      },
      {
        path: 'cuidadores',
        loadComponent: () =>
          import('./pages/painel-idoso/cuidadores/cuidadores').then((m) => m.Cuidadores),
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
