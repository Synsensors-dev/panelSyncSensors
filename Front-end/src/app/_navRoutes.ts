import { INavData } from "@coreui/angular"

export const TEMPERATURE_AIR={
    name:'Sensores de temperatura aire',
    url:'/stations/temperature_air',
    icon:'fa fa-thermometer-half '
  }

export const TEMPERATURE_LIQUID={
  name:'Sensores de temperatura agua',
  url:'/stations/temperature_liquid',
  icon:'fa fa-thermometer-half'
}
export const TDS={
    name:'Sensores de Total de Solidos Disueltos',
    url:'/stations/tds',
    icon:'fa fa-cube'
  }
export const HUMIDITY_AIR={
    name:'Sensores de Humedad',
    url:'/stations/humidity_air',
    icon:'fa fa-cloud'
}
export const PH={
  name:'Sensores de PH',
  url:'/stations/ph',
  icon:'fa fa-cloud'
}
export const CO2_GAS={
  name:'Sensores de CO2 gaseoso',
  url:'/stations/co2_gas',
  icon:'fa fa-cloud'
}
export const SOUND={
  name:'Sensores de Sonido',
  url:'/stations/sound',
  icon:'fa fa-volume-up'
}
export const DISSOLVED_OXYGEN={
  name:'Sensores de Oxigeno disuelto',
  url:'/stations/dissolved_oxygen',
  icon:'fa fa-cloud'
}
export const TURBIDITY={
  name:'Sensores de Turbiedad',
  url:'/stations/turbidity',
  icon:'fa fa-cloud'
}
export const CONDUCTIVITY={
  name:'Sensores de Conductividad',
  url:'/stations/conductivity',
  icon:'fa fa-bolt'
}
export const OPTICAL_DUST={
  name:'Sensores de Polvo Optico',
  url:'/stations/optical_dust',
  icon:'fa fa-cloud'
}
export const waterStations:INavData={
  name:'Estaciones de agua',
  children:[
  ]
}
export const airStations:INavData={
  name:'Estaciones de aire',
  children:[
  ]
}
export const navItems:INavData[] = [

  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  }
]