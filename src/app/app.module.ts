import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { LayerComponent } from "./layer/layer.component";
import { QuickStartComponent } from "./quick-start/quick-start.component";

const appRoutes: Routes = [
  { path: "layer", component: LayerComponent },
  { path: "quick", component: QuickStartComponent }
];

@NgModule({
  declarations: [AppComponent, LayerComponent, QuickStartComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
