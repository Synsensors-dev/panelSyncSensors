import { INavData } from "@coreui/angular"

export const TEMPERATURE={
    name:'Sensores de temperatura',
    url:'/stations/temperature',
    icon:'fa fa-thermometer-half '
  }
export const AIR={
    name:'Sensores de calidad de aire',
    url:'/calidadDeAire',
    icon:'fa fa-cloud'
  }
export const HUMIDITY={
    name:'Sensores de Humedad',
    url:'/humedad',
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