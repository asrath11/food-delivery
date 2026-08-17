# Food Delivery Application

A full-stack food delivery platform with admin panel and customer-facing features, built with Flask (Python) backend and React frontend.

## 🚀 Features

### Authentication & Authorization
- User registration and login with JWT authentication
- Role-based access control (User/Admin roles)
- Secure password hashing with Bcrypt
- Cookie-based JWT token management

### Food Management
- CRUD operations for food items
- Image upload for food items
- Category-based organization
- Food attributes: Spicy, Vegetarian, Popular tags
- Search and filter functionality

### Shopping Cart
- Add/remove items from cart
- Quantity management
- Real-time cart updates

### Wishlist
- Save favorite items
- Quick access to preferred foods

### Order Management
- Order placement and tracking
- Order history for users

### Payment Integration
- Razorpay payment gateway integration
- Secure transaction processing

### Admin Dashboard
- Manage food items (add, edit, delete)
- Upload and manage food images
- View and manage orders
- User management

## 🛠️ Technologies

### Backend
- **Flask** - Web framework
- **Flask-SQLAlchemy** - ORM for database operations
- **MySQL** - Database (via mysqlclient)
- **Flask-Migrate** - Database migration management
- **Flask-Bcrypt** - Password hashing
- **Flask-JWT-Extended** - JWT authentication
- **Flask-CORS** - Cross-origin resource sharing
- **Razorpay** - Payment gateway
- **Waitress** - Production WSGI server
- **Pydantic-settings** - Configuration management
- **Python-dotenv** - Environment variable management

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library
- **Axios** - HTTP client for API calls
- **React Toastify** - Notification system

## 📁 Project Structure

```
food-delivery/
├── backend/                    # Flask backend application
│   ├── app/
│   │   ├── controllers/       # API route handlers
│   │   │   ├── auth_controller.py
│   │   │   ├── cart_controller.py
│   │   │   ├── items_controller.py
│   │   │   ├── orders_controller.py
│   │   │   ├── user_controller.py
│   │   │   └── wishlist_controller.py
│   │   ├── models/            # Database models
│   │   │   ├── cart.py
│   │   │   ├── item.py
│   │   │   ├── user.py
│   │   │   └── wishlist.py
│   │   ├── schemas/           # Data validation schemas
│   │   ├── decorators/        # Custom decorators
│   │   └── __init__.py        # App factory
│   ├── migrations/           # Database migrations
│   ├── uploads/              # Uploaded food images
│   ├── config.py             # Configuration settings
│   ├── main.py               # Application entry point
│   ├── pyproject.toml        # Python dependencies (Poetry)
│   └── requirements.txt      # Python dependencies (pip)
│
├── admin-frontend/            # React admin panel
│   ├── src/
│   │   ├── api/              # API service layer
│   │   ├── components/       # Reusable components
│   │   │   ├── admin-dashboard/
│   │   │   ├── cart/
│   │   │   ├── categories/
│   │   │   ├── food/
│   │   │   ├── navigation/
│   │   │   ├── ui/           # UI components
│   │   │   └── ...
│   │   ├── pages/            # Page components
│   │   │   ├── AdminDashBoard.jsx
│   │   │   ├── Food.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── cart/
│   │   │   └── wishlist/
│   │   ├── hooks/            # Custom React hooks
│   │   ├── constants/        # Application constants
│   │   ├── lib/              # Utility functions
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── package.json          # Node.js dependencies
│   └── vite.config.js        # Vite configuration
│
└── README.md                 # This file
```

## 🗄️ Database Models

### User
- `id` - UUID primary key
- `name` - User name
- `email` - Unique email address
- `password` - Hashed password
- `role` - User role (user/admin)

### Item (Food)
- `id` - UUID primary key
- `name` - Food item name
- `category` - Food category
- `desc` - Description
- `price` - Price in integer
- `image` - Image filename
- `is_spicy` - Spicy flag
- `is_vegetarian` - Vegetarian flag
- `is_popular` - Popular flag

### Cart
- Stores user cart items with quantities

### Wishlist
- Stores user's favorite items

## 🔧 Installation

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies using Poetry**
```bash
poetry install
```

Or using pip:
```bash
pip install -r requirements.txt
```

3. **Set up environment variables**
Create a `.env` file in the backend directory:
```env
SECRET_KEY=your_secret_key
JWT_ACCESS_SECRET=your_jwt_secret
DB_URL=mysql+pymysql://user:password@localhost/food_delivery
PORT=5000
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

4. **Initialize database**
```bash
flask db upgrade
```

5. **Run the server**
```bash
python main.py
```

The backend will run on `http://0.0.0.0:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd admin-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

4. **Build for production**
```bash
npm run build
```

## 🔌 API Endpoints

### Authentication (`/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout

### Users (`/users`)
- `GET /` - Get user profile
- `PUT /` - Update user profile

### Items (`/items`)
- `GET /` - Get all food items
- `GET /<id>` - Get single item
- `POST /` - Create new item (Admin only)
- `PUT /<id>` - Update item (Admin only)
- `DELETE /<id>` - Delete item (Admin only)

### Cart (`/cart`)
- `GET /` - Get user cart
- `POST /` - Add item to cart
- `PUT /` - Update cart item quantity
- `DELETE /` - Remove item from cart

### Wishlist (`/wishlist`)
- `GET /` - Get user wishlist
- `POST /` - Add item to wishlist
- `DELETE /` - Remove item from wishlist

### Orders (`/orders`)
- `POST /` - Create new order
- `GET /` - Get user orders

## 🌐 Deployment

### Backend Deployment
The backend is configured to run with Waitress server and is deployed on Render.

### Frontend Deployment
The frontend is built with Vite and can be deployed to any static hosting service (Vercel, Netlify, Render, etc.).

## 👤 Author

**Asrath**
- Email: pasrath.2004@gmail.com

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a personal project. For contributions or suggestions, please contact the author.
