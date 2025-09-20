# FitnessPal API

A comprehensive Laravel-based RESTful API for a fitness tracking application that helps users manage their nutrition, exercise, and wellness goals.

## 📋 Overview

FitnessPal API is a backend system that powers a fitness tracking application with features for food logging, exercise tracking, goal setting, and progress monitoring. The API supports both regular users and administrative functions.

## ✨ Features

### User Features
- **User Authentication & Registration** - JWT-based authentication with multi-step registration
- **Profile Management** - Complete user profiles with fitness goals and preferences
- **Food Tracking** - Log meals with detailed nutritional information
- **Exercise Tracking** - Record cardio, strength, and custom exercises
- **Goal Setting** - Set and track fitness and nutrition goals
- **Progress Monitoring** - Weight tracking and progress reports
- **Water Intake Tracking** - Monitor daily water consumption

### Admin Features
- **Dashboard Analytics** - Comprehensive system statistics and overview
- **User Management** - Complete CRUD operations for user accounts
- **Content Moderation** - Approve/reject user-submitted food and exercise entries
- **System Settings** - Manage application configuration
- **Reporting** - Detailed analytics and usage reports
- **Notification System** - Send notifications to users

## 🛠 Technology Stack

- **Backend Framework**: Laravel 10+
- **Authentication**: Laravel Sanctum (JWT tokens)
- **Database**: MySQL
- **API Documentation**: OpenAPI/Swagger (to be implemented)
- **Validation**: Laravel Form Request Validation

## 📦 Installation

### Prerequisites
- PHP 8.1 or higher
- Composer
- MySQL/PostgreSQL database
- Web server (Apache/Nginx)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone -b fitnesspal-api https://github.com/jabezinu/MyFitnesspal_TeamIV.git
   cd fitnesspal-api
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database**
   Edit `.env` file with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=fitnesspal
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Run migrations**
   ```bash
   php artisan migrate
   ```

6. **Seed database (optional)**
   ```bash
   php artisan db:seed --class=ExerciseMasterSeeder
   php artisan db:seed --class=DatabaseSeeder
   ```

7. **Install Laravel Sanctum**
   ```bash
   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
   php artisan migrate
   ```

8. **Generate API keys**
   ```bash
   php artisan passport:install
   ```

9. **Start development server**
   ```bash
   php artisan serve
   ```

## 🔧 Configuration

### Environment Variables

Update these values in your `.env` file:

```env
APP_NAME=FitnessPal
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fitnesspal
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1
SESSION_DOMAIN=localhost
```

### CORS Configuration

Update `config/cors.php` to allow your frontend domain:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:3000'], // Your frontend URL
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => true,
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | User login |
| POST | `/api/register/start` | Start registration process |
| POST | `/api/register/save-step/{flowId}` | Save registration step |
| POST | `/api/register/complete/{flowId}` | Complete registration |
| GET | `/api/me` | Get current user info |
| POST | `/api/logout` | User logout |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get user profile |
| PUT | `/api/profile` | Update user profile |
| GET | `/api/goals` | Get user goals |
| POST | `/api/goals` | Create a new goal |
| PUT | `/api/goals/{goal}` | Update a goal |
| DELETE | `/api/goals/{goal}` | Delete a goal |

### Food Tracking Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/food-diary` | Get food diary entries |
| POST | `/api/food-diary` | Create food diary entry |
| DELETE | `/api/food-diary/{id}` | Delete food diary entry |
| GET | `/api/food-diary/summary` | Get daily nutrition summary |
| GET | `/api/foods/search` | Search food items |

### Exercise Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/exercises` | Get exercises |
| POST | `/api/exercises` | Create exercise |
| GET | `/api/exercises/{id}` | Get exercise details |
| PUT | `/api/exercises/{id}` | Update exercise |
| DELETE | `/api/exercises/{id}` | Delete exercise |

### Report Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reports/daily` | Get daily report |
| GET | `/api/reports/summary` | Get summary report |
| GET | `/api/reports/weight-trend` | Get weight trend |
| GET | `/api/reports/goals-comparison` | Compare goals vs actual |

### Admin Endpoints

All admin endpoints are prefixed with `/api/admin` and require admin privileges.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/dashboard` | Admin dashboard stats |
| GET | `/admin/users` | Get all users |
| POST | `/admin/users` | Create new user |
| GET | `/admin/users/{id}` | Get user details |
| PUT | `/admin/users/{id}` | Update user |
| DELETE | `/admin/users/{id}` | Delete user |

For complete API documentation, import the Postman collection or view the OpenAPI specification.

## 🗃 Database Schema

The application uses the following main tables:

- `users` - User accounts and basic info
- `user_profiles` - Extended user profile information
- `user_goals` - User fitness goals
- `food_items` - Food database
- `food_diary_entries` - User food consumption records
- `exercise_databases` - Exercise database
- `cardio_exercise_entries` - Cardio workout records
- `strength_exercise_entries` - Strength workout records
- `check_ins` - Weight and progress check-ins
- `water_entries` - Water consumption records

## 🚀 Deployment

### Production Deployment(to be implemeted)

1. **Environment setup**
   ```bash
   composer install --optimize-autoloader --no-dev
   php artisan optimize
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

2. **Set up environment variables**
   Update `.env` with production values:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   ```

3. **Database migration**
   ```bash
   php artisan migrate --force
   ```

4. **Storage link**
   ```bash
   php artisan storage:link
   ```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
