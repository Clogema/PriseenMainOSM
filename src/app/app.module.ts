import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { LayerComponent } from "./layer/layer.component";
import { QuickStartComponent } from "./quick-start/quick-start.component";
import { LoginFormComponent } from "./login-form/login-form.component";

const appRoutes: Routes = [
  { path: "layer", component: LayerComponent },
  { path: "quick", component: QuickStartComponent },
  { path: "login", component: LoginFormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LayerComponent,
    QuickStartComponent,
    LoginFormComponent
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
