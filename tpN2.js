
var local = {
  vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

  ventas: [
    { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
    { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
    { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
  ],

  precios: [
    { componente: "Monitor GPRS 3000", precio: 200 },
    { componente: "Motherboard ASUS 1500", precio: 120 },
    { componente: "Monitor ASC 543", precio: 250 },
    { componente: "Motherboard ASUS 1200", precio: 100 },
    { componente: "Motherboard MZI", precio: 30 },
    { componente: "HDD Toyiva", precio: 90 },
    { componente: "HDD Wezter Dishital", precio: 75 },
    { componente: "RAM Quinston", precio: 110 },
    { componente: "RAM Quinston Fury", precio: 230 }
]
};
//--------------------------------------------------------- PRIMERA PARTE --------------------------------------------------------------------------
//Se pide desarrollar las siguientes funciones:
//-------------------------------------------------------EJERCICIO N°1------------------------------------------------------------------------------
//precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.
//console.log( precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]) ); // 320 ($200 del monitor + $120 del motherboard)

function precioMaquina(componentes) {
   var valorAcumulado = 0
    for (let i = 0; i < componentes.length; i++) {
        for (let j = 0; j < local.precios.length; j++) {
            if (componentes[i] === local.precios[j].componente){
                valorAcumulado = valorAcumulado + local.precios[j].precio; 
            }
        }
    }  
    return valorAcumulado 
}
console.log( precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"]) ); // 320 ($200 del monitor + $120 del motherboard)

//------------------------------------------------------EJERCICIO N°2------------------------------------------------------------------------------
//cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.

function cantidadVentasComponente(componente) {
    var componentesVendidos = 0;
    for (let i = 0; i < local.ventas.length; i++) {
        for (let j = 0; j < local.ventas[i].componentes.length; j++) {
            if (local.ventas[i].componentes[j] === componente){
                componentesVendidos ++;
            }
        }
    }
    return componentesVendidos
}
console.log( cantidadVentasComponente("Monitor ASC 543") ); // 2

//--------------------------------------------------------EJERCICIO N°3---------------------------------------------------------------------------
//vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina.

function vendedoraDelMes(mes, anio) {
    var montoMaximo = 0;
    var montoActual = 0;
    var ganadora;
    
    for (let i = 0; i < local.vendedoras.length; i++) {
        for (let j = 0; j < local.ventas.length; j++) {
            if (local.vendedoras[i]=== local.ventas[j].nombreVendedora && local.ventas[j].fecha.getMonth()+1=== mes && local.ventas[j].fecha.getFullYear() === anio) {
                montoActual += precioMaquina(local.ventas[j].componentes);               
            }
        }
        if (montoActual > montoMaximo){
            montoMaximo = montoActual;
            ganadora = local.vendedoras[i];
        }
    montoActual=0;
    }
    return ganadora;
}
console.log( vendedoraDelMes(1, 2019) ); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)

//-------------------------------------------------------------EJERCICIO N°4-----------------------------------------------------------------------
//ventasMes(mes, anio): Obtener las ventas de un mes.

function ventasMes(mes,anio) {
    var ventasDelMes = 0;
    for (let i = 0; i < local.ventas.length; i++) {
        if (local.ventas[i].fecha.getMonth()+1 === mes && local.ventas[i].fecha.getFullYear() === anio){
            ventasDelMes += precioMaquina(local.ventas[i].componentes);
        }
    }
    return ventasDelMes;
}
console.log( ventasMes(1, 2019) ); // 1250

//-----------------------------------------------------------EJERCICIO N°5--------------------------------------------------------------------------
//ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

function ventasVendedora(nombre) {
    var ventasPorVendedora = 0;
    for (let i = 0; i < local.ventas.length; i++) {
            if (local.ventas[i].nombreVendedora === nombre){
                ventasPorVendedora += precioMaquina(local.ventas[i].componentes);
            }
    }        
    return ventasPorVendedora;    
}    
console.log( ventasVendedora("Grace") ); // 900

//--------------------------------------------------------EJERCICIO N°6-----------------------------------------------------------------------------
//componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente
function componenteMasVendido(){
    var masVendido = 0;
    var actual = 0;
    var nombre;
    for (let i = 0; i< local.precios.length; i++){
        actual = cantidadVentasComponente(local.precios[i].componente);
        if (actual> masVendido){
            masVendido=actual;
            nombre=local.precios[i].componente;
        }
    actual=0;    
    }
    return nombre
}
console.log( componenteMasVendido() ); // Monitor GPRS 3000

//--------------------------------------------------------EJERCICIO N°7-----------------------------------------------------------------------------
//huboVentas(mes, anio): que indica si hubo ventas en un mes determinado.
function huboVentas(mes,anio){
    var ventas;
    for (let i = 0; i < local.ventas.length; i++) {
        if (local.ventas[i].fecha.getMonth()+1 === mes && local.ventas[i].fecha.getFullYear()=== anio){
            ventas = true;
        }else {
            ventas = false;
        }
    }
    return ventas;
}
console.log( huboVentas(3, 2019) ); // false
//----------------------------------------------------------- SEGUNDA PARTE ------------------------------------------------------------------------
//Como se abrió una nueva sucursal en Caballito, ahora los datos de las ventas también tienen el nombre de la sucursal en la cual se realizó. Por ejemplo: { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: 'Centro' }. Por este cambio, se pide:

//-------------------------------------------------------------EJERCICIO N°1------------------------------------------------------------------------
//En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original).

for (var i = 0; i < local.ventas.length; i++) {
    local.ventas[i].sucursal = "Centro"; 
    }
console.log(local);

//-------------------------------------------------------------EJERCICIO N°2------------------------------------------------------------------------
//Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']

local.sucursal = ['Centro', 'Caballito'];
console.log(local);
//-------------------------------------------------------------EJERCICIO N°3------------------------------------------------------------------------
//Cargar la siguiente información en el array ventas, creando sus respectivos objetos siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal


var nuevaData = [
{ fecha: new Date(2019, 2, 12), nombreVendedora: 'Hedy', componentes: ['Monitor GPRS 3000', 'HDD Toyiva'], sucursal: 'Centro' },
{ fecha: new Date(2019, 2, 24), nombreVendedora: 'Shreyl', componentes: ['Motherboard ASUS 1500', 'HDD Wezter Dishital'], sucursal: 'Caballito'},
{ fecha: new Date(2019, 2, 1), nombreVendedora: 'Ada', componentes: ['Motherboard MZI', 'RAM Quinston Fury'], sucursal: 'Centro'},
{ fecha: new Date(2019, 2, 11), nombreVendedora: 'Grace', componentes: ['Monitor ASC 543', 'RAM Quinston'], sucursal: 'Caballito'},
{ fecha: new Date(2019, 2, 11), nombreVendedora: 'Grace', componentes: ['Monitor ASC 543', 'RAM Quinston'], sucursal: 'Caballito'},
{ fecha: new Date(2019, 2, 15), nombreVendedora: 'Ada', componentes: ['Motherboard ASUS 1200', 'RAM Quinston Fury'], sucursal: 'Centro'},
{ fecha: new Date(2019, 2, 12), nombreVendedora: 'Hedy', componentes: ['Motherboard ASUS 1500', 'HDD Toyiva'], sucursal: 'Caballito'},
{ fecha: new Date(2019, 2, 21), nombreVendedora: 'Grace', componentes: ['Motherboard MZI', 'RAM Quinston'], sucursal: 'Centro'},
{ fecha: new Date(2019, 2, 8), nombreVendedora: 'Sheryl', componentes: ['Monitor ASC 543', 'HDD Wezter Dishital'], sucursal: 'Centro'},
{ fecha: new Date(2019, 2, 16), nombreVendedora: 'Sheryl', componentes: ['Monitor GPRS 3000', 'RAM Quinston Fury'], sucursal: 'Centro'},
{ fecha: new Date(2019, 2, 27), nombreVendedora: 'Hedy', componentes: ['Motherboard ASUS 1200', 'HDD Toyiva'], sucursal: 'Caballito'},
{ fecha: new Date(2019, 2, 22), nombreVendedora: 'Grace', componentes: ['Monitor ASC 543', 'HDD Wezter Dishital'], sucursal: 'Centro'},
{ fecha: new Date(2019, 2, 5), nombreVendedora: 'Ada', componentes: ['Motherboard ASUS 1500', 'RAM Quinston'], sucursal: 'Centro'},
{ fecha: new Date(2019, 2, 1), nombreVendedora: 'Grace', componentes: ['Motherboard MZI', 'HDD Wezter Dishital'], sucursal: 'Centro'},
{ fecha: new Date(2019, 2, 7), nombreVendedora: 'Sheryl', componentes: ['Monitor GPRS 3000', 'RAM Quinston'], sucursal: 'Caballito'},
{ fecha: new Date(2019, 2, 14), nombreVendedora: 'Ada', componentes: ['Motherboard ASUS 1200', 'HDD Toyiva'], sucursal: 'Centro'}
]

for (let i = 0; i < nuevaData.length; i++) {
    local.ventas.push(nuevaData[i]);   
}

//-------------------------------------------------------------EJERCICIO N°4------------------------------------------------------------------------
//Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.
function ventasSucursal(sucursal) {
    var ventasPorSucursal = 0;
    for (let i = 0; i < local.ventas.length; i++) {
            if (local.ventas[i].sucursal === sucursal){
                ventasPorSucursal += precioMaquina(local.ventas[i].componentes);
            }
    }        
    return ventasPorSucursal;    
}    
console.log( ventasSucursal("Centro") ); // 4195

//-------------------------------------------------------------EJERCICIO N°5------------------------------------------------------------------------
//Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?

function ventasPor(nombreProp, valorProp) {
	var acumVentas = 0;
	for (let i = 0; i < local.ventas.length; i++) {
		if (local.ventas[i][nombreProp] === valorProp){
			acumVentas += precioMaquina(local.ventas[i].componentes);
		}
	}
	return acumVentas;
}
console.log( ventasPor('nombreVendedora','Hedy') );
console.log( ventasPor('sucursal', 'Caballito') );


//-------------------------------------------------------------EJERCICIO N°6------------------------------------------------------------------------
//Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina.

function sucursalDelMes(mes, anio) {
    var montoMaximo = 0;
    var montoActual = 0;
    var sucursalGanadora;
    
    for (let i = 0; i < local.sucursal.length; i++) {
        for (let j = 0; j < local.ventas.length; j++) {
                if (local.sucursal[i]=== local.ventas[j].sucursal && local.ventas[j].fecha.getMonth()+1=== mes && local.ventas[j].fecha.getFullYear() === anio) {
                    montoActual += precioMaquina(local.ventas[j].componentes);               
                }
            }
            if (montoActual > montoMaximo){
                montoMaximo = montoActual;
                sucursalGanadora = local.sucursal[i];
            }
        montoActual=0;
        }
        return sucursalGanadora;
}
console.log( sucursalDelMes(1, 2019) ); // "Centro"

//----------------------------------------------------------- TERCERA PARTE ------------------------------------------------------------------------
//Para tener una mejor muestra de como está resultando el local, queremos desarrollar un reporte que nos muestre las ventas por sucursal y por mes. Para esto, necesitamos crear las siguientes funciones:
//-------------------------------------------------------------EJERCICIO N°1------------------------------------------------------------------------
//renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año

function renderPorMes() {
    var mesesLetras = ['Enero', 'Febrero','Marzo', 'Abril', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    for (let i = 0; i < mesesLetras.length; i++) {
        var vM = ventasMes(i, 2019);
        if (vM) {
            console.log("Total de " + mesesLetras[i] + " 2019: " + vM);
        }
    }
}
console.log( renderPorMes() );

// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210
//-----------------------------------------------------------EJERCICIO N°2--------------------------------------------------------------------------
//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal

function renderPorSucursal() {
    var sucu = ' ';
    for (let i = 0; i < local.sucursal.length; i++) {
        sucu = console.log('Total de ' + local.sucursal[i] + ': ' + ventasSucursal(local.sucursal[i]))
        
    }
    return sucu;
}

console.log( renderPorSucursal() );

//no me da la sucursal caballito :(

// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265
//-----------------------------------------------------------EJERCICIO N°3--------------------------------------------------------------------------
//render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó

function render() {
    console.log('ventas por mes' + renderPorMes());
    console.log('ventas por sucursal' + renderPorSucursal());
    console.log('producto estrella' + componenteMasVendido());

    function mejorVendedora() {
        var masVendedora = 0;
        var actual = 0;
        var nombre;
        for (let i = 0; i< local.ventas.length; i++){
                actual = vendedoraDelMes(local.ventas[i].nombreVendedora);
                if (actual> masVendedora){
                    masVendedora=actual;
                    nombre=local.ventas[i].nombreVendedora;
                }
            actual=0;    
            }
            return nombre
        }
        mejorVendedora();
        console.log("Vendedora que más ingresos generó: " + mejorVendedora())

    }
    

console.log( render() );

// Reporte
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265
// Producto estrella: Monitor GPRS 3000
// Vendedora que más ingresos generó: Grace