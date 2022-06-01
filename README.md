# final-project
Online Shop project with React and Redux. This was my last project, which I chose myself during my training at **[Spiced Academy](https://www.spiced-academy.com/)**.
![Project picture](https://raw.githubusercontent.com/sTa42/final-project/master/project_pictures/example_pic.png)

## Basic Setup
In that course we used a custom npm module for the PostgreSQL connection setup **[spiced-pg](https://www.npmjs.com/package/spiced-pg)**.  
Create a new PostgreSQL database. Assign chosen name to the dbName constant in **server/middlewares/db.js**
```JS
const dbName = "YOUR_DB_NAME";
```

1. ### Create tables
    Table creation files are located in **server/sql/** directory.  
    Create them in that order:  
    **users.sql, addresses.sql, products.sql, order.sql, orders_content.sql**

2. ### Setup Cookie Session
    Create a secrets.json file in **server/** directory or 
    set up an environment variable named `COOKIE_SECRET` and assign it a string value.  
    
    E.g. for secrets.json
    ```JSON
    {
    "COOKIE_SECRET": "My Cookie Secret"
    }
    ```

3. ### Install npm modules
    ```console
    npm install
    ```

## Start
```console
npm run dev
```
