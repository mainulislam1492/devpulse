# DevPulse

DevPulse is a RESTful issue tracking API built with Node.js, TypeScript, Express.js, and PostgreSQL. It provides JWT-based authentication and role-based access control for Contributors and Maintainers.

## Live URL

**Live API:** [`Add your deployed URL here`](https://devpulse-api-ivory.vercel.app/)

## Features

* User registration and login
* JWT-based authentication
* Role-based authorization
* Contributor and Maintainer roles
* Secure password hashing with bcrypt
* Create new issues
* Get all issues
* Get a single issue
* Filter issues by type and status
* Sort issues by newest or oldest
* Contributors can update their own open issues
* Maintainers can update any issue
* Maintainers can delete any issue
* Maintainers can independently change issue workflow status
* Standardized success and error responses
* Modular and maintainable project structure
* PostgreSQL database with native `pg`

## Tech Stack

* **Runtime:** Node.js
* **Language:** TypeScript
* **Framework:** Express.js
* **Database:** PostgreSQL
* **Database Driver:** `pg`
* **Authentication:** JSON Web Token (JWT)
* **Password Hashing:** bcrypt
* **Environment Variables:** dotenv
* **API Testing:** Postman

## Project Structure

```text
src/
├── config/
│   └── index.ts
│
├── middleware/
│   └── auth.middleware.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.route.ts
│   │   └── auth.interface.ts
│   │
│   └── issues/
│       ├── issues.controller.ts
│       ├── issues.service.ts
│       ├── issues.route.ts
│       └── issues.interface.ts
│
├── utils/
│   ├── AppError.ts
│   └── response.ts
│
├── app.ts
└── server.ts
```

## Installation & Setup

### 1. Clone the repository

```bash
git clone <[your-github-repository-url](https://github.com/mainulislam1492/devpulse.git)>
cd DevPulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env` file in the project root:

```env
PORT=8000
CONNECTIONSTRING=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

> Never commit your `.env` file to GitHub.

### 4. Start the development server

```bash
npm run dev
```

The server will run at:

```text
http://localhost:8000
```

## API Endpoints

### Authentication

| Method | Endpoint           | Access | Description           |
| ------ | ------------------ | ------ | --------------------- |
| POST   | `/api/auth/signup` | Public | Register a new user   |
| POST   | `/api/auth/login`  | Public | Login and receive JWT |

### Issues

| Method | Endpoint                 | Access        | Description                  |
| ------ | ------------------------ | ------------- | ---------------------------- |
| POST   | `/api/issues`            | Authenticated | Create a new issue           |
| GET    | `/api/issues`            | Public        | Get all issues               |
| GET    | `/api/issues/:id`        | Public        | Get a single issue           |
| PATCH  | `/api/issues/:id`        | Authenticated | Update issue fields          |
| DELETE | `/api/issues/:id`        | Maintainer    | Delete any issue             |
| PATCH  | `/api/issues/:id/status` | Maintainer    | Change issue workflow status |

## Query Parameters

The `GET /api/issues` endpoint supports filtering and sorting.

### Sort

```text
GET /api/issues?sort=newest
GET /api/issues?sort=oldest
```

### Filter by Type

```text
GET /api/issues?type=bug
GET /api/issues?type=feature_request
```

### Filter by Status

```text
GET /api/issues?status=open
GET /api/issues?status=in_progress
GET /api/issues?status=resolved
```

### Combine Filters

```text
GET /api/issues?type=bug&status=open&sort=newest
```

## Database Schema

### Users Table

| Field        | Type      | Description                   |
| ------------ | --------- | ----------------------------- |
| `id`         | SERIAL    | Primary key                   |
| `name`       | VARCHAR   | User name                     |
| `email`      | VARCHAR   | Unique user email             |
| `password`   | TEXT      | Hashed password               |
| `role`       | VARCHAR   | `contributor` or `maintainer` |
| `created_at` | TIMESTAMP | Account creation time         |
| `updated_at` | TIMESTAMP | Last update time              |

### Issues Table

| Field         | Type         | Description                          |
| ------------- | ------------ | ------------------------------------ |
| `id`          | SERIAL       | Primary key                          |
| `title`       | VARCHAR(150) | Issue title                          |
| `description` | TEXT         | Minimum 20 characters                |
| `type`        | VARCHAR      | `bug` or `feature_request`           |
| `status`      | VARCHAR      | `open`, `in_progress`, or `resolved` |
| `reporter_id` | INT          | ID of the issue reporter             |
| `created_at`  | TIMESTAMP    | Issue creation time                  |
| `updated_at`  | TIMESTAMP    | Last update time                     |

## User Roles & Permissions

### Contributor

A Contributor can:

* Register and login
* Create issues
* View all issues
* View a single issue
* Update their own issue fields
* Update their own issue only when its status is `open`

### Maintainer

A Maintainer can:

* Perform all Contributor operations
* Update any issue
* Delete any issue
* Independently change issue workflow status

## Issue Types

Issues can have one of the following types:

```text
bug
feature_request
```

## Issue Workflow Status

Issues can have one of the following statuses:

```text
open
in_progress
resolved
```

## Authentication

Protected endpoints require a valid JWT token.

Include the token in the request header:

```text
Authorization: Bearer <your_jwt_token>
```

## API Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

## HTTP Status Codes

| Status Code | Meaning                        |
| ----------- | ------------------------------ |
| `200`       | Successful request             |
| `201`       | Resource created               |
| `400`       | Bad request / validation error |
| `401`       | Unauthorized                   |
| `403`       | Forbidden                      |
| `404`       | Resource not found             |
| `409`       | Conflict                       |
| `500`       | Internal server error          |

## Security

* Passwords are hashed using bcrypt.
* Passwords are never returned in API responses.
* JWT is used for authentication.
* Role-based authorization protects privileged operations.
* Environment secrets are stored in `.env`.
* `.env` should not be committed to the repository.

## Development

Run the project in development mode:

```bash
npm run dev
```

Build the TypeScript project:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

## Author

**Mainul Islam Mahim**

CSE @ IIUC | Backend Developer
