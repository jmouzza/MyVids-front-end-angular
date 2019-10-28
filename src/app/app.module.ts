//Módulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NewVideoComponent } from './components/new-video/new-video.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

//servicio
import { IdentityGuard } from './services/identity.guard';
import { UserService } from './services/user.service';
import { EditVideoComponent } from './components/edit-video/edit-video.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    NewVideoComponent,
    EditUserComponent,
    EditVideoComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  appRoutingProviders,
  IdentityGuard,
  UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
