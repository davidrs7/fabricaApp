import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { GridsComponent } from './pages/grids/grids.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './pages/resources/navbar/navbar.component';
import { FooterComponent } from './pages/resources/footer/footer.component';
import { SplitPipe } from './pipes/split.pipe';
import { SplitCodigoPipe } from './pipes/split-codigo.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InventariosComponent,
    GridsComponent,
    NavbarComponent,
    FooterComponent,
    SplitPipe,
    SplitCodigoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
