import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { pipe, of } from 'rxjs';
import { saveAs } from 'file-saver/FileSaver';
import { FormControl, Validators } from '@angular/forms';
interface HtmlInputEvent extends Event {
target: HTMLInputElement  & EventTarget;
}

interface MensajeIn {
linB:string;
linC:string;
linD:string;
}

interface longMensajeIn {
m1:string;
m2:string;
n:string;
}

@Component({
selector: 'app-up',
templateUrl: './up.component.html',
styleUrls: ['./up.component.css']
})

export class UpComponent implements OnInit {
msjIn: String | ArrayBuffer;
msjOutla:String;
msjOutlb:String;
text: String;
textBlo:  String | ArrayBuffer;
logUp: String;
log: String;
file: File;
result = [];
MensajeIn: MensajeIn;
longMensajeIn: longMensajeIn;
panelOpenState = false;
arraError = [];
vali: boolean;

constructor() { }

ngOnInit(){
}
//LECTOR LINEA POR LINEA DEL TXT
onFileSelected(event: HtmlInputEvent): void {
this.arraError.length = 0;
if (event.target.files && event.target.files[0]){
this.file= <File>event.target.files[0];
const reader = new FileReader();
reader.onload = () => {
this.textBlo=reader.result;
this.testMsj(this.textBlo);
};
reader.readAsText(this.file);
}
}
//TRANSFOMACION DE LINEA A UN OBJETO ARRAY
testMsj(msjIn){
this.text = msjIn.split("\n");
const m = this.text[0].split(" ");
this.MensajeIn = {
linB:this.text[1],
linC:this.text[2],
linD:this.text[3],
}
this.longMensajeIn = {
m1:m[0],
m2:m[1],
n:m[2]
}

//validacion
const tm1 = this.testLong(this.MensajeIn.linB,this.longMensajeIn.m1);
const tm2 = this.testLong(this.MensajeIn.linC,this.longMensajeIn.m2);
const tm3 = this.testLong(this.MensajeIn.linD,this.longMensajeIn.n);


//validacion
this.valM(this.longMensajeIn.m1);
this.valM(this.longMensajeIn.m2);
this.valN(this.longMensajeIn.n);
this.valEncode(this.MensajeIn.linD);

const rla = this.decodeMsj(this.MensajeIn.linD,this.MensajeIn.linB);
const rlb = this.decodeMsj(this.MensajeIn.linD,this.MensajeIn.linC);

this.msjOutla=this.outMensaje(rla,this.MensajeIn.linB);
this.msjOutlb=this.outMensaje(rlb,this.MensajeIn.linC);

}

//VERIFICA SI ESTA LA INSTRUCCION EN EL MENSAJE
decodeMsj(encodeMsj,mIns){
let arrayTm = encodeMsj;
let arrayTn = mIns;
const final = [];
const encuentra = false;
for (var i = 0; i < arrayTn.length; i++) {
for (var j = 0; j < arrayTm.length; j++) {
if (arrayTn[i] == arrayTm[j]) {
final.push(arrayTn[i]);
break;
}
}
}
const cadena = final.join("");
const resultado = cadena.replace(",", "");
return resultado;
}
//BANDERA SI O NO SI SE ENCUENTRA LA INSTRUCCION EN EL MENSAJE
outMensaje(msjDec,msjOri){
let result:any;
if (msjOri == msjDec) {
result="SI";
} else {
result="NO";
}
return result;
}

//VALIDA SI LA LOGITUD DE M MENSAJE CONCUERDA CON EL INDICATIVO M
testLong(m, n){
let  obser = false;
if (m.length == n) {
console.log("Logitud mensaje concuerda con el indicativo");
this.vali=true;
}else{
this.arraError.push("Logitud mensaje no concuerda con el indicativo, Elemento: "+ n +" >> Linea 2");
  this.vali=false;

}
}

//EXPORTA EL RESULTADO EN UN TXT
save() {
const blob = new Blob([this.msjOutla+'\n'+this.msjOutlb]);
saveAs(blob, 'out.txt');
}

valN(n){
const max = 5000;
const min = 3;
if(n >= min && n <= max){
console.log("Rango mensaje valida");
this.vali=true;
}else{
this.arraError.push("Logitud mensaje invalida, Elemento: "+ n +" >> Linea 4");
this.vali=false;
}

}

//VALIDA SI EL RANGO ENTRE 2 - 5 DE M MENSAJE CONCUERDA CON EL INDICATIVO
valM(m){
const max = 50;
const min = 2;
if(m >= min && m <= max){
console.log("Rango instruccion valida");
this.vali=true;
}else{
this.arraError.push("Logitud instruccion invalida, Elemento: "+ m +" >> Linea 1");
this.vali=false;
}
}

//VALIDA SI EL MENSAJE ESTA COMPUESTO  ENTRE LETRA Y NUMERO PERMITIDOS
valEncode(msjIn){
  const r = /^[A-Z0-9]+$/i;
  const m = r.test(msjIn);
  if (m) {
  console.log("Rango instruccion valida");
  this.vali=true;
  }
  else{
  this.arraError.push("Formato del mensaje invalido, Elemento: "+ msjIn +" >> Linea 4");
  this.vali=false;
  }

}





}
