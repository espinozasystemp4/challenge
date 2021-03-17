import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { pipe, of } from 'rxjs';
import { saveAs } from 'file-saver/FileSaver'
import { MatTableDataSource, MatTable } from '@angular/material/table';
interface HtmlInputEvent extends Event {
target: HTMLInputElement  & EventTarget;
}

interface numbeRound {
num:Number;
ja:Number;
jb:Number;
lid:String;
ven:Number;
}

@Component({
selector: 'app-round',
templateUrl: './round.component.html',
styleUrls: ['./round.component.css']
})

export class RoundComponent implements OnInit {
panelOpenState = false;
fileRound: File;
textBlo:  String | ArrayBuffer;
round: any;
logUp:String;
objRound: numbeRound[] = [];
arraError = [];
vali: boolean;

constructor() { }
ngOnInit(){

}

//LECTOR LINEA POR LINEA DEL TXT
onFileRound(event: HtmlInputEvent): void {
this.arraError.length = 0;
if (event.target.files && event.target.files[0]){
this.fileRound= <File>event.target.files[0];
const reader = new FileReader();
reader.onload = () => {
this.textBlo=reader.result;
this.testMsj(this.textBlo);
};
reader.readAsText(this.fileRound);
}
}

//TRANSFOMACION DE LINEA A UN OBJETO ARRAY
testMsj(msjIn){
this.round = msjIn.split("\n");
const n = Number(this.round[0]);
let ventajaRsult:number;
let ja:number;
let jb:number;
this.valiRonda(n);

for (var i = 1; i <= this.round.length; i++) {
if(this.round[i]){
const item = this.round[i].split(" ");
ja=Number(item[0]);
jb=Number(item[1]);
ventajaRsult =(ja-jb);
this.objRound.push({num:i,ja:ja,jb:jb,lid:this.readLider(ja,jb),ven:this.readaValue(ventajaRsult)});
}
}
this.valaRonda(this.objRound.length,n);

}

//VALIDA QUE EL NUM ENTERO REFLEJE LA CANTIDAD DE LIENAS POR RONDA
valaRonda(obj,n){
if(obj==n){
console.log("Numero de la ronda concuerda con el indicativo, >> Linea 1");
this.vali=true;
}else{
this.arraError.push("Numero de la ronda no concuerda con el indicativo, >> Linea 1");
this.vali=false;
}


}


//VALIDAR QUE EL INDICATICO DE LA RONDA SEA INTERO Y ESTE EN EL RANGO CORRECTO
valiRonda(n){
if(Number.isInteger(n) && n>0 && n<=1000){
console.log("Logitud de la ronda concuerda con el indicativo, >> Linea 1");
this.vali=true;
}else{
this.arraError.push("Logitud ronda no concuerda con el indicativo, >> Linea 1");
this.vali=false;
}


}

//INDETIFICADEO BANDERA, QUIEN ES EL LIDER EN LA RONDA
readLider(ja:number,jb:number){
let lider: String;
if (ja>jb) {
lider="Jugador 1";
} else {
lider="Jugador 2";
}
return lider;
}

//REGLA ARISMETICA PARA RESTA
readaValue(a){
let resta: Number;
if (a < 0) {
resta = (a * (-1));
} else {
resta = a;
}
return resta;
}

//ORDENA EL OBJETO ARRAY PARA SE#ALAR QUIEN VA COMO LIDER
sort(item){
return function(a,b){
if(a[item] > b[item])
return -1;
else if(a[item] < b[item])
return 1;

}
}

//EXPORTA EL RESULTADO A UN TXT FINAL
save() {
this.objRound.sort(this.sort("ven"));
const blob = new Blob([this.objRound[0].num+" "+this.objRound[0].ven]);
saveAs(blob, 'out.txt');
}


}
