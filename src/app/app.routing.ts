
//import necesarios
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


//import components


import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { IdentityGuard } from './services/identity.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { InicioComponentComponent } from './inicio-component/inicio-component.component';


//definir las rutas
const appRoutes:Routes =[
{ path: '', component: InicioComponentComponent },

{ path: 'inicio', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'registro', component: RegisterComponent },
{ path: 'ajustes', component: UserEditComponent, canActivate:[IdentityGuard] },
{ path: 'crearcategoria', component: CategoryNewComponent , canActivate:[IdentityGuard] },
{ path: 'crear-entrada', component: PostNewComponent , canActivate:[IdentityGuard] },
{ path: 'entrada/:id', component: PostDetailComponent },
{ path: 'editar-entrada/:id', component: PostEditComponent },
{ path: 'categoria/:id', component: CategoryDetailComponent},
{ path: 'perfil/:id', component: ProfileComponent },
{ path: 'logout/:sure', component: LoginComponent },
{ path: '**', component: ErrorComponent },


];

//exportar configuracion
export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders<any>= RouterModule.forRoot(appRoutes);

