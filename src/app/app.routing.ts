/*Archivo que contendrá la informaciómn de rutas de la aplicación de angular*/

//1. Importando módulos y clases necesarios para el funcionamiento de rutas
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//2. Importando de componentes ("controladores")
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NewVideoComponent } from './components/new-video/new-video.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditVideoComponent} from './components/edit-video/edit-video.component';

import { IdentityGuard } from './services/identity.guard';

/* 3.
 * Definir las rutas dentro de una constante de tipo Routes (importado en este fichero) y será
 * completado con un array de Json
 */
const appRoutes:Routes = [
	//   {URL, Componente que se cargará}
	{path: "", component: HomeComponent},
	{path: "home", component: HomeComponent},
	{path: "home/:page", component: HomeComponent},
	{path: "inicio", component: HomeComponent},
	{path: "inicio/:page", component: HomeComponent},
	{path: "login", component: LoginComponent},
	{path: "register", component: RegisterComponent},
	{path: "registro", component: RegisterComponent},
	{path: "logout", component:LogoutComponent},
	{path: "new_video", component: NewVideoComponent, canActivate:[IdentityGuard]},
	{path: "edit_user", component: EditUserComponent, canActivate:[IdentityGuard]},
	{path: "edit_video/:id", component: EditVideoComponent, canActivate:[IdentityGuard]},
	{path:"**", component: ErrorComponent}
	//la ruta ** índica ruta no encontrada, cargar componente error
];

/* 4. 
 * Exportar la configuración de rutas para el reconocimiento de ellas en el framework
 * este será incluído en el fichero app.module.ts
 */
export const appRoutingProviders:any[] = [];
 
 /* constante "routing", será el módulo con el router configurado 
  * que será incluido en el fichero app.module.ts
  * 
  * 								Módulo de rutas -> método de rutas principales (parámetro: rutas configuradas)
  */
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);