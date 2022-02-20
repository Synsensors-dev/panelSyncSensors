import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TranslateService {
  sensorTypeToSpanish = new Map<string, string>([
    ["TEMPERATURE_AIR", "Temperatura Aire"],
    ["TDS", "Solidos Disueltos"],
    ["HUMIDITY_AIR", "Humedad Aire"],
    ["PH", "PH"],
    ["CO2_GAS", "Co2"],
    ["SOUND", "Sonido"],
    ["DISSOLVED_OXYGEN", "Oxigeno Disuelto"],
    ["TURBIDITY", "Turbiedad"],
    ["CONDUCTIVITY", "Conductividad"],
    ["OPTICAL_DUST", "Calidad de Aire"],
  ]);

  constructor() { }

  arrayToSpanish(typesArray:any){
    for (let i = 0; i < typesArray.length; i++) {
      typesArray[i]=this.sensorTypeToSpanish.get(typesArray[i])
    }
  }
  itemToSpanish(item:string){
    return this.sensorTypeToSpanish.get(item);
  }
}
