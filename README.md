# Portfolio

Work in progress Angular application to process drink orders    

All components are currently displayed on one page for simple prototyping  

## Currently:  

Users can scan QR Codes with url parameters e.g /table/40  

This passes the table number into the local storage of the device  

Once loaded users can add items (stored in a Firebase Database) to their cart 

Then users can checkout the items in their cart which redirects to Stripe Checkout  

Upon completion the stripe webhook saves the order into a seperate firebase collection which is displayed in another view  

The user is then redirected to a success page which clears the cart content and shows the current orders.  


## Future 
Full overhall of UI  
Each Component will have its own view  
Full implementation of order processing, at the moment the server sends the order to what will be the Service/Admin View 
Admin View will be able to view current orders and check off complete orders while notifying User their order is on its way.  


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Portfolio
requirements
envronments.ts file with firebase account

## To complete Backend and Webhook-backend

Requirements   
.env with the following values  
STRIPE_SECRET_KEY="xxx"  
STRIPE_PUBLIC_KEY="xxx"  
SERVICE_ACCOUNT_FILE_NAME="xxx"  
PROJECT_ID="xxx"   

service-accounts/  
with firebaseapp.json  

## Webhook-backend
once stripe-cli installed 
run   
stripe listen --forward-to localhost:8080/hooks  
