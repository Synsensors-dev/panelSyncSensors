# PanelSyncSensors
SyncSensors Control Panel.

# Backend

Todas las configuraciones y comandos del backend se tienen que realizar en su carpeta
```
cd backend
```

### 1. Instalación de dependencias
Se instalarán todas las dependencias del backend, se realiza solo luego de clonar el proyecto
```
npm ci
```

### 2. Compilación
Para compilar los archivos typescript se tienen que ingresar los siguientes comandos
```
npm run clean
npm run build
```

### 3. Levantar el server
El server se levantará automaticamente en localhost en el puerto 3003
```
npm run serve
```

## Frontend

Todas las configuraciones y comandos del frontend se tienen que realizar en su carpeta
```
cd frontend
```

### 1. Instalación de dependencias
Se instalarán todas las dependencias del frontend, se realiza solo luego de clonar el proyecto
```
npm ci
```
`En caso de que diga que se tiene una version de angular distinta, presione escape`

### 2. Compilación y levantamiento del server
Para compilar y levantar el serve realize lo siguiente
```
ng serve
```