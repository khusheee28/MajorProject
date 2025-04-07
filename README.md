# UmeedFund - Decentralized Fundraising Platform

A modern fundraising platform that supports both traditional and blockchain-based campaigns.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- MetaMask extension (for blockchain features)

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd umeedfund
```

2. Install dependencies:
```bash
npm run install-all
```

3. Set up the database:
   - Open MySQL command line or MySQL Workbench
   - Run the initialization script:
   ```sql
   source backend/init-db.sql
   ```

4. Configure environment variables:
   - Create `.env` file in the backend directory:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=umeedfund
   NODE_ENV=development
   ```

5. Start the development servers:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

## Features

- Create and manage fundraising campaigns
- Support for both traditional and blockchain-based campaigns
- Real-time campaign progress tracking
- Secure donation processing
- Responsive and modern UI with Material-UI
- Beautiful animations with Framer Motion

## Project Structure

```
umeedfund/
├── backend/              # Backend server
│   ├── config/          # Database configuration
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   └── server.js        # Server entry point
├── frontend/            # React frontend
│   ├── public/         # Static files
│   └── src/            # Source files
└── package.json        # Root package.json
```

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run install-all` - Install dependencies for root, frontend, and backend
- `npm run build` - Build the frontend for production
- `npm start` - Start the production server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 