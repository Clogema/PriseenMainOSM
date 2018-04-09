import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, BaseRequestOptions } from "@angular/http";

import { AppComponent } from "./app.component";
import { LayerComponent } from "./layer/layer.component";
import { QuickStartComponent } from "./quick-start/quick-start.component";
import { MockBackend } from "@angular/http/testing";
import { ControlMessageComponent } from "./control-message/control-message.component";
import { ValidationService } from "./validation.service";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
  { path: "layer", component: LayerComponent },
  { path: "quick", component: QuickStartComponent },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  declarations: [
    AppComponent,
    LayerComponent,
    QuickStartComponent,
    ControlMessageComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [MockBackend, BaseRequestOptions, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
