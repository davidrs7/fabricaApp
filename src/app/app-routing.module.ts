import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventariosComponent } from './pages/inventarios/inventarios.component';

const routes: Routes = [
    {path: 'inventarios',component: InventariosComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'inventarios'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
