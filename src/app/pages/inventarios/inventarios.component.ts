import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioService } from '../../services/inventario.service';
import { element } from 'protractor';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {
  referencias: any[] = [];
  colores: any[] = [];
  tallas: any[] = [];
  vendedores: any[] = [];
  inventarioTotal: any[] = [];
  inventarioConsultado: any[] = [];
  mensajeDisponible: string ='';
  mensajeFactura: string ='';
  classDisponible: string=''; 
  formulario: FormGroup | undefined; 
  formularioCliente:FormGroup | undefined;
  constructor(private ServiceInventario: InventarioService,private fb: FormBuilder) {
     this.crearFormulario();
     this.crearFormularioCliente();
   
   }
   crearFormulario(){
    console.log('crea formulario');
    this.formulario = this.fb.group({
      referencia:['0',Validators.required],
      color:['0',Validators.required],
      talla:['0',Validators.required],
      vendedor:['0',Validators.required],      
      cantidad:['',[Validators.required,Validators.pattern("^[0-9]*$")]],       
    })
  }

  crearFormularioCliente(){
    console.log('crea formulario');
    this.formularioCliente = this.fb.group({
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      ciudad:['',Validators.required],
      direccion:['',Validators.required],      
      barrio:['',Validators.required],      
      localidad:['',Validators.required],      
      telefono:['',Validators.required]   
    })
  }

  ngOnInit(): void {
    this.ServiceInventario.getReferencias()
    .subscribe(referencias => {
      this.referencias = referencias;

    this.referencias.unshift({
      nombre: 'seleccione una referencia',
      codigo: '0'}); 
//  console.log(paises);
}); 
this.ServiceInventario.getColores()
            .subscribe(colores => {
              this.colores = colores;
        
this.colores.unshift({
      nombre: 'seleccione un color',
      codigo: '0'});  
}); 

this.ServiceInventario.getVendedores()
            .subscribe(vendedores => {
              this.vendedores = vendedores;
        
this.vendedores.unshift({
      nombres: 'seleccione un vendedor',
      codigo: '0'});  
}); 

this.ServiceInventario.getTallas()
            .subscribe(tallas => {
              this.tallas = tallas;
        
this.tallas.unshift({
      nombre: 'seleccione una talla',
      codigo: '0'});   
}); 
  }

    limpiarmensaje(){
      this.mensajeDisponible = "";
    }
 
  validaDisponibilidad(){  
    if (this.formulario!.invalid){
     
      Object.values(this.formulario!.controls).forEach(control => {
        control.markAsTouched();
      });
      return; 
    } else { 
   //console.log(this.formulario.value);
   this.ServiceInventario.getInventarios()
   .subscribe(inventarios => {
     this.inventarioConsultado =inventarios.filter(element => element.ref_codigo == this.formulario!.value.referencia && element.talla_codigo == this.formulario!.value.talla && element.color_codigo ==this.formulario!.value.color);
     this.inventarioTotal = inventarios
    console.log(this.inventarioConsultado);
    console.log(this.inventarioTotal);  
     
    if (this.inventarioConsultado.length === 0){

      this.mensajeDisponible = 'No existe esta disponibilidad en el inventario';
      this.classDisponible = 'text-danger';
      return;
    }
    if (this.inventarioConsultado[0].cantidad < this.formulario!.value.cantidad){
      this.mensajeDisponible = 'No existe disponibilidad, actualmente existen: '+ this.inventarioConsultado[0].cantidad + ' unidades en stock'
      this.classDisponible = 'text-danger'
      console.log(this.mensajeDisponible);
    }else{
      this.mensajeDisponible = 'Si existe disponibilidad, actualmente existen: '+ this.inventarioConsultado[0].cantidad + ' unidades en stock'
      this.classDisponible = 'text-success'
      console.log(this.mensajeDisponible);
    }
  });   
    } 
  }


  Agregarfactura(){
    
    if (this.formulario!.invalid && this.formularioCliente!.invalid){
     
      Object.values(this.formulario!.controls).forEach(control => {
        control.markAsTouched();
      });
      Object.values(this.formularioCliente!.controls).forEach(control => {
        control.markAsTouched();
      });
      return; 
    } else { 

      console.log('Pasó todas las validaciones!!');
      this.mensajeFactura ="Funcionalidad en construcción"
    }

 
  }


   // ************** validadores del formulario del inventario *********************// 
  get referenciaNovalido(){  
    return (this.formulario!.get('referencia')!.invalid && this.formulario!.get('referencia')!.touched) || (this.formulario!.get('referencia')!.value == 0 && this.formulario!.get('referencia')!.touched);    
    }     
  get colorNovalido(){   
     return (this.formulario!.get('color')!.invalid && this.formulario!.get('color')!.touched) || (this.formulario!.get('color')!.value == 0 && this.formulario!.get('color')!.touched);    
  }   

  get tallaNovalido(){ 
     return (this.formulario!.get('talla')!.invalid && this.formulario!.get('talla')!.touched) || (this.formulario!.get('talla')!.value == 0 && this.formulario!.get('talla')!.touched)
  }   

   get vendedorNovalido(){
   return (this.formulario!.get('vendedor')!.invalid && this.formulario!.get('vendedor')!.touched) || (this.formulario!.get('vendedor')!.value == 0 && this.formulario!.get('vendedor')!.touched)
   }   
   get cantidadNoValido(){ 
    return (this.formulario!.get('cantidad')!.invalid && this.formulario!.get('cantidad')!.touched) || (this.formulario!.get('cantidad')!.value == '' && this.formulario!.get('cantidad')!.touched)
    }  

 // ************* validadores del formulario de cliente ************// 
 get nombresNoValido(){ 
  return (this.formularioCliente!.get('nombres')!.invalid && this.formularioCliente!.get('nombres')!.touched) || (this.formularioCliente!.get('nombres')!.value == '' && this.formularioCliente!.get('nombres')!.touched)
  }  

  get apellidosNoValido(){ 
    return (this.formularioCliente!.get('apellidos')!.invalid && this.formularioCliente!.get('apellidos')!.touched) || (this.formularioCliente!.get('apellidos')!.value == '' && this.formularioCliente!.get('apellidos')!.touched)
    }  

    get ciudadNoValido(){ 
      return (this.formularioCliente!.get('ciudad')!.invalid && this.formularioCliente!.get('ciudad')!.touched) || (this.formularioCliente!.get('ciudad')!.value == '' && this.formularioCliente!.get('ciudad')!.touched)
      }  
      get direccionNoValido(){ 
        return (this.formularioCliente!.get('direccion')!.invalid && this.formularioCliente!.get('direccion')!.touched) || (this.formularioCliente!.get('direccion')!.value == '' && this.formularioCliente!.get('direccion')!.touched)
        }  
        get barrioNoValido(){ 
          return (this.formularioCliente!.get('barrio')!.invalid && this.formularioCliente!.get('barrio')!.touched) || (this.formularioCliente!.get('barrio')!.value == '' && this.formularioCliente!.get('barrio')!.touched)
          }  
          
          get localidadNoValido(){ 
            return (this.formularioCliente!.get('localidad')!.invalid && this.formularioCliente!.get('localidad')!.touched) || (this.formularioCliente!.get('localidad')!.value == '' && this.formularioCliente!.get('localidad')!.touched)
            }  

            get telefonoNoValido(){ 
              return (this.formularioCliente!.get('telefono')!.invalid && this.formularioCliente!.get('telefono')!.touched) || (this.formularioCliente!.get('telefono')!.value == '' && this.formularioCliente!.get('telefono')!.touched)
              }  
            


}
