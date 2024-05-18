# Local Farmers Market

Welcome to the Local Farmers Market project! This project is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, enabling farmers to sell their products through a web application.

## Features

- **User Authentication**: Secure login and registration for users and farmers.
- **Product Listings**: Farmers can list their products with images, descriptions, and prices.
- **Payment Integration**: Secure payments through Stripe.
- **Responsive Design**: User-friendly interface compatible with all devices.

## Quick Start

### Prerequisites

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/)
- **MongoDB**: Set up a local instance or use a cloud service like MongoDB Atlas
- **npm**: Comes with Node.js, but make sure it's updated

### Installation

1. **Clone the Repository**

    ```sh
    git clone https://github.com/Kritikaadhikarii/Local-Farmers-Market
    cd Local-Farmers-Market
    code .
    ```

2. **Install Dependencies**

    - **Backend**

      ```sh
      cd backend
      npm install
      ```

    - **Frontend**

      ```sh
      cd ../frontend
      npm install
      ```

3. **Using Yarn** (optional)

    ```sh
    yarn
    ```

### Environment Variables

Create a `.env` file in the root of the `backend` directory:

```plaintext
PORT=8000
DB_URL="your_mongodb_connection_string"
JWT_SECRET_KEY="your_jwt_secret_key"
JWT_EXPIRES=7d
ACTIVATION_SECRET="your_activation_secret"
STRIPE_API_KEY="your_stripe_public_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
```

**Note**: Keep the `.env` file out of version control by adding it to your `.gitignore` file.

### Stripe Keys

To process payments, you need to set up a Stripe account and get your API keys.

1. Go to the [Stripe website](https://stripe.com/).
2. Sign up or log in.
3. Navigate to the Developers section to get your **Publishable key** and **Secret key**.
4. Add these keys to your `.env` file as shown above.

### Running the Application

1. **Start the Backend**

    ```sh
    cd backend
    npm run dev
    ```

2. **Start the Frontend**

    ```sh
    cd ../frontend
    npm start
    ```

This will open the Local Farmers Market application in your browser.


---

Thank you for visiting the Local Farmers Market project! If you have any questions, feel free to open an issue or contact us directly. Happy coding!