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
import { AuthGuard } from "./_guards";
import { AuthenticationService, UserService, EditorialService } from "./_services";
import { MockBackend } from "@angular/http/testing";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./auth/token.interceptor";
import { EditorialComponent } from "./editorial/editorial.component";
import { LogoutComponent } from "./logout/logout.component";
import { SignupComponent } from "./signup/signup.component";
import { AdminComponent } from "./admin/admin.component";

const appRoutes: Routes = [
  { path: "layer", component: LayerComponent },
  { path: "quick", component: QuickStartComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "signup", component: SignupComponent },
  { path: "admin", component: AdminComponent },
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "editorial",
    component: EditorialComponent, canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "" }
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
    AdminComponent
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
export class AppModule { }
