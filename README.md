# 🚀 Meeting Room Booking System API

Backend service for the Meeting Room Booking System. This API handles user management, booking operations, role-based permissions, and booking validation to ensure meeting room reservations are managed efficiently and without conflicts.

## Overview

The API provides the core functionality required for managing a single meeting room reservation system. It enforces business rules, validates booking requests, and controls access based on user roles.

The system supports three roles:

* Admin
* Owner
* User

All permission checks are enforced on the server side.

## Features
### User Management
Administrators can:
* Create users
* Delete users
* View all users
* Change user roles

### Booking Management
* Create bookings
* View bookings
* Delete bookings
* Prevent overlapping reservations
* Validate booking time ranges

### Role-Based Authorization
#### User
* Create bookings
* View all bookings
* Delete their own bookings

#### Owner
* Create bookings
* View all bookings
* Delete any booking
* View bookings grouped by user
* View booking usage summaries

#### Admin
* Full access to user and booking management

## Booking Validation Rules

The API enforces the following rules:
* Start time must be before end time.
* Booking periods cannot overlap.
* Identical booking ranges are not allowed.
* Partial overlaps are not allowed.
* Nested bookings are not allowed.
* Back-to-back bookings are allowed.
* Invalid requests return descriptive error responses.

## Technologies Used
* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS
* dotenv


## Running the Project
Install dependencies:
npm install

Start production server:
npm start



