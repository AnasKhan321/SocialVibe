# SocialVibe

Welcome to SocialVibe - Your New Social Media Experience!

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)


## Introduction

SocialVibe is a feature-rich social media website designed to provide users with a seamless and enjoyable experience in connecting with friends, sharing updates, and engaging with a vibrant community.

## Features

- **User Authentication:** Securely create an account and log in to start your social journey.

- **Profile Management:** Customize your profile with a profile picture, bio, and other personal details.

- **Post Updates:** Share your thoughts, images, and links with your followers.

- **Follow and Unfollow:** Stay connected with friends and follow their updates. Unfollow when you need a break.

- **Like and Comment:** Engage with posts by liking and adding thoughtful comments.

- **Search Functionality:** Easily find and connect with friends using our intuitive search feature.

## Getting Started

### Installation

1. **Clone the Repository:**
   ```bash
     git clone https://github.com/AnasKhan321/SocialVibe

2. **Install the Dependencies:**
    ```bash
        npm i

  in both the folders 

3. ** Make .env File and Provide this environment Variable:**
   ```bash
       #server
        PORT=8000 # I prefered 8000 it still upon you 
        CLIENT_HOST = #Your Client Host where you host your Client App in Localhost 
        HOST_EMAIL = #Your Desired Email from Which You can send email to the user 
        EMAIL_PASSWORD = #Your password of that email address 
        
        SECRET_TOKEN = #Your secret token for jwt Token



       #Client
       REACT_APP_BACKEND_URL=  #Your Backend Host
 4. **Start the Your Desire MongoDb Server  :**
 5. ** Start Your Backend Server :**
    ```bash
      node ./index.js

  6. ** Start the React App :**
      ```bash
        npm run start 
              
    
   
