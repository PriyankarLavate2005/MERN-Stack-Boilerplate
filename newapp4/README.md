# newapp4

MERN Stack Application

## Setup

1. Install dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
```bash
cp server/.env.example server/.env
```

3. Start MongoDB (choose one method):

**Method 1: Using system service**
```bash
# Ubuntu/Debian
sudo systemctl start mongod

# macOS with Homebrew
brew services start mongodb/brew/mongodb-community

# Windows
net start MongoDB
```

**Method 2: Using docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Method 3: Manual start**
```bash
sudo mongod --dbpath /var/lib/mongodb
```

4. Run the application:
```bash
npm run dev
```

## Scripts

- `npm run dev` - Start both client and server
- `npm run install:all` - Install all dependencies
- `npm run dev:client` - Start only client
- `npm run dev:server` - Start only server