import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import * as $ from "jquery";
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
/**
 *
 */
constructor(private injector:Injector) {
  const webComponent = createCustomElement(AppComponent, {injector});
    customElements.define('dialogflow-bot', webComponent);
}

}
