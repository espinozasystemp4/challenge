import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { pipe, of } from 'rxjs';
import { saveAs } from 'file-saver/FileSaver';
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

constructor() { }

ngOnInit(){
}

onFileSelected(event: HtmlInputEvent): void {
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

const tm1 = this.testLong(this.MensajeIn.linB,this.longMensajeIn.m1);
const tm2 = this.testLong(this.MensajeIn.linC,this.longMensajeIn.m2);
const tm3 = this.testLong(this.MensajeIn.linD,this.longMensajeIn.n);
if(tm1 && tm2 && tm3){
this.logUp="Las longitud del mensaje y las instrucciones son correctas";
}else{
this.logUp="Las longitud del mensaje y las instrucciones no son correctas";
}

const rla = this.decodeMsj(this.MensajeIn.linD,this.MensajeIn.linB);
const rlb = this.decodeMsj(this.MensajeIn.linD,this.MensajeIn.linC);

this.msjOutla=this.outMensaje(rla,this.MensajeIn.linB);
this.msjOutlb=this.outMensaje(rlb,this.MensajeIn.linC);

}

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

outMensaje(msjDec,msjOri){
let result:any;
if (msjOri == msjDec) {
result="SI";
} else {
result="NO";
}
return result;
}

testLong(m, n){
let  obser = false;
if (m.length == n) {
obser=true;
} else {
obser = false;
}
return obser;
}

save() {
const blob = new Blob([this.msjOutla+'\n'+this.msjOutlb]);
saveAs(blob, 'out.txt');
}

}
