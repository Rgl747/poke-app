# Pokédex App - FrontEnd

## Descripción

Esta es una aplicación móvil desarrollada en **React Native** utilizando **Expo** como framework. La aplicación consume la **PokeAPI** para obtener información detallada sobre los Pokémon. Además, se integra con un backend en **Django** para la gestión de favoritos utilizando **Axios** para realizar solicitudes HTTP.

## Características

- Exploración de una Pokédex con lista de Pokémon.
- Detalles de cada Pokémon, incluyendo habilidades, tipos y descripción.
- Búsqueda por nombre o número de un Pokémon.
- Gestión de favoritos utilizando un backend personalizado.
- Diseño adaptativo y estilización con **NativeBase**.

---

## Estructura del Proyecto

   ```plaintext
app/
├── index.tsx
src/
├── components/
│   └── PokemonCard.tsx
├── navigators/
│   ├── MainNavigator.tsx
│   ├── types.ts
├── screens/
│   ├── Home.tsx
│   ├── Detail.tsx
│   ├── Search.tsx
├── utils/
│   ├── api.ts
│   ├── helper.ts
   ```
---

## Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone <URL>
   ```

2. Instalar dependencias:
   ```bash
   nmp install
   ```

3. Ejecutar la aplicación:
   ```bash
   expo start
   ```

4. Configurar el backend:
   * Asegúrate de tener el backend de Django ejecutándose.
   * Cambia las URLs de Axios en los archivos para apuntar al servidor correcto.

---

# Detalles del Código

`app/index.tsx`
Archivo principal de la aplicación. Configura el proveedor de NativeBase y la navegación.

```tsx
import { fetchData } from "@/src/utils/api";
import { MainNavigator } from "@/src/navigators/MainNavigator";
import { NativeBaseProvider } from "native-base";

fetchData();

export default function Index() {
  return (
    <NativeBaseProvider>
      <MainNavigator />
    </NativeBaseProvider>
  );
}
```
---

`src/components/PokemonCard.tsx`
Componente que muestra una tarjeta con información básica del Pokémon.

* Props:
   * `url:` Dirección para obtener los datos del Pokémon.
* Funciones principales:
   * `fetchData(url):` Obtiene los datos del Pokémon.
   * `getTypeColor(type):` Determina el color basado en el tipo del Pokémon.

---

`src/navigators/MainNavigator.tsx`
Configura la navegación principal de la aplicación:
* Pantallas:
   * `Home:` Lista de Pokémon.
   * `Detail:` Información detallada de un Pokémon.
   * `Search:` Búsqueda de Pokémon.
   ```tsx
   <Stack.Navigator>
            <Stack.Screen name='Home' component={Home} options={({ navigation }) => ({
                headerLargeTitle: true,
                headerTitle: 'Pokédex',
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MaterialIcons name="search" color= "black" size={32}/>
                    </TouchableOpacity>
                ),
            })}/>

            <Stack.Screen 
            name='Detail' 
            component={Detail}
            options={{
                headerTitle: 'Pokédex',
                headerTransparent: true,
                headerTintColor: 'white',
            }}/>

            <Stack.Group screenOptions={{ presentation: 'modal'}}>
                <Stack.Screen name='Search' component={Search}/>
            </Stack.Group>

        </Stack.Navigator>
   ```

---

`src/screens/Home.tsx`
Pantalla inicial que muestra una lista de Pokémon utilizando una **FlatList**.
* Funciones:
   * `fetchData():` Obtiene la lista inicial de Pokémon.
   * `loadMore():` Carga más Pokémon al alcanzar el final de la lista.

---

`src/screens/Detail.tsx`
Pantalla que muestra información detallada sobre un Pokémon.
* Características:
   * Detalles del Pokémon (nombre, ID, tipos, habilidades, etc.).
   * Descripción extraída desde species.
   * Botón para agregar o eliminar de favoritos.

---

`src/screens/Search.tsx`
Pantalla que permite buscar un Pokémon por nombre o número.
* Funciones:
   * `searchPokemon(name):` Realiza una búsqueda en la PokeAPI y navega a la pantalla de detalles.

---

`src/utils/api.ts`
Funciones de utilidad para realizar solicitudes HTTP a la API.
* Funciones principales:
   * `fetchData(url):` Obtiene datos desde una URL específica.

---

`src/utils/helper.ts`
Funciones auxiliares para manejo de datos.

* Funciones:
   * `getTypeColor(type):` Devuelve el color asociado a un tipo de Pokémon.
   * `formatNumber(num):` Formatea el número del ID del Pokémon.
   * `removeEscapeCharacters(str):` Elimina caracteres de escape de las cadenas de texto.

---

## Tecnologías
* Frontend:
   * React Native
   * Expo
   * NativeBase
   * Axios
   * React Navigation
   * TypeScript
* Backend:
   * Django
   * Django REST Framework
* API:
   * PokeAPI

---

# Pokedex App - Backend

Este proyecto es el backend de una aplicación Pokedex que utiliza **Django** y **Django REST Framework**. Su propósito es gestionar una lista de Pokémon favoritos, proporcionando una API REST para agregar, listar y eliminar elementos.

---

## Características Principales

- **Gestión de Favoritos:** Permite agregar Pokémon a una lista de favoritos, listarlos y eliminarlos.
- **Interfaz RESTful:** Ofrece una API fácil de consumir para cualquier cliente.
- **Configuración de CORS:** Permite la integración con el frontend desarrollado en React Native.
- **Base de Datos SQLite:** Simple y rápida para proyectos de desarrollo inicial.

---

## Requisitos Previos

- **Python 3.9 o superior**
- **pip** para gestionar dependencias
- **Git** para clonar el repositorio
- **Django** y **Django REST Framework** (instalados automáticamente al seguir los pasos de instalación)

---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url_del_repositorio>
   cd pokedex_backend

2. Crea un entorno virtual y actívalo:

   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate

3. Instala las dependencias:

   ```bash
   pip install -r requirements.txt

4. Realiza las migraciones de la base de datos:

   ```bash
   python manage.py migrate


5. Inicia el servidor local:

   ```bash
   python manage.py runserver


6. Accede a la API en `http://127.0.0.1:8000/api/favorites/`.

---

# Endpoints de la API

## Listar Favoritos
* URL: `/api/favorites/`
* Método: `GET`
* Descripción: Devuelve la lista de Pokémon favoritos.
## Agregar Favorito
* URL: `/api/favorites/create/`
* Método: `POST`
* Cuerpo de Ejemplo:
   ```json
   { "name": "Pikachu" }
* Descripción: Agrega un nuevo Pokémon a la lista de favoritos.
# Eliminar Favorito
* URL: `/api/favorites/delete/str:name/`
* Método: `DELETE`
* Descripción: Elimina un Pokémon favorito según su nombre.

---

# Configuración
* CORS Habilitado: En el archivo settings.py, se habilita CORS para permitir el acceso desde cualquier origen (útil durante el desarrollo):

   ```python
CORS_ALLOW_ALL_ORIGINS = True
En producción, se recomienda especificar orígenes confiables.
   ```
* Base de Datos SQLite: Configurada por defecto en settings.py:

   ```python
DATABASES = {
      'default': {
         'ENGINE': 'django.db.backends.sqlite3',
         'NAME': BASE_DIR / 'db.sqlite3',
      }
   }
   ```
   ---

# Estructura del proyecto

   ```plaintext
   pokedex_backend/
├── favorites/
│   ├── models.py      # Modelo de datos para favoritos
│   ├── serializers.py # Serialización de datos
│   ├── views.py       # Lógica de las vistas de la API
│   ├── urls.py        # Rutas específicas del módulo
├── pokedex_backend/
│   ├── settings.py    # Configuración global
│   ├── urls.py        # Rutas principales
├── db.sqlite3         # Base de datos SQLite
├── manage.py          # Entrada de comandos para Django
```
---

# Ejecución

1. Inicia el servidor local:
   ```bash
   python manage.py runserver
   ```