import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { CategoriaDetalleComponent } from './pages/categoria-detalle/categoria-detalle.component';
import { ComoFuncionaComponent } from './pages/como-funciona/como-funciona.component';

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
  {
    path: '**',
    redirectTo: ''
  },
];
