# Memory Lane - Quick Start Guide
## Get Started in 10 Minutes!

---

## 🚀 INSTANT SETUP

### **Option 1: React App Only (5 minutes)**

```bash
# 1. Copy the React component
cd your-react-project
touch src/MemoryLane.jsx

# 2. Paste the complete React code from MemoryLane-Frontend-Complete.jsx

# 3. Install Recharts dependency
npm install recharts lucide-react

# 4. Import in your App.js
import MemoryLaneApp from './MemoryLane';

# 5. Use the component
function App() {
  return <MemoryLaneApp />;
}

# 6. Run your app
npm run dev
```

**Result**: Full Memory Lane app running on localhost:3000

---

### **Option 2: Complete MERN Stack (Docker - 10 minutes)**

```bash
# 1. Clone/download the project
git clone <your-repo>
cd memory-lane

# 2. Create docker-compose.yml in project root with:
# (See Docker configuration section below)

# 3. Start all services
docker-compose up -d

# 4. Access the app
# Frontend:  http://localhost:3000
# Backend:   http://localhost:5000
# MongoDB:   mongodb://localhost:27017
# Redis:     redis://localhost:6379
```

---

## 📋 COMPLETE PROJECT STRUCTURE

Create this folder structure:

```bash
mkdir -p memory-lane/{frontend,backend,ml-models}

# Frontend
cd frontend
npx create-react-app .
# OR
npm create vite@latest . -- --template react

# Backend
cd ../backend
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken axios nodemailer socket.io
npm install --save-dev nodemon

# ML Models
cd ../ml-models
pip install tensorflow keras mediapipe scikit-learn pandas numpy
```

---

## 🐳 DOCKER SETUP

### **File: docker-compose.yml**

```yaml
version: '3.8'

services:
  # MongoDB Database
  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: memory_lane
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
    volumes:
      - mongo_data:/data/db
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Node.js Backend
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: development
      MONGODB_URI: mongodb://admin:password123@mongo:27017/memory_lane
      REDIS_URL: redis://redis:6379
      JWT_SECRET: your_jwt_secret_key_change_this
      PORT: 5000
    depends_on:
      mongo:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run dev
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  # React Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: http://localhost:5000/api
      REACT_APP_WS_URL: ws://localhost:5000
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 3s
      retries: 3

  # ML Model Server (Optional)
  ml-server:
    build:
      context: ./ml-models
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      MODEL_PATH: ./models
      PORT: 8000
    volumes:
      - ./ml-models:/app
    command: python serve.py --host 0.0.0.0 --port 8000

volumes:
  mongo_data:
  redis_data:

networks:
  default:
    name: memory_lane_network
```

### **File: backend/Dockerfile**

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application
COPY . .

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

# Start
CMD ["npm", "run", "dev"]
```

### **File: frontend/Dockerfile**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

CMD ["npm", "run", "dev"]
```

### **Commands**

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild images
docker-compose up -d --build

# Access MongoDB shell
docker-compose exec mongo mongosh -u admin -p password123

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
```

---

## 🔧 MANUAL SETUP (Without Docker)

### **1. MongoDB Setup**

```bash
# Install MongoDB locally or use MongoDB Atlas

# For Mac
brew install mongodb-community
brew services start mongodb-community

# For Windows
# Download: https://www.mongodb.com/try/download/community

# For Linux
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### **2. Backend Setup**

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
# Server
NODE_ENV=development
PORT=5000
HOST=localhost

# Database
MONGODB_URI=mongodb://localhost:27017/memory_lane
MONGODB_PASSWORD=

# JWT
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d

# Redis
REDIS_URL=redis://localhost:6379

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Features
ENABLE_ML_FEATURES=true
ENABLE_VOICE_ASSISTANT=true
EOF

# Start development server
npm run dev
```

### **3. Frontend Setup**

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:5000
EOF

# Start React dev server
npm run dev

# Open http://localhost:3000
```

### **4. Redis Setup (Optional)**

```bash
# Install Redis
brew install redis        # Mac
sudo apt install redis    # Linux

# Start Redis
redis-server

# Test connection
redis-cli ping
```

---

## 📝 DEMO CREDENTIALS

### **Doctor Account**
```
Email: dr.sharma@hospital.com
Password: password123
```

### **Caregiver Account**
```
Email: care.anjali@gmail.com
Password: password123
```

### **Test Patient Data**
```
Patient ID: P001
Name: Raj Kumar
Injury: Traumatic Brain Injury (TBI)
Status: In Progress
```

---

## 🧪 TESTING

### **Frontend Testing**

```bash
# Create package.json scripts
"test": "jest --watch",
"test:coverage": "jest --coverage"

# Install testing library
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test
```

### **Backend Testing**

```bash
# Install testing framework
npm install --save-dev jest supertest

# Create tests/auth.test.js
# Run tests
npm test

# Load testing
npm install --save-dev artillery
artillery quick --count 100 --num 10 http://localhost:5000/api/patients
```

### **API Testing with Postman**

```bash
# Import collection into Postman

# Test endpoints:
GET    http://localhost:5000/api/health
POST   http://localhost:5000/api/auth/login
GET    http://localhost:5000/api/patients
POST   http://localhost:5000/api/therapy/generate
```

---

## 🎯 ENVIRONMENT CONFIGURATION

### **Development .env**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/memory_lane
JWT_SECRET=dev_secret_key
DEBUG=true
```

### **Production .env**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/memory_lane
JWT_SECRET=prod_secret_key_super_secure
DEBUG=false
HTTPS=true
```

---

## 📊 MONITORING & LOGS

### **View Application Logs**

```bash
# Using Docker
docker-compose logs -f backend
docker-compose logs -f frontend

# Using Node directly
DEBUG=* npm run dev

# MongoDB logs
tail -f /var/log/mongodb/mongod.log
```

### **Health Checks**

```bash
# Backend health
curl http://localhost:5000/health

# Frontend health
curl http://localhost:3000

# Database connection
mongosh mongodb://localhost:27017

# Redis connection
redis-cli ping
```

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying to production:

- [ ] Update environment variables
- [ ] Set secure JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set up SSL certificates
- [ ] Configure MongoDB Atlas (production DB)
- [ ] Set up Redis Cache
- [ ] Configure email service
- [ ] Set up error tracking (Sentry)
- [ ] Enable CORS properly
- [ ] Set up CDN for static assets
- [ ] Configure automated backups
- [ ] Set up monitoring alerts
- [ ] Run security audit
- [ ] Load test application
- [ ] Prepare disaster recovery plan

---

## 🔑 KEY FILES TO CUSTOMIZE

### **1. Update Hospital/Organization Name**
- `frontend/src/MemoryLane.jsx` - Search for "Memory Lane" and update branding
- `backend/server.js` - Update app name in headers

### **2. Update Colors/Theme**
- `frontend/src/MemoryLane.jsx` - Update `Theme` object colors
- Tailwind config for additional customization

### **3. Update API Endpoints**
- `.env` - Update `REACT_APP_API_URL`
- Create appropriate backend routes

### **4. Add Your Logo**
- Replace in Navbar component
- Update favicon in public/index.html

### **5. Configure Email Service**
- Update `EMAIL_USER` and `EMAIL_PASSWORD` in .env
- Use SendGrid, Gmail, or other service

---

## 🐛 TROUBLESHOOTING

### **MongoDB Connection Failed**
```bash
# Check MongoDB is running
mongosh

# If not running:
brew services start mongodb-community    # Mac
sudo systemctl start mongodb              # Linux

# Check connection string in .env
MONGODB_URI=mongodb://localhost:27017/memory_lane
```

### **Port Already in Use**
```bash
# Find process using port
lsof -i :3000      # Frontend
lsof -i :5000      # Backend
lsof -i :27017     # MongoDB

# Kill process
kill -9 <PID>

# Or use different port in .env
PORT=5001
```

### **npm Dependency Issues**
```bash
# Clear cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Update packages
npm update
```

### **CORS Errors**
```bash
# Update backend CORS config:
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### **JWT Token Expired**
```bash
# Clear localStorage in browser console:
localStorage.clear()

# Login again
```

---

## 📚 NEXT STEPS

1. **Setup Complete?** ✅
2. **Customize Branding** - Add your logo and colors
3. **Connect Database** - Verify MongoDB connection
4. **Test APIs** - Use Postman/Insomnia
5. **Add Real Data** - Import patient records
6. **Deploy** - Follow deployment guide
7. **Monitor** - Set up logging and monitoring
8. **Scale** - Optimize for production load

---

## 📞 COMMON COMMANDS

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose up -d --build

# Development mode (without Docker)
npm run dev              # In both frontend and backend directories

# Production build
npm run build            # Frontend
npm run start            # Backend with NODE_ENV=production

# Database
mongosh                  # Connect to MongoDB
redis-cli               # Connect to Redis

# Testing
npm test                # Run tests
npm run test:coverage   # With coverage report

# Format code
npm run format          # Prettier
npm run lint            # ESLint
```

---

## 🎓 LEARNING RESOURCES

- **React**: https://react.dev
- **Express.js**: https://expressjs.com
- **MongoDB**: https://www.mongodb.com/docs
- **Tailwind CSS**: https://tailwindcss.com
- **TensorFlow**: https://www.tensorflow.org
- **MediaPipe**: https://mediapipe.dev

---

## ✅ VERIFICATION CHECKLIST

After setup, verify:

```bash
# 1. Check all ports are open
lsof -i :3000 :5000 :27017 :6379

# 2. Test API connectivity
curl http://localhost:5000/health

# 3. Check database
mongosh --eval "db.adminCommand('ping')"

# 4. Test Redis
redis-cli ping

# 5. Open browser
open http://localhost:3000

# 6. Try demo login
# Email: dr.sharma@hospital.com
# Password: password123
```

---

## 🎉 YOU'RE READY!

Your Memory Lane instance is now running locally. Next:

1. **Explore the Dashboard** - Click through all features
2. **Test Therapy Generation** - Try the caregiver flow
3. **Review Patient Data** - Check doctor dashboard
4. **Customize** - Update colors, text, branding
5. **Deploy** - Follow production deployment guide

---

## 📞 SUPPORT

- **Documentation**: Read all .md files
- **Issues**: Check troubleshooting section
- **Community**: Reach out for help
- **Updates**: Check GitHub for latest version

---

**Happy coding! 🚀**

Memory Lane - Making memory therapy accessible to everyone.

