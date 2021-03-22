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
  classDisponible: string=''; 
  formulario: FormGroup;
  constructor(private ServiceInventario: InventarioService,private fb: FormBuilder) {
   // this.crearFormulario();
    this.formulario = this.fb.group({
      referencia:['0',Validators.required],
      color:['0',Validators.required],
      talla:['0',Validators.required],
      vendedor:['0',Validators.required],      
      cantidad:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      /*talla: this.fb.group({
        vendedor:['',Validators.required],
        ciudad:['',Validators.required],

      }),
      pasatiempos: this.fb.array([])*/
      
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

  crearFormulario(){
    console.log('crea formulario');
  }
  
  get referenciaNovalido(){  
    return (this.formulario.get('referencia')!.invalid && this.formulario.get('referencia')!.touched) || (this.formulario.get('referencia')!.value == 0 && this.formulario.get('referencia')!.touched);    
    }     
  get colorNovalido(){   
     return (this.formulario.get('color')!.invalid && this.formulario.get('color')!.touched) || (this.formulario.get('color')!.value == 0 && this.formulario.get('color')!.touched);    
  }   

  get tallaNovalido(){ 
     return (this.formulario.get('talla')!.invalid && this.formulario.get('talla')!.touched) || (this.formulario.get('talla')!.value == 0 && this.formulario.get('talla')!.touched)
  }   

   get vendedorNovalido(){
   return (this.formulario.get('vendedor')!.invalid && this.formulario.get('vendedor')!.touched) || (this.formulario.get('vendedor')!.value == 0 && this.formulario.get('vendedor')!.touched)
   }   
   get cantidadNoValido(){ 
    return (this.formulario.get('cantidad')!.invalid && this.formulario.get('cantidad')!.touched) || (this.formulario.get('cantidad')!.value == 0 && this.formulario.get('cantidad')!.touched)
    }  
  
    limpiarmensaje(){
      this.mensajeDisponible = "";
    }
  validaDisponibilidad(){  
    if (this.formulario.invalid){
     
      Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
      return; 
    } else {
      
   //console.log('Validar Disponibilidad');
   //console.log(this.formulario.value);
   this.ServiceInventario.getInventarios()
   .subscribe(inventarios => {
     this.inventarioConsultado =inventarios.filter(element => element.ref_codigo == this.formulario.value.referencia && element.talla_codigo == this.formulario.value.talla && element.color_codigo ==this.formulario.value.color);
     this.inventarioTotal = inventarios
    console.log(this.inventarioConsultado);
    console.log(this.inventarioTotal);  
     
    if (this.inventarioConsultado.length === 0){

      this.mensajeDisponible = 'No existe esta disponibilidad en el inventario';
      this.classDisponible = 'text-danger';
      return;
    }
   

    if (this.inventarioConsultado[0].cantidad < this.formulario.value.cantidad){
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




}
