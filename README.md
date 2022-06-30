# **final-project**
## **Noteworthy technologies used**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
## **Description**
This simplified online shop project was my final and self-chosen major project I did during my training at **[Spiced Academy](https://www.spiced-academy.com/)**.

## **Features**

- ### **Cart**
    - #### **Cart view**
        - Display of all items currently in cart
            - Cart actions available
        - Empty cart
        - Go to checkout view
    - #### **Cart actions for products**
        You can to do the following actions on **Front Page** view, **Search Result** view, **Single Product** view and **Cart** view, while being logged in or logged out.
        - Add item to cart
        - Increase amount of item
        - Decrease amount of item
        - Remove the entire quantity of item from the cart
- ### **Front Page**
    - Display of featured products
        - *Items are chosen randomly with each page load*
    - Cart actions available    
- ### **Search result drop down list**
    - Clicking on the first entry will open the Search Result view for the provided search text
    - Display of product names, which matches the provided search text
        - Clicking on a product name will open a Single Product view for the selected product
- ### **Search result**
    - Display of products, which matches the provided search text
    - Cart actions available
- ### **Single product view**
    - Display of a bigger picture of the product
    - Display of a description of the product
    - Cart actions available
- ### **Account overview view**
    - Display of login or register view, if the user is not logged in
    - Navigation links to account data, orders view and addresses view, if the user is logged in
    - Logout, if the user is logged in
- ### **Account data view**
    - Display of account data and date of registration
- ### **Orders view**
    - Display of all previous orders for the logged in user
    - Each item of the order list also displays the order id, total cost, status, date of order
    - Clicking on a order will open a Single Order view for the selected order
- ### **Single Order view**
    - Display of order id, total cost, status, date of order
    - Order content
        - Display for each item: product name, small picture of product, item amount, subcost for each item multiplied by amount
    - Address to ship to
- ### **Addresses view**
    - Display of all addresses for the user
    - Add a new address
- ### **Checkout view**
    - List of product names in the cart
        - Each item displays its subcost multiplied by desired amount
    - Total cost of complete order  
    - Dropdown menu for selecting an address to ship to, if any are saved
        - If none are saved, the "Place Order" button will not be visible  
    - "Place Order" button, if the user has a minimum of one address saved
        - Clicking on the button displays a thank you message and a link to a Single Order view


## **Preview**
![Project picture](https://raw.githubusercontent.com/sTa42/final-project/master/project_pictures/example_pic.png)
### **live version**
https://onlineshop-with-react.herokuapp.com/

## **Setup and start**
- ### **Intall node modules**
    Open your terminal, navigate to your project directory and type
    ````console
    npm install
    ````
- ### **Configure PostgreSQL connection**
    Provide an environment variable named `DATABASE_URL` or set it up in [db.js](server/middlewares/db.js)
    ````js
    const db = spicedPg(process.env.DATABASE_URL || `postgres:postgres:postgres@localhost:5432/onlineshop`);
    ````
    *At SPICED we used a npm module called **[spiced-pg](https://www.npmjs.com/package/spiced-pg)** to simplify the PostgreSQL connection setup*
- ### **Create database tables**
    Database creation files are located in [server/sql](server/sql) directory.  
    Create them in the following order:  
    `users.sql`, `addresses.sql`, `products.sql`, `order.sql`, `orders_content.sql`
- ### **Setup for cookie session**
    Provide an environment variable named `COOKIE_SECRET` or create a `secrets.json` file in the [server/](server/) directory.  
    For the `secrets.json` example, it should look like this:
    ````json
    {
        "COOKIE_SECRET": "My Cookie Secret"
    }
    ````
- ### **Start**
    If everything is set up, then open your terminal, navigate to your project directory and type
    ````console
    npm run dev
    ````
## **Limitations**
- There is no stock logic in the app, so the app assumes unlimited supply
- No admin panel view, where you can easily add/change/remove/restock products or change order status
