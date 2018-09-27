import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { HttpModule, BaseRequestOptions } from "@angular/http";

import { AppComponent } from "./app.component";
import { LayerComponent } from "./layer/layer.component";
import { QuickStartComponent } from "./quick-start/quick-start.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard, AdminGuard } from "./_guards";
import {
  AuthenticationService,
  UserService,
  EditorialService
} from "./_services";
import { MockBackend } from "@angular/http/testing";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./auth/token.interceptor";
import { EditorialComponent } from "./editorial/editorial.component";
import { LogoutComponent } from "./logout/logout.component";
import { SignupComponent } from "./signup/signup.component";
import { AdminComponent } from "./admin/admin.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ManageComponent } from './manage/manage.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/quick", pathMatch: "full"},
  { path: "layer", component: LayerComponent },
  { path: "quick", component: QuickStartComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] },
  { path: "manage", component: ManageComponent, canActivate: [AdminGuard] },
  { path: "", component: QuickStartComponent },
  {
    path: "editorial",
    component: EditorialComponent,
    canActivate: [AuthGuard]
  }
  // { path: "**", redirectTo: "quick" }
];

@NgModule({
  declarations: [
    AppComponent,
    LayerComponent,
    QuickStartComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    EditorialComponent,
    LogoutComponent,
    SignupComponent,
    AdminComponent,
    NavbarComponent,
    ManageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthenticationService,
    EditorialService,
    UserService, // providers used to create fake backend
    MockBackend,
    BaseRequestOptions,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
