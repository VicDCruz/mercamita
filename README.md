# Mercamita

a [Sails v1](https://sailsjs.com) application


### Links

+ [Get started](https://sailsjs.com/get-started)
+ [Sails framework documentation](https://sailsjs.com/documentation)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


# How To Install
* Instalar docker [link](https://docs.docker.com/install/)
* Instalar npm
  ```console
  sudo apt install npm
  # Verificar instalación
  npm -v
  ```
* Verificar que docker se instaló correctamente
  ```console
  docker run hello-world
  ```
* Bajar el contenedor de skynet
  ```console
  docker pull skynetdevelop/mercamita_dev
  ```
* Iniciar nuestro contenedor con el archivo:
  ```console
  ./runDocker.sh
  ```
  2ª opción:
  ```console
  npm run docker:start
  ```
* Meterse al contenedor (usando NPM y dentro del proyecto ./mercamita) **OPCIONAL**
  ```console
  npm run docker:ssh
  ```
* Correr Sails Lift **SE USARA UNA TERMINAL PARA VER COMO SE ACTUALIZA SAILS**
  ```console
  npm run docker:sails:start
  ```
* Obtener los datos de MongoDB en AWS
  ```console
  npm run docker:migration:dbs
  ```

### Version info

This app was originally generated on Mon Oct 22 2018 20:26:16 GMT-0500 (CDT) using Sails v1.0.0.

<!-- Internally, Sails used [`sails-generate@1.15.17`](https://github.com/balderdashy/sails-generate/tree/v1.15.17/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

