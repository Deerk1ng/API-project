# GrounDND README.md

This is a project emulating the Airbnb website functionality of displaying, creating, updating and deleting Spots as well as being able to view, write, and delete reviews for each spot.

# Index
* Github Repo: https://github.com/Deerk1ng/API-project
* Live Link: [Hayden's Airbnb Website](https://hayden-auth-me.onrender.com/)

# Technologies Used
This project makes use of:
* Javascript/HTML/CSS
* JSON API
* Redux
* React
* Express
* SQLITE3
* Sequelize
* PostgreSQL

# Setup
Clone the starter repo through one of the links accessible through the `<> Code` dropdown button and then go through the following steps to setup

### Backend
1. `cd` into the backend directory
2. Install dependencies with `npm install`
3. Copy the **.env.example file** to a new **.env** file
   * The server should be listening for requests on port `8000`
   * The SQLite3 database file should be **db/dev.db**
4 Run
   * `npm run migrate && npm run seed` - set up the database with the built in seed and migration files
   * `npm start` - start the backend server

### Frontend
1. `cd` into the **frontend** directory
2. install dependencies with `npm install`
3. Run `npm run dev` to start the frontend server
3. Open `http://localhost:5173/` to see the frontend

# Features

### Home Page/ All Spots

The website starts on a home page where users will see all spots currently available. A user can click on any spot to see its details as well as use the menu button to create an account or to log into an existing account. A Demo user has been provided to easily access all features.

![image](https://github.com/user-attachments/assets/4b09333d-6e30-4e0a-9e70-0b7c066b507a)
### Sign Up User
![image](https://github.com/user-attachments/assets/1ce7bcaf-c620-46e2-8dca-4b6f23334cc8)

### Log In User
![image](https://github.com/user-attachments/assets/df7e126c-b444-4869-88fc-9195dde18565)

## Spots
### Create a Spot
Once a user is logged in they can click the Create a Spot link to be directed to a form where they can upload their own Spot.
![image](https://github.com/user-attachments/assets/b1b72a76-0c79-4af7-9693-a14a25b210f4)

Users can see all the spots they own as well as update the details as they see fit or delete the spot if they wish
### Manage Spots
![image](https://github.com/user-attachments/assets/ddb9abab-c519-4df1-a8d0-d95a195a7657)

### Update a Spot
![image](https://github.com/user-attachments/assets/02b9b9c5-7ddb-4d07-a2db-cf92ab6c4728)

### Delete a Spot
![image](https://github.com/user-attachments/assets/6b9dee6e-e391-457c-9ec9-d1ea2730a808)

### See Individual Spot
Users can see all details of any individual spot by clicking on the spot's listing. All reviews associated with a spot will also render.
![image](https://github.com/user-attachments/assets/65def14a-7abb-4350-8a9a-6983276923ac)

![image](https://github.com/user-attachments/assets/1f80cb30-3832-44a4-a10a-006d3067f6c2)

## Reviews

### Create a Review
Users can also place a review for a spot they do not own as well as delete the review if they see fit.

![image](https://github.com/user-attachments/assets/fc02f552-794c-458d-a5bf-d3c5e02c712c)
![image](https://github.com/user-attachments/assets/f95b7376-f682-44e5-abda-126e55d1f33b)

### Delete a Review
![image](https://github.com/user-attachments/assets/550f2436-4ec2-40ec-98d1-b965dd8dd055)


### To Dos and Future Features:
* Users will be able to Reserve a spot for certain dates
* Users will be able to Search spots for certain features
* Users will be able to Favorite a Spot to find later

### Technical Implementation details
The front end code for this project was an interesting cycle of creating Pages, Actions, Thunks, Reducers, and then Styling the pages. I would spend a lot of time planning how to structure the HTML to make it easier to style as well as making sure my actions and reducers were dry. I ended up adapting many of my thunks to using the same add a spot reducer feature and opted to keep certain information (individual spots and photos) out of the redux store.
