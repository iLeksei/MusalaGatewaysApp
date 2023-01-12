## Environment requirements:
- Nodejs: v16.13.2 or later
- Java: 8 or later
- Maven: 3.8.7

## Build project:
1. Use **install.bat** for Windows or **install.sh** for Linux
2. For manual installation use command: **mvn install** in the root project directory

## Run application:
1. Use **start.bat** for Windows or **start.sh** for Linux
2. For manual execution use command in the root project directory:
   > java -jar target/musala-gateways-app.jar
    
## Application parameters:
- **PORT**     - server port. default - **8081**
- **DB_USER**  - username for embedded h2 database. default  - **sa**
- **DB_PASS**  - password for embedded h2 database. default  - **123456**
  
   > **For running application with custom parameters, use command:**\
     java -jar target/musala-gateways-app.jar\
     --DPORT=${PORT}\
     --DB_USER=${USERNAME}\
     --DB_PASS=${PASSWORD}
   
    > Or change these parameters in start.bat or start.sh   

## Notes:
   - User Interface will be available on the **PORT** you set or default **8081**.
   - In the requirements were a couple of points that with the real app
   will be important to clarify for eliminating ambiguities:\
    - **a unique serial number (string)** - serial number is a number, why we need to keep it like a string?\
    - **UID (number)** - if it doesn't mean Unique ID, It can be UUID format like that "12ec1-c31d-..."
         and it's not a number.\
    - It's important to know about an amount of data that can be displaying on the client side.
      Because in a case when it's a huge amount, it will be awesome to add pagination, searching.\
    - Above controllers you can find annotation @CrossOrigin("*"),
      because we don't know, can our service be available only via UI.
    - initial sql script "data.sql" is stored in "src/main/resources".
