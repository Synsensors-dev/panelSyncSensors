(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{ShhN:function(n,t,e){"use strict";e.r(t),e.d(t,"ParameterSensorsViewModule",function(){return O});var o=e("ofXK"),r=e("kqlq"),s=e("dZIy"),i=e("s3T5"),a=e("K3ix"),c=e("3Pt+"),b=e("tyNb"),d=e("Y+sY"),l=e("nAY5"),g=e("fXoL");function u(n,t){1&n&&(g.Tb(0,"div",15),g.Tb(1,"a",16),g.wc(2,"Action"),g.Sb(),g.Tb(3,"a",16),g.wc(4,"Another action"),g.Sb(),g.Tb(5,"a",16),g.wc(6,"Something else here"),g.Sb(),g.Tb(7,"a",16),g.wc(8,"Something else here"),g.Sb(),g.Sb())}function p(n,t){if(1&n){const n=g.Ub();g.Tb(0,"div",15),g.Tb(1,"a",17),g.ac("click",function(){return g.rc(n),g.dc().sortMaxToMin()}),g.wc(2,"Mayor a menor"),g.Sb(),g.Tb(3,"a",17),g.ac("click",function(){return g.rc(n),g.dc().sortMinToMax()}),g.wc(4,"Menor a mayor"),g.Sb(),g.Sb()}}const m=function(n,t,e,o){return{red:n,green:t,gray:e,yellow:o}};function f(n,t){if(1&n){const n=g.Ub();g.Tb(0,"div",18),g.ac("click",function(){g.rc(n);const e=t.$implicit;return g.dc().goToSensor(e.sensor.id_sensor,e.name_station,e.sensor.min_config,e.sensor.max_config)}),g.Tb(1,"div",19),g.Tb(2,"p",20),g.wc(3),g.Sb(),g.Tb(4,"div",13),g.Tb(5,"ul"),g.Tb(6,"li",21),g.wc(7),g.Sb(),g.Tb(8,"li",22),g.wc(9," \xb0C "),g.Sb(),g.Sb(),g.Sb(),g.Tb(10,"div",23),g.Tb(11,"ul"),g.Ob(12,"li",24),g.Ob(13,"li",22),g.Sb(),g.Sb(),g.Sb(),g.Sb()}if(2&n){const n=t.$implicit;g.ic("ngClass",g.nc(3,m,n.sensor.last_reading>n.sensor.max_config||n.sensor.min_config>n.sensor.last_reading,n.sensor.last_reading>n.sensor.min_config&&n.sensor.max_config>n.sensor.last_reading,0==n.sensor.status,n.sensor.last_reading==n.sensor.min_config||n.sensor.last_reading==n.sensor.max_config)),g.Bb(3),g.xc(n.name_station),g.Bb(4),g.yc(" ",n.sensor.last_reading," ")}}let h=(()=>{class n{constructor(n,t,e,o){this.router=n,this.stationsService=t,this.auth=e,this.activatedRoute=o,this.sortedArray=[]}ngOnInit(){this.activatedRoute.params.subscribe((n={})=>{this.sensorParameterName=this.activatedRoute.snapshot.params.sensorParameter,this.stationsService.getPanelStationsByType(this.auth.getUserCompanyId(),this.sensorParameterName.toUpperCase()).subscribe(n=>{n.success?(console.log(n),this.stations=n.data,this.sortedArray=this.stations,console.log(this.stations)):console.log(n.message)})})}goToSensor(n,t,e,o){this.router.navigate([`stations/${this.sensorParameterName}/sensor`],{state:{sensorId:n,stationName:t,min_config:e,max_config:o}})}sortMinToMax(){this.sortedArray=this.stations.sort((n,t)=>n.sensor.last_reading>t.sensor.last_reading?1:n.sensor.last_reading<t.sensor.last_reading?-1:0)}sortMaxToMin(){this.sortedArray=this.stations.sort((n,t)=>n.sensor.last_reading<t.sensor.last_reading?1:n.sensor.last_reading>t.sensor.last_reading?-1:0)}}return n.\u0275fac=function(t){return new(t||n)(g.Nb(b.c),g.Nb(l.a),g.Nb(d.a),g.Nb(b.a))},n.\u0275cmp=g.Hb({type:n,selectors:[["app-parameter-sensors-view"]],decls:24,vars:1,consts:[[1,"container"],[1,"row","filtersRow"],[1,"col","glossary"],[1,"colorsBg"],[1,"dot","green"],[1,"dot","yellow"],[1,"dot","red"],[1,"dot","gray"],[1,"col"],[1,"optionsBar"],["dropdown","",1,"btn-group"],["type","button","dropdownToggle","",1,"btn"],["class","dropdown-menu dropdown-menu-right",4,"dropdownMenu"],[1,"row"],["class","card",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"dropdown-menu","dropdown-menu-right"],[1,"dropdown-item"],[1,"dropdown-item",3,"click"],[1,"card",3,"ngClass","click"],[1,"card-body"],[1,"card-text","f18"],[1,"card-text","temperature-text"],[1,"card-text","celsius"],[1,"row","rowHumedad","f18"],[1,"card-text"]],template:function(n,t){1&n&&(g.Tb(0,"div",0),g.Tb(1,"div",1),g.Tb(2,"div",2),g.Tb(3,"div",3),g.Tb(4,"span",4),g.wc(5,"En rango"),g.Sb(),g.Tb(6,"span",5),g.wc(7,"Cerca de rango"),g.Sb(),g.Tb(8,"span",6),g.wc(9,"Fuera de rango"),g.Sb(),g.Tb(10,"span",7),g.wc(11,"Desactivado"),g.Sb(),g.Sb(),g.Sb(),g.Tb(12,"div",8),g.Tb(13,"div",9),g.Tb(14,"div",10),g.Tb(15,"button",11),g.wc(16," Filtrar "),g.Sb(),g.vc(17,u,9,0,"div",12),g.Sb(),g.Tb(18,"div",10),g.Tb(19,"button",11),g.wc(20," Ordenar Por "),g.Sb(),g.vc(21,p,5,0,"div",12),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Tb(22,"div",13),g.vc(23,f,14,8,"div",14),g.Sb(),g.Sb()),2&n&&(g.Bb(23),g.ic("ngForOf",t.sortedArray))},directives:[s.a,s.d,s.b,o.j,o.i],styles:[".dot[_ngcontent-%COMP%]{height:min-content;display:inline-block;padding:10px;border-radius:10%;color:#fff;margin:10px;box-shadow:0 4px 4px rgba(0,0,0,.25)}.colorsBg[_ngcontent-%COMP%], .dot[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content}.colorsBg[_ngcontent-%COMP%]{display:flex;align-items:center;padding:5px}.card[_ngcontent-%COMP%], .colorsBg[_ngcontent-%COMP%]{border-radius:30px;text-align:center}.card[_ngcontent-%COMP%]{width:350px;margin:20px;box-shadow:0 4px 4px rgba(0,0,0,.25);color:#f5f5f5}.card[_ngcontent-%COMP%]   .temperature-text[_ngcontent-%COMP%]{font-size:50px;font-weight:700}.card[_ngcontent-%COMP%]   .f18[_ngcontent-%COMP%]{font-size:16px}.row[_ngcontent-%COMP%]{justify-content:center}.filtersRow[_ngcontent-%COMP%]{align-items:center}.filtersRow[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%]{margin-left:20px;margin-right:20px}.filtersRow[_ngcontent-%COMP%]   .btn-group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{padding:5px;width:120px;background-color:#008036;color:#fff;border-radius:10px}ul[_ngcontent-%COMP%]{list-style-type:none;padding:5px 5px 5px 0}ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{float:left}.optionsBar[_ngcontent-%COMP%]{display:flex;justify-content:right}.celsius[_ngcontent-%COMP%]{font-weight:bolder;margin-left:5px}.glossary[_ngcontent-%COMP%]{flex-direction:column}.red[_ngcontent-%COMP%]{background-color:#f86c6b}.green[_ngcontent-%COMP%]{background-color:#7ccc8f}.gray[_ngcontent-%COMP%]{background-color:gray}.yellow[_ngcontent-%COMP%]{background-color:#e1cd66}@media (max-width:600px){.card[_ngcontent-%COMP%]{width:90%}.filtersRow[_ngcontent-%COMP%]{justify-content:center}.filtersRow[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{margin:5px}}"]}),n})();var S=e("tl2D"),T=e("cTSu"),w=e("/ROg");const _=["myModal"],v=["successModal"];function M(n,t){if(1&n){const n=g.Ub();g.Tb(0,"div",45),g.Tb(1,"p",46),g.ac("click",function(){return g.rc(n),g.dc(),g.pc(20).show()}),g.wc(2,"Editar Sensor"),g.Sb(),g.Sb()}}const x=[{path:"",data:{title:""},children:[{path:"",redirectTo:"sensors"},{path:"sensors",component:h,data:{title:"Sensores"}},{path:"sensor",data:{title:"Sensor"},component:(()=>{class n{constructor(n,t,e){this.location=n,this.fb=t,this.sensorsService=e}ngOnInit(){this.retainer=this.location.getState(),console.log(this.retainer),this.sensorId=this.retainer.sensorId,this.stationName=this.retainer.stationName,this.min_config=this.retainer.min_config,this.max_config=this.retainer.max_config,this.sensorForm=this.fb.group({min_config:[],max_config:[],alert_days:[],alert_hours:[],alert_minutes:[]}),this.sensorForm.get("min_config").setValue(this.min_config),this.sensorForm.get("max_config").setValue(this.max_config)}saveChanges(){this.updateMaxMin(),this.updateAlertOcurrency()}updateMaxMin(){this.sensorsService.updateSensorMinMax(this.sensorId,this.sensorForm.get("min_config").value,this.sensorForm.get("max_config").value).subscribe(n=>{n.success?(this.myModal.hide(),this.successModal.show()):console.log(n.message)})}updateAlertOcurrency(){let n=1440*this.sensorForm.get("alert_days").value+60*this.sensorForm.get("alert_hours").value+this.sensorForm.get("alert_minutes").value;console.log(n),this.sensorsService.updateAlertOcurrency(this.sensorId,n).subscribe(n=>{n.success?console.log(n):console.log(n.message)})}successModalClose(){this.successModal.hide()}}return n.\u0275fac=function(t){return new(t||n)(g.Nb(o.g),g.Nb(c.b),g.Nb(S.a))},n.\u0275cmp=g.Hb({type:n,selectors:[["app-sensor-view"]],viewQuery:function(n,t){if(1&n&&(g.Ac(_,1),g.Ac(v,1)),2&n){let n;g.oc(n=g.bc())&&(t.myModal=n.first),g.oc(n=g.bc())&&(t.successModal=n.first)}},decls:105,vars:5,consts:[[1,"container"],[1,"row"],[1,"col","stationName","green"],[1,"col","urIcons"],["dropdown","",1,"btn-group","float-right"],["type","button","dropdownToggle","",1,"btn","btn-transparent"],[1,"green","icon-settings"],["class","dropdown-menu dropdown-menu-right",4,"dropdownMenu"],["type","button","disabled","true",1,"btn","btn-transparent"],[1,"cil-wifi-signal-4","green"],[1,"row","rw1"],[3,"sensorId"],[1,"row","rw2"],[1,"hidden"],[1,"scrolleable-box"],["bsModal","","tabindex","-1","role","dialog","aria-labelledby","myModalLabel","aria-hidden","true",1,"modal","fade"],["myModal","bs-modal"],["role","document",1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"],[1,"modal-body"],[3,"formGroup"],[1,"section-title"],[1,"col"],[1,"label"],[1,"input-group","mgtop"],[1,"input-group-prepend"],[1,"input-group-text"],[1,"icon-arrow-down"],["type","number","id","min_config","formControlName","min_config"],[1,"icon-arrow-up"],["id","max_config","type","number","formControlName","max_config"],[1,"input-group"],[1,"icon-clock"],["id","alert_days","type","number","formControlName","alert_days"],["id","alert_hours","type","number","formControlName","alert_hours"],["id","alert_minutes","type","number","formControlName","alert_minutes"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-primary",3,"click"],["successModal","bs-modal"],["role","document",1,"modal-dialog","modal-success"],[1,"dropdown-menu","dropdown-menu-right"],["data-toggle","modal",1,"dropdown-item",3,"click"]],template:function(n,t){if(1&n){const n=g.Ub();g.Tb(0,"div",0),g.Tb(1,"div",1),g.Tb(2,"div",2),g.Tb(3,"p"),g.wc(4),g.Sb(),g.Sb(),g.Tb(5,"div",3),g.Tb(6,"div",4),g.Tb(7,"button",5),g.Ob(8,"i",6),g.Sb(),g.vc(9,M,3,0,"div",7),g.Sb(),g.Tb(10,"div",4),g.Tb(11,"button",8),g.Ob(12,"i",9),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Tb(13,"div",10),g.Ob(14,"app-readings-line-chart",11),g.Sb(),g.Tb(15,"div",12),g.Tb(16,"div",13),g.Tb(17,"div",14),g.Ob(18,"app-sensor-alerts-history",11),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Tb(19,"div",15,16),g.Tb(21,"div",17),g.Tb(22,"div",18),g.Tb(23,"div",19),g.Tb(24,"h4",20),g.wc(25),g.Sb(),g.Tb(26,"button",21),g.ac("click",function(){return g.rc(n),g.pc(20).hide()}),g.Tb(27,"span",22),g.wc(28,"\xd7"),g.Sb(),g.Sb(),g.Sb(),g.Tb(29,"div",23),g.Tb(30,"form",24),g.Tb(31,"div",25),g.Tb(32,"h4"),g.wc(33,"Limites de medida"),g.Sb(),g.Tb(34,"p"),g.wc(35,"L\xedmites superiores e inferiores del sensor, en caso de que se detecte una lectura fuera del l\xedmite establecido se emitir\xe1 una alerta"),g.Sb(),g.Sb(),g.Tb(36,"div",1),g.Tb(37,"div",26),g.Tb(38,"p",27),g.wc(39,"L\xedmite inferior de medida"),g.Sb(),g.Tb(40,"div",28),g.Tb(41,"div",29),g.Tb(42,"span",30),g.Ob(43,"i",31),g.Sb(),g.Sb(),g.Ob(44,"input",32),g.Sb(),g.Sb(),g.Tb(45,"div",26),g.Tb(46,"p",27),g.wc(47,"L\xedmite superior de medida"),g.Sb(),g.Tb(48,"div",28),g.Tb(49,"div",29),g.Tb(50,"span",30),g.Ob(51,"i",33),g.Sb(),g.Sb(),g.Ob(52,"input",34),g.Sb(),g.Sb(),g.Sb(),g.Ob(53,"hr"),g.Tb(54,"div",25),g.Tb(55,"h4"),g.wc(56,"Ocurrenc\xeda de alertas"),g.Sb(),g.Tb(57,"p"),g.wc(58,"Cada cuanto el sensor emite alertas en caso de que se detecten valores fuera de los L\xedmites"),g.Sb(),g.Sb(),g.Tb(59,"div",1),g.Tb(60,"div",26),g.Tb(61,"p",27),g.wc(62,"D\xedas"),g.Sb(),g.Tb(63,"div",35),g.Tb(64,"div",29),g.Tb(65,"span",30),g.Ob(66,"i",36),g.Sb(),g.Sb(),g.Ob(67,"input",37),g.Sb(),g.Sb(),g.Tb(68,"div",26),g.Tb(69,"p",27),g.wc(70,"Horas"),g.Sb(),g.Tb(71,"div",35),g.Tb(72,"div",29),g.Tb(73,"span",30),g.Ob(74,"i",36),g.Sb(),g.Sb(),g.Ob(75,"input",38),g.Sb(),g.Sb(),g.Tb(76,"div",26),g.Tb(77,"p",27),g.wc(78,"Minutos"),g.Sb(),g.Tb(79,"div",35),g.Tb(80,"div",29),g.Tb(81,"span",30),g.Ob(82,"i",36),g.Sb(),g.Sb(),g.Ob(83,"input",39),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Tb(84,"div",40),g.Tb(85,"button",41),g.ac("click",function(){return g.rc(n),g.pc(20).hide()}),g.wc(86,"Cerrar"),g.Sb(),g.Tb(87,"button",42),g.ac("click",function(){return t.saveChanges()}),g.wc(88,"Guardar Cambios"),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Tb(89,"div",15,43),g.Tb(91,"div",44),g.Tb(92,"div",18),g.Tb(93,"div",19),g.Tb(94,"h4",20),g.wc(95,"Cambios Realizados con exito"),g.Sb(),g.Tb(96,"button",21),g.ac("click",function(){return g.rc(n),g.pc(90).hide()}),g.Tb(97,"span",22),g.wc(98,"\xd7"),g.Sb(),g.Sb(),g.Sb(),g.Tb(99,"div",23),g.Tb(100,"p"),g.wc(101,"Valores minimos y maximos cambiados con exito"),g.Sb(),g.Sb(),g.Tb(102,"div",40),g.Tb(103,"button",41),g.ac("click",function(){return t.successModalClose()}),g.wc(104,"Cerrar"),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb()}2&n&&(g.Bb(4),g.yc("",t.stationName," - nombreSensor"),g.Bb(10),g.ic("sensorId",t.sensorId),g.Bb(4),g.ic("sensorId",t.sensorId),g.Bb(7),g.yc("Sensor nombreSensor - ",t.stationName,""),g.Bb(5),g.ic("formGroup",t.sensorForm))},directives:[s.a,s.d,s.b,T.a,w.a,a.a,c.o,c.h,c.d,c.k,c.a,c.g,c.c],styles:["[_ngcontent-%COMP%]::-webkit-scrollbar{width:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:#f1f1f1}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#888}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:#555}.green[_ngcontent-%COMP%]{font-size:20px;color:green}.row[_ngcontent-%COMP%]{justify-content:center;margin-block:10px}.section-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:gray}.label[_ngcontent-%COMP%]{text-align:center;font-size:14px}.input-group[_ngcontent-%COMP%]{justify-content:center}input[_ngcontent-%COMP%]{width:70px}.col[_ngcontent-%COMP%]{justify-content:center}.btnRow[_ngcontent-%COMP%]{justify-content:right}.scrolleable-box[_ngcontent-%COMP%]{overflow-y:auto}.hidden[_ngcontent-%COMP%]{overflow:hidden;border-radius:30px;box-shadow:0 4px 4px rgba(0,0,0,.25)}"]}),n})()}]}];let y=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=g.Lb({type:n}),n.\u0275inj=g.Kb({imports:[[b.g.forChild(x)],b.g]}),n})(),O=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=g.Lb({type:n}),n.\u0275inj=g.Kb({imports:[[o.c,r.a,s.c,y,i.a.forRoot(),a.b.forRoot(),c.l]]}),n})()}}]);