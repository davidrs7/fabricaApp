import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { GridsComponent } from './pages/grids/grids.component';
import { NavbarComponent } from './pages/resources/navbar/navbar.component';
import { FooterComponent } from './pages/resources/footer/footer.component';
  
const routes: Routes = [
    {path: 'inventarios',component: InventariosComponent},
    {path: 'grids',component: GridsComponent},
    {path: 'navbar',component: NavbarComponent},
    {path: 'footer',component: FooterComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'inventarios'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
