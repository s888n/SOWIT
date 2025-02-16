# SOWIT

## Table of Contents

- [Demo](#demo)
- [Description](#description)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Features](#features)

## Demo


https://github.com/user-attachments/assets/ccc3734f-9187-4414-9c2a-d07864927c80


## Description

Using the Mapbox API, users can create polygons on the map and save them to the database. Users can also view and delete the polygons they have created.

## Tech Stack

## Tech Stack

| Category             | Technology                                                        |
| -------------------- | ----------------------------------------------------------------- |
| **Frontend**         | React - TypeScript - React Three Fiber - Axios                    |
| **Backend**          | Django - Django Rest Framework - Django Rest Framework Simple JWT |
| **Database**         | PostgreSQL                                                        |
| **Containerization** | Docker                                                            |
| **Version Control**  | Git                                                               |
| **GeoLocation**      | Mapbox                                                            |

## Installation


- Clone the repository
- Create a `.env` file in the root directory and provide the environment variables like in the `.env.example` file
- Run `Docker-compose up --build`
- That's it! The frontend should be running on `http://localhost:3000`

## Features

- JWT Authentication with HttpOnly Cookies
- Social Authentication with Github
- 3D Graphics with React Three Fiber
- Dark/Light Theme
- Mapbox Integration
- Create, Save , View and delete Polygons on the map

## Features i will add in the future

- User prifile ans settings
- Edit the polygons data (90 % done)
- Add a search bar to search for a specific polygon
- View other users polygons in thier profile
- 2FA
- A 3D viewer for the polygons

