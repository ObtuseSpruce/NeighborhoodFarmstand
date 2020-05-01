# NeighborhoodFarmstand

This is an app meant to help connect gardeners with people who are need of their extra produce!
Its here to encourage neighborhood connections and promote gardening as a whole.

## What It Includes

* Local Auth (email and password)
* Passport and passport local
* Sessions for saving user info and displaying flash messages
* Settings for PostgreSQL and Sequelize
* Hashed passwords
* EJS templating and EJS layouts
* Sequelize User model
* Materialize styling - nav and footer
* Mapbox API
* ZIPCODEAPI

**User Model**
| column | Type | Notes
| ----------- | ------------ | --------------------- |
| id | Integer | Serial Primary Key |
| firstName | String | Required Length > 1 |
| lastName | String | - |
| email | String | Unique Login |
| password | String | Hash |
| birthday | Date | - |
| admin | Boolean | Defaulted to False |
| pic | String | - |
| bio | text | - |
| createdAt | Date | Automatically added by Sequelize |
| lastUpdated | Date | Automatically added by Sequelize |

**Post Model**
| column | Type | Notes
| ----------- | ------------ | --------------------- |
| id | Integer | Serial Primary Key |
| offer | String | - |
| trade | String | - |
| offerType | String | - |
| tradeType | String | - |
| postContent | String | - |
| zip | Integer | - |
| userId | Integer | - |
| createdAt | Date | Automatically added by Sequelize |
| lastUpdated | Date | Automatically added by Sequelize |

## Directions For Use

You can begin by simpling searching for posts by inputing your zipcode into the search bar.
Signup or login to post or access emails for further communication.
