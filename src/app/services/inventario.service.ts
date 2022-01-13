import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { referencia } from '../models/referencia';

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
  //console.log(this.idretorno);

}

 getReferencias(){     
  return this.getquery('Referencias') 
  .pipe(
    map((resp) => {
      return resp.data.map( (referencia:any) => {
        console.log(referencia);
        return { codigo: referencia.refCodigo, nombre: referencia.refDescripcion} 
      })
    })
  ); 
} 
 

getColores(){     
  return this.getquery('Colores')
  .pipe(
    map((resp) => {
      return resp.data.map( (color:any) => {
        //console.log(color);
        return { codigo: color.colorCodigo, nombre: color.colorDescripcion} 
      } )
    })
  ); 
} 

getVendedores(){  
  return this.getquery('vendedores')
  .pipe(
    map((resp) => {
      return resp.data.map( (vendedor:any) => {
     //   console.log(vendedor);
        return { codigo: vendedor.vendedorCodigo, 
                 nombres: vendedor.vendedorNombres,
                 apellidos: vendedor.vendedorApellidos } 
      } )
    })
  ); 
} 

getInventarios(){  
  return this.getquery('Inventario')
  .pipe(
    map((resp:any) => {
      return resp.data.map( (Inventario:any) => {
        //console.log(Inventario); 
       return { codigo: Inventario.inventarioCodigo, 
                 ref_codigo: Inventario.refCodigo,
                 ref_descripcion: Inventario.refDesc,
                 talla_codigo: Inventario.tallaCodigo,
                 talla_descripcion: Inventario.tallaDesc,
                 color_codigo: Inventario.colorCodigo,
                 color_Descripcion: Inventario.colorDesc,                 
                 cantidad: Inventario.cantidad            
                }       
      } )
    })
  ); 
} 


getTallas(){ 
     
  return this.getquery('Tallas')
  .pipe(
    map((resp) => {
      return resp.data.map( (talla:any) => {
    //    console.log(talla);
        return { codigo: talla.tallaCodigo, nombre: talla.tallaDescripcion} 
      } )
    })
  ); 
} 

  
}
