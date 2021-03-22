import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../services/inventario.service';


@Component({
  selector: 'app-grids',
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.css']
})
export class GridsComponent implements OnInit {

  inventario: any[] = [];
  awaitInventario: any[] = [];
  editField: string = "";
  bodyUpdateInventario: 
  {
  inventario_codigo : number,
  ref_codigo        : number,
  talla_codigo      : number,
  color_codigo      : number,
  cantidad          : number
  } = {inventario_codigo:0, ref_codigo:0,talla_codigo:0,color_codigo:0,cantidad:0};
  constructor(private ServiceInventario: InventarioService) {
     
   }

  ngOnInit(): void {
    this.ServiceInventario.getInventarios()
    .subscribe(invnetario => {
      this.inventario = invnetario;
      this.awaitInventario = invnetario;
   //console.log(this.inventario);
}); 
  }

  updateList(id: number, property: string, event: any) {
    console.log('Hola');
    const editField = event.target.textContent;
    this.inventario[id][property] = editField;

      // console.log(this.inventario[id]['cantidad']);
    // console.log(this.inventario[id]['ref_codigo']);
    // console.log(this.inventario[id]['codigo']);
    // console.log(this.inventario[id]['color_codigo']);
    // console.log(this.inventario[id]['talla_codigo']);
    this.bodyUpdateInventario = {
      inventario_codigo : this.inventario[id]['codigo'],
      ref_codigo : this.inventario[id]['ref_codigo'],
      talla_codigo: this.inventario[id]['talla_codigo'],
      color_codigo: this.inventario[id]['color_codigo'],
      cantidad: this.inventario[id]['cantidad']
    } 
     console.log(this.bodyUpdateInventario);
   this.ServiceInventario.updateInvenraios(this.inventario[id]['codigo'],this.bodyUpdateInventario);
    
  }

    FindByReferencia(termino: any){
      console.log(termino);
      termino = termino.toUpperCase();
      this.inventario =  termino.length > 0 ?  this.inventario.filter((ref) => ref.ref_descripcion.includes(termino)): this.awaitInventario;
    }
    FindByColor(termino: any){
      console.log(termino);
      termino = termino.toUpperCase();
      this.inventario =  termino.length > 0 ?  this.inventario.filter((ref) => ref.color_Descripcion.includes(termino)): this.awaitInventario;

    }
    FindByTalla(termino: string){
      console.log(termino);
      termino = termino.toUpperCase();
      this.inventario =  termino.length > 0 ?  this.inventario.filter((ref) => ref.talla_descripcion.includes(termino)): this.awaitInventario;

    }
  remove(id: any) {
    this.awaitInventario.push(this.inventario[id]);
    this.inventario.splice(id, 1);
  }

  add() {
    if (this.awaitInventario.length > 0) {
      const person = this.awaitInventario[0];
      this.inventario.push(person);
      this.awaitInventario.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
  }

}
