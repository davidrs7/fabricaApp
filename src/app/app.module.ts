import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { GridsComponent } from './pages/grids/grids.component';

@NgModule({
  declarations: [
    AppComponent,
    InventariosComponent,
    GridsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
