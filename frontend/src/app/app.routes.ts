import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CategoriaDetalleComponent } from './pages/categoria-detalle/categoria-detalle.component';
import { ComoFuncionaComponent } from './pages/como-funciona/como-funciona.component';
import { authGuard } from './guards/auth.guard';
import { PanelNegocioComponent } from './pages/panel-negocio/panel-negocio.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: 'auth', 
    component: AuthComponent 
  },
  { path: 'categorias', 
    component: CategoriasComponent 
  },
  { path: 'categorias/:id', 
    component: CategoriaDetalleComponent 
  },
  { path: 'como-funciona', 
      component: ComoFuncionaComponent 
  },
  { path: 'panel-negocio', 
    component: PanelNegocioComponent, canActivate: [authGuard] 
  },
  {
    path: '**',
    redirectTo: ''
  },
];
