import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormioModule } from "angular-formio";

import "./CheckMatrix";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormioModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
