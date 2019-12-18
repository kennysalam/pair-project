# **Skin Type**

## Contents on Skin Type Aplication
* Introduction
* Requirements
* Features

### Introduction
This aplication will help user to find their skin care products according to their skin type. When user finnaly found their skin products, user can also buy that product in this aplication when they select our recomendation product.

### Requirements
People who run this aplication need to create database and seeding data for products that will be displaying on this aplication.

### Features
- GET / (home page)
- GET /product (show all product list)
- GET /user/register (User registration form)
- POST /user/register
- GET /user/login (User login form)
- POST /user/login
- GET /user/logout (logout user)
- GET /user/:userId (logged in homepage)
- GET /user/:userId/skin-type (User skin_type selection form)
- POST /user/:userId/skin-type
- GET /user/:userId/recommendation (User recommended product according to User skin type and buy options)
- POST /user/:userId/recommendation 
- GET /user/:userId/checkout (Checkout page with user & product bought details)
- POST /
- GET /user/:userId/finish (show that user already finished order step)

    **Database Table Users**
    | id | name       |      email     |    password   |        address       | skin type |
    |:--:|:----------:|:--------------:|:-------------:|:--------------------:|:---------:|
    | 1  | Dila       | dila@yahoo.com | 12345678909000| Jl. Tanah Kusir No 33|    oily   |

    **Database Table Skincares**
    | id |      name     |  skin type  |  price |
    |:--:|:-------------:|:-----------:|:------:|
    | 1  | Aloe Vera Gel |     oily    | 150000 |

    **Database Table Carts**
    | id |  UserId  | SkinCareId |
    |:--:|:--------:|:----------:|
    | 1  |    1     |     1      |



