import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
 
export class InventarioService {
  baseUrl = environment.baseUrl;
  
  idretorno: any; 
  constructor(private http: HttpClient) { }
  

  getquery(query: string){ 
    const url =  this.baseUrl + query
    console.log(url);
    return this.http.get<any>(url); 
 }

 putquery(query: string,id: number,body: any){ 
  const url = this.baseUrl + `${query}/${id}`; 
  return this.http.put<any>(url,body); 
}

updateInvenraios(id: number,body: any){
  
  return this.putquery('Inventario',id,body)
              .subscribe(data => this.idretorno = data.inventario_codigo 
                )
  console.log(this.idretorno);

}

 getReferencias(){ 
     
  return this.getquery('referencias')
  .pipe(
    map((resp:any[]) => {
      return resp.map( referencia => {
       // console.log(referencia);
        return { codigo: referencia.ref_codigo, nombre: referencia.ref_descripcion} 
      } )
    })
  ); 
} 
 

getColores(){ 
     
  return this.getquery('Colores')
  .pipe(
    map((resp:any[]) => {
      return resp.map( color => {
        //console.log(color);
        return { codigo: color.color_Codigo, nombre: color.color_Descripcion} 
      } )
    })
  ); 
} 

getVendedores(){  
  return this.getquery('vendedores')
  .pipe(
    map((resp:any[]) => {
      return resp.map( vendedor => {
     //   console.log(vendedor);
        return { codigo: vendedor.vendedor_CODIGO, 
                 nombres: vendedor.vendedor_NOMBRES,
                 apellidos: vendedor.vendedor_APELLIDOS } 
      } )
    })
  ); 
} 

getInventarios(){  
  return this.getquery('Inventario')
  .pipe(
    map((resp:any[]) => {
      return resp.map( Inventario => {
     //   console.log(vendedor);
        return { codigo: Inventario.inventario_codigo, 
                 ref_codigo: Inventario.ref_codigo,
                 ref_descripcion: Inventario.referencias.ref_descripcion,
                 talla_codigo: Inventario.talla_codigo,
                 talla_descripcion: Inventario.tallas.talla_descripcion,
                 color_codigo: Inventario.color_codigo,
                 color_Descripcion: Inventario.colores.color_Descripcion,                 
                 cantidad: Inventario.cantidad
                 
                } 
      } )
    })
  ); 
} 


getTallas(){ 
     
  return this.getquery('Tallas')
  .pipe(
    map((resp:any[]) => {
      return resp.map( talla => {
    //    console.log(talla);
        return { codigo: talla.talla_Codigo, nombre: talla.talla_descripcion} 
      } )
    })
  ); 
} 

  
}
