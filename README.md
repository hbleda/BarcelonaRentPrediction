
---

Este proyecto de la Barcelona IT Academy explica paso a paso cómo construir un sitio web de predicción de precio de alquiler en Barcelona ciudad. Primero, construiremos un modelo usando sklearn y regresión lineal utilizando el conjunto de datos de alquiler de viviendas "alquiler_Barcelona_final.csv". El segundo paso sería crear un servidor Flask de Python que use el modelo guardado para atender solicitudes HTTP. El tercer componente es el sitio web construido en HTML, CSS y JavaScript que permite al usuario introducir el "Distrito", "Barrio", "superficie", "Habitaciones" y "Baños" de la vivienda deseada y llamará al servidor Flask de Python para obtener el precio de alquiler. Durante la construcción del modelo, se tocan conceptos de ciencia de datos, tales como carga y limpieza de datos, detección y eliminación de valores atípicos, ingeniería de características, gridsearchcv para ajuste de hiperparámetros, validación cruzada k-fold, etc. En cuanto a tecnología y herramientas, este proyecto cubre:

1. Python
2. Numpy y Pandas para limpieza de datos
3. Matplotlib para visualización de datos
4. Sklearn para construcción del modelo
5. Jupyter Notebook, Visual Studio Code como IDE
6. Flask de Python para servidor HTTP
7. HTML/CSS/JavaScript para la interfaz de usuario

# Despliega esta aplicación en la nube (AWS EC2)

1. Crea una instancia EC2 usando la consola de Amazon; también, en el grupo de seguridad, añade una regla para permitir el tráfico HTTP entrante.
2. Ahora, conecta a tu instancia usando este comando mediante Git Bash:
```
ssh -i "C:\Users\USER\.ssh\BarcelonaRentPredict.pem" ubuntu@ec2-13-51-85-154.eu-north-1.compute.amazonaws.com
```
3. Configuración de nginx:
   1. Instala nginx en la instancia EC2 con estos comandos:
   ```
   sudo apt-get update
   sudo apt-get install nginx
   ```
   2. Lo anterior instalará nginx y también lo ejecutará. Verifica el estado de nginx con:
   ```
   sudo service nginx status
   ```
   3. Aquí están los comandos para iniciar/detener/reiniciar nginx:
   ```
   sudo service nginx start
   sudo service nginx stop
   sudo service nginx restart
   ```
   4. Ahora, cuando cargas la URL de la nube en el navegador, verás un mensaje que dice "bienvenido a nginx". Esto significa que tu nginx está configurado y en funcionamiento.

4. Ahora necesitas copiar todo tu código a la instancia EC2. Puedes hacer esto usando usando winscp. 

5. Una vez que te conectes a la instancia EC2 desde winscp, ahora puedes copiar todos los archivos de código en la carpeta /home/ubuntu/. La ruta completa de tu carpeta raíz es ahora: **/home/ubuntu/BarcelonaRentPredict**
6. Después de copiar el código en el servidor EC2, ahora podemos hacer que nginx cargue nuestro sitio web por defecto. Para los siguientes pasos:
    1. Crea este archivo /etc/nginx/sites-available/BarcelonaRentPredict.conf. El contenido del archivo se ve así:
    ```
    server {
	    listen 80;
            server_name bhp;
            root /home/ubuntu/BarcelonaRentPredict/client;
            index app.html;
            location /api/ {
                 rewrite ^/api(.*) $1 break;
                 proxy_pass http://127.0.0.1:5000;
            }
    }
    ```
    2. Crea un enlace simbólico para este archivo en /etc/nginx/sites-enabled ejecutando este comando:
    ```
    sudo ln -v -s /etc/nginx/sites-available/bhp.conf
    ```
    3. Elimina el enlace simbólico del archivo predeterminado en el directorio /etc/nginx/sites-enabled:
    ```
    sudo unlink default
    ```
    4. Reinicia nginx:
    ```
    sudo service nginx restart
    ```
7. Ahora instala los paquetes de Python y inicia el servidor Flask:
```
sudo apt-get install python3-pip
sudo pip3 install -r /home/ubuntu/BarcelonaRentPredict/server/requirements.txt
python3 /home/ubuntu/BarcelonaRentPredict/client/server.py
```
Al ejecutar el último comando anterior, se mostrará que el servidor está funcionando en el puerto 5000.

8. Ahora solo carga tu URL de la nube en el navegador (en mi caso es http://ec2-13-51-85-154.eu-north-1.compute.amazonaws.com/) y este será un sitio web funcional en un entorno cloud de producción.

---


