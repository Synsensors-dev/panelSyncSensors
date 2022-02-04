export interface typeChart{
    //Data y label vendran desde backend
    data: number[],
    label: string,
    //Estilos
    fill:false,
    options:{
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    },
    //animaciones
    transitions: {
      show: {
        animations: {
          x: {
            from: 0
          },
          y: {
            from: 0
          }
        }
      }
    }
}