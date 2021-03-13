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
displayedColumns: string[] = ['ronda','ja','jb','ventaja'];
dataSource = new MatTableDataSource<numbeRound>();
panelOpenState = false;
fileRound: File;
textBlo:  String | ArrayBuffer;
round: any;
logUp:String;
objRound: numbeRound[] = [];



constructor() { }
ngOnInit(){




}

onFileRound(event: HtmlInputEvent): void {
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
testMsj(msjIn){
this.round = msjIn.split("\n");
const n = this.round[0];
let ventajaRsult:number;
let ja:number;
let jb:number;
for (var i = 1; i <= n; i++) {
const item = this.round[i].split(" ");
if(item[0]){
  ja=Number(item[0]);
  jb=Number(item[1]);
ventajaRsult =(ja-jb);
this.objRound.push({num:i,ja:ja,jb:jb,lid:this.readLider(ja,jb),ven:this.readaValue(ventajaRsult)});

}
}


console.log(this.objRound);

if(this.objRound.length==n){
this.logUp="La longitud del mensaje y las rondas del docuento son correctas";
}
}


readLider(ja:number,jb:number){
console.log(ja,jb);


let lider: String;
if (ja>jb) {
lider="Jugador 1";
} else {
lider="Jugador 2";
}
return lider;
}

readaValue(a){
let resta: Number;
if (a < 0) {
resta = (a * (-1));
} else {
resta = a;
}
return resta;
}

save() {
this.objRound.sort(this.sort("ven"));
const blob = new Blob([this.objRound[0].num+" "+this.objRound[0].ven]);
saveAs(blob, 'out.txt');
}

sort(item){
return function(a,b){
if(a[item] > b[item])
return -1;
else if(a[item] < b[item])
return 1;

return 0;
}
}

}
