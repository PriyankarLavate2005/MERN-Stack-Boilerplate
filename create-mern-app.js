#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class MernProjectGenerator {
  constructor(projectName, options = {}) {
    this.projectName = projectName;
    this.projectPath = path.join(process.cwd(), projectName);
    this.options = {
      useTypeScript: options.typescript || false,
      useRedux: options.redux || false,
      useSocketIO: options.socketio || false,
      useDocker: options.docker || false,
      ...options
    };
  }

  // Create directory if it doesn't exist
  createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  // Create file with content
  createFile(filePath, content = '') {
    const dir = path.dirname(filePath);
    this.createDir(dir);
    fs.writeFileSync(filePath, content);
  }

  // Generate client structure
  generateClient() {
    const clientPath = path.join(this.projectPath, 'client');
    const extension = this.options.useTypeScript ? 'tsx' : 'jsx';
    const jsExtension = this.options.useTypeScript ? 'ts' : 'js';

    // Directories to create
    const clientDirs = [
      'public',
      `src/components/common/Button`,
      `src/components/common/Modal`,
      `src/components/common/Loader`,
      `src/components/forms/LoginForm`,
      `src/components/forms/RegisterForm`,
      `src/components/layout/MainLayout`,
      `src/components/layout/AuthLayout`,
      `src/pages/Home`,
      `src/pages/Login`,
      `src/pages/Register`,
      `src/pages/Dashboard`,
      `src/pages/Profile`,
      `src/hooks`,
      `src/context`,
      `src/utils`,
      `src/services`,
      `src/store/slices`,
      `src/styles`,
      `src/assets/images`,
      `src/constants`,
      `src/types`,
      `src/validation`,
      `src/config`,
      `src/router`
    ];

    // Create all directories
    clientDirs.forEach(dir => this.createDir(path.join(clientPath, dir)));

    // Create public files
    this.createFile(
      path.join(clientPath, 'public', 'index.html'),
      this.getIndexHTML()
    );

    this.createFile(
      path.join(clientPath, 'public', 'manifest.json'),
      JSON.stringify({
        "short_name": "MERN App",
        "name": "MERN Stack Application",
        "icons": [
          {
            "src": "favicon.ico",
            "sizes": "64x64 32x32 24x24 16x16",
            "type": "image/x-icon"
          }
        ],
        "start_url": ".",
        "display": "standalone",
        "theme_color": "#000000",
        "background_color": "#ffffff"
      }, null, 2)
    );

    this.createFile(
      path.join(clientPath, 'public', 'robots.txt'),
      this.getRobotsTxt()
    );

    // Create src files
    this.createFile(
      path.join(clientPath, 'src', `App.${extension}`),
      this.getAppComponent()
    );

    this.createFile(
      path.join(clientPath, 'src', `index.${extension}`),
      this.getIndexComponent()
    );

    this.createFile(
      path.join(clientPath, 'src', `App.css`),
      this.getAppCSS()
    );

    // Create component files
    this.createFile(
      path.join(clientPath, 'src', 'components', 'common', 'Button', `Button.${extension}`),
      this.getButtonComponent()
    );

    this.createFile(
      path.join(clientPath, 'src', 'components', 'common', 'Button', `Button.css`),
      this.getButtonCSS()
    );

    // Create page files
    this.createFile(
      path.join(clientPath, 'src', 'pages', 'Home', `Home.${extension}`),
      this.getHomePage()
    );

    this.createFile(
      path.join(clientPath, 'src', 'pages', 'Login', `Login.${extension}`),
      this.getLoginPage()
    );

    this.createFile(
      path.join(clientPath, 'src', 'pages', 'Register', `Register.${extension}`),
      this.getRegisterPage()
    );

    // Create service files
    this.createFile(
      path.join(clientPath, 'src', 'services', `api.${jsExtension}`),
      this.getAPIService()
    );

    this.createFile(
      path.join(clientPath, 'src', 'services', `authService.${jsExtension}`),
      this.getAuthService()
    );

    // Create utility files
    this.createFile(
      path.join(clientPath, 'src', 'utils', `helpers.${jsExtension}`),
      this.getClientHelpers()
    );

    // Create context files
    this.createFile(
      path.join(clientPath, 'src', 'context', `AuthContext.${extension}`),
      this.getAuthContext()
    );

    // Create store files if using Redux
    if (this.options.useRedux) {
      this.createFile(
        path.join(clientPath, 'src', 'store', `store.${jsExtension}`),
        this.getStoreConfig()
      );

      this.createFile(
        path.join(clientPath, 'src', 'store', 'slices', `authSlice.${jsExtension}`),
        this.getAuthSlice()
      );
    }

    // Create router files
    this.createFile(
      path.join(clientPath, 'src', 'router', `AppRouter.${extension}`),
      this.getAppRouter()
    );

    this.createFile(
      path.join(clientPath, 'src', 'router', `ProtectedRoute.${extension}`),
      this.getProtectedRoute()
    );

    // Create style files
    this.createFile(
      path.join(clientPath, 'src', 'styles', 'index.css'),
      this.getGlobalCSS()
    );

    // Create config files
    this.createFile(
      path.join(clientPath, 'src', 'config', `config.${jsExtension}`),
      this.getClientConfig()
    );

    // Create package.json for client
    this.createFile(
      path.join(clientPath, 'package.json'),
      this.getClientPackageJSON()
    );

    // Create environment files
    this.createFile(
      path.join(clientPath, '.env.local'),
      'REACT_APP_API_URL=http://localhost:5000/api\nREACT_APP_NAME=MERN App'
    );

    this.createFile(
      path.join(clientPath, '.env.example'),
      'REACT_APP_API_URL=http://localhost:5000/api\nREACT_APP_NAME=MERN App'
    );

    // Create TypeScript config if using TypeScript
    if (this.options.useTypeScript) {
      this.createFile(
        path.join(clientPath, 'tsconfig.json'),
        this.getClientTSConfig()
      );
    }
  }

  // Generate server structure
  generateServer() {
    const serverPath = path.join(this.projectPath, 'server');

    // Directories to create
    const serverDirs = [
      'src/controllers',
      'src/routes',
      'src/models',
      'src/middleware',
      'src/config',
      'src/utils',
      'src/validations',
      'src/services',
      'src/constants',
      'src/uploads/images',
      'src/tests/unit',
      'src/tests/integration'
    ];

    // Create all directories
    serverDirs.forEach(dir => this.createDir(path.join(serverPath, dir)));

    // Create main server files
    this.createFile(
      path.join(serverPath, 'src', 'server.js'),
      this.getServerJS()
    );

    this.createFile(
      path.join(serverPath, 'src', 'app.js'),
      this.getAppJS()
    );

    // Create config files
    this.createFile(
      path.join(serverPath, 'src', 'config', 'database.js'),
      this.getDatabaseConfig()
    );

    // Create middleware files
    this.createFile(
      path.join(serverPath, 'src', 'middleware', 'auth.js'),
      this.getAuthMiddleware()
    );

    this.createFile(
      path.join(serverPath, 'src', 'middleware', 'errorHandler.js'),
      this.getErrorHandler()
    );

    // Create model files
    this.createFile(
      path.join(serverPath, 'src', 'models', 'User.js'),
      this.getUserModel()
    );

    this.createFile(
      path.join(serverPath, 'src', 'models', 'Post.js'),
      this.getPostModel()
    );

    // Create controller files
    this.createFile(
      path.join(serverPath, 'src', 'controllers', 'authController.js'),
      this.getAuthController()
    );

    this.createFile(
      path.join(serverPath, 'src', 'controllers', 'userController.js'),
      this.getUserController()
    );

    // Create route files
    this.createFile(
      path.join(serverPath, 'src', 'routes', 'authRoutes.js'),
      this.getAuthRoutes()
    );

    this.createFile(
      path.join(serverPath, 'src', 'routes', 'userRoutes.js'),
      this.getUserRoutes()
    );

    this.createFile(
      path.join(serverPath, 'src', 'routes', 'index.js'),
      this.getRoutesIndex()
    );

    // Create validation files
    this.createFile(
      path.join(serverPath, 'src', 'validations', 'authValidation.js'),
      this.getAuthValidation()
    );

    // Create utility files
    this.createFile(
      path.join(serverPath, 'src', 'utils', 'helpers.js'),
      this.getServerHelpers()
    );

    // Create package.json for server
    this.createFile(
      path.join(serverPath, 'package.json'),
      this.getServerPackageJSON()
    );

    // Create environment files
    this.createFile(
      path.join(serverPath, '.env'),
      this.getServerEnv()
    );

    this.createFile(
      path.join(serverPath, '.env.example'),
      this.getServerEnvExample()
    );
  }

  // Generate shared structure
  generateShared() {
    const sharedPath = path.join(this.projectPath, 'shared');

    const sharedDirs = [
      'constants',
      'utils',
      'types'
    ];

    sharedDirs.forEach(dir => this.createDir(path.join(sharedPath, dir)));

    this.createFile(
      path.join(sharedPath, 'constants', 'appConstants.js'),
      this.getAppConstants()
    );

    if (this.options.useTypeScript) {
      this.createFile(
        path.join(sharedPath, 'types', 'index.ts'),
        this.getTypeScriptTypes()
      );
    }
  }

  // Generate root files
  generateRootFiles() {
    this.createFile(
      path.join(this.projectPath, 'README.md'),
      this.getReadmeContent()
    );

    this.createFile(
      path.join(this.projectPath, '.gitignore'),
      this.getGitignore()
    );

    this.createFile(
      path.join(this.projectPath, 'package.json'),
      this.getRootPackageJSON()
    );

    // Create Docker files if requested
    if (this.options.useDocker) {
      this.createFile(
        path.join(this.projectPath, 'docker-compose.yml'),
        this.getDockerCompose()
      );
    }
  }

  // ========== CLIENT FILE CONTENT GENERATORS ==========

  getIndexHTML() {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="MERN Stack Application" />
    <title>MERN App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`;
  }

  getRobotsTxt() {
    return `User-agent: *
Allow: /`;
  }

  getAppComponent() {
    const extension = this.options.useTypeScript ? 'tsx' : 'jsx';
    return `import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRouter from './router/AppRouter';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRouter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;`;
  }

  getIndexComponent() {
    const extension = this.options.useTypeScript ? 'tsx' : 'jsx';
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
  }

  getAppCSS() {
    return `.App {
  min-height: 100vh;
}`;
  }

  getButtonComponent() {
    const extension = this.options.useTypeScript ? 'tsx' : 'jsx';
    return `import React from 'react';
import './Button.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, loading = false, className = '' }) => {
  return (
    <button
      type={type}
      className={\`btn btn--\${variant} \${className} \${loading ? 'btn--loading' : ''}\`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;`;
  }

  getButtonCSS() {
    return `.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--primary {
  background-color: #3b82f6;
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background-color: #2563eb;
}`;
  }

  getHomePage() {
    const extension = this.options.useTypeScript ? 'tsx' : 'jsx';
    return `import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="home">
      <div className="container">
        <h1>Welcome to MERN App</h1>
        {isAuthenticated ? (
          <div>
            <p>Hello, {user?.name}! 👋</p>
            <p>You are successfully logged in.</p>
          </div>
        ) : (
          <div>
            <p>Please log in to access your dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;`;
  }

  getLoginPage() {
    const extension = this.options.useTypeScript ? 'tsx' : 'jsx';
    return `import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Welcome Back</h2>
          <p>Please sign in to your account</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn btn--primary">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          
          <p className="signup-link">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;`;
  }

  getRegisterPage() {
    const extension = this.options.useTypeScript ? 'tsx' : 'jsx';
    return `import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Create Account</h2>
          <p>Please sign up for a new account</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>
          
          <button type="submit" disabled={loading} className="btn btn--primary">
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
          
          <p className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;`;
  }

  getAPIService() {
    const jsExtension = this.options.useTypeScript ? 'ts' : 'js';
    return `const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData,
    });
  }

  async getProfile() {
    return this.request('/users/profile');
  }
}

export default new ApiService();`;
  }

  getAuthService() {
    const jsExtension = this.options.useTypeScript ? 'ts' : 'js';
    return `import apiService from './api';

export const authService = {
  login: (credentials) => apiService.login(credentials),
  register: (userData) => apiService.register(userData),
  getProfile: () => apiService.getProfile()
};

export default authService;`;
  }

  getClientHelpers() {
    const jsExtension = this.options.useTypeScript ? 'ts' : 'js';
    return `export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const validateEmail = (email) => {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};`;
  }

  getAuthContext() {
    const extension = this.options.useTypeScript ? 'tsx' : 'jsx';
    return `import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authService.getProfile();
        setUser(userData.data);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError('');
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      setError('');
      const response = await authService.register(userData);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError('');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;`;
  }

  getStoreConfig() {
    const jsExtension = this.options.useTypeScript ? 'ts' : 'js';
    return `import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`;
  }

  getAuthSlice() {
    const jsExtension = this.options.useTypeScript ? 'ts' : 'js';
    return `import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;`;
  }

  getAppRouter() {
    const extension = this.options.useTypeScript ? 'tsx' : 'jsx';
    return `import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;`;
  }

  getProtectedRoute() {
    const extension = this.options.useTypeScript ? 'tsx' : 'jsx';
    return `import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;`;
  }

  getGlobalCSS() {
    return `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-message {
  color: #e53e3e;
  background: #fed7d7;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}`;
  }

  getClientConfig() {
    const jsExtension = this.options.useTypeScript ? 'ts' : 'js';
    return `export const config = {
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  APP_NAME: process.env.REACT_APP_NAME || 'MERN App'
};

export default config;`;
  }

  getClientPackageJSON() {
    return JSON.stringify({
      name: "mern-client",
      version: "1.0.0",
      type: "module",
      scripts: {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
      },
      dependencies: {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.8.0",
        ...(this.options.useRedux ? {
          "redux": "^4.2.1",
          "react-redux": "^8.0.5",
          "@reduxjs/toolkit": "^1.9.2"
        } : {})
      },
      devDependencies: {
        "vite": "^4.4.0",
        "@vitejs/plugin-react": "^4.0.0",
        ...(this.options.useTypeScript ? {
          "typescript": "^5.0.0",
          "@types/react": "^18.2.0",
          "@types/react-dom": "^18.2.0"
        } : {})
      }
    }, null, 2);
  }

  getClientTSConfig() {
    return `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`;
  }

  // ========== SERVER FILE CONTENT GENERATORS ==========
getServerJS() {
  return `const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

console.log('🚀 Starting MERN Server...');
console.log('📝 Environment:', process.env.NODE_ENV || 'development');

// Connect to MongoDB
connectDB();

const server = app.listen(PORT, () => {
  console.log(\`✅ Server running on port \${PORT}\`);
  console.log('🌐 Client URL: http://localhost:3000');
  console.log('🔌 API URL: http://localhost:5000/api');
  console.log('💾 MongoDB URL: mongodb://localhost:27017/mernapp');
  console.log('📋 To view database in MongoDB Compass, use: mongodb://localhost:27017/mernapp');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = server;`;
}
  
  getAppJS() {
    return `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling
app.use(require('./middleware/errorHandler'));

module.exports = app;`;
  }

 getDatabaseConfig() {
  return `const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp';
    
    console.log('🔗 Connecting to MongoDB...');
    console.log('📋 Database URL:', MONGODB_URI);
    
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (conn.connection.readyState === 1) {
      console.log('✅ MongoDB connected successfully');
      console.log('📊 Database Name:', conn.connection.name);
      console.log('🏠 Host:', conn.connection.host);
      console.log('🔌 Port:', conn.connection.port);
      
      // Force database creation by creating a temporary collection
      const db = conn.connection.db;
      try {
        // Create a temporary collection to force database creation
        const tempCollection = db.collection('temp_init');
        await tempCollection.insertOne({ 
          initialized: true, 
          timestamp: new Date() 
        });
        await tempCollection.deleteOne({ initialized: true });
        console.log('💾 Database initialized successfully');
      } catch (error) {
        console.log('⚠️ Database initialization note:', error.message);
      }
    } else {
      console.log('❌ MongoDB connection failed');
    }
    
  } catch (error) {
    console.log('❌ MongoDB connection error:', error.message);
    console.log('💡 Make sure:');
    console.log('   - MongoDB is running on localhost:27017');
    console.log('   - MongoDB service is started: sudo systemctl start mongod');
    console.log('   - No other applications are using the same port');
    process.exit(1);
  }
};

// MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('🔴 Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🟡 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;`;
}
  getAuthMiddleware() {
    return `const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;`;
  }

  getErrorHandler() {
    return `const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose errors
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Resource not found' });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value' });
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  res.status(500).json({ message: 'Server Error' });
};

module.exports = errorHandler;`;
  }

  getUserModel() {
    return `const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);`;
  }

  getPostModel() {
    return `const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);`;
  }

  getAuthController() {
    return `const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};`;
  }

  getUserController() {
    return `exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
};`;
  }

  getAuthRoutes() {
    return `const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);

module.exports = router;`;
  }

  getUserRoutes() {
    return `const express = require('express');
const { getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:id', auth, getUser);

module.exports = router;`;
  }

  getRoutesIndex() {
    return `const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;`;
  }

  getAuthValidation() {
    return `const { body } = require('express-validator');

exports.validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required')
];`;
  }

  getServerHelpers() {
    return `exports.asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);`;
  }

  getServerPackageJSON() {
    return JSON.stringify({
      name: "mern-server",
      version: "1.0.0",
      type: "commonjs",
      scripts: {
        "dev": "nodemon src/server.js",
        "start": "node src/server.js"
      },
      dependencies: {
        "express": "^4.18.2",
        "mongoose": "^6.9.0",
        "bcryptjs": "^2.4.3",
        "jsonwebtoken": "^9.0.0",
        "cors": "^2.8.5",
        "helmet": "^6.0.1",
        "morgan": "^1.10.0",
        "dotenv": "^16.0.3"
      },
      devDependencies: {
        "nodemon": "^2.0.20"
      }
    }, null, 2);
  }

  getServerEnv() {
    return `NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mernapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production`;
  }

  getServerEnvExample() {
    return `NODE_ENV=development
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key`;
  }

  // ========== SHARED FILE CONTENT GENERATORS ==========

  getAppConstants() {
    return `module.exports = {
  ROLES: {
    USER: 'user',
    ADMIN: 'admin'
  },
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
  }
};`;
  }

  getTypeScriptTypes() {
    return `export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}`;
  }

  // ========== ROOT FILE CONTENT GENERATORS ==========

  getReadmeContent() {
    return `# ${this.projectName}

MERN Stack Application

## Setup

1. Install dependencies:
\`\`\`bash
npm run install:all
\`\`\`

2. Set up environment variables:
\`\`\`bash
cp server/.env.example server/.env
\`\`\`

3. Start MongoDB (choose one method):

**Method 1: Using system service**
\`\`\`bash
# Ubuntu/Debian
sudo systemctl start mongod

# macOS with Homebrew
brew services start mongodb/brew/mongodb-community

# Windows
net start MongoDB
\`\`\`

**Method 2: Using docker**
\`\`\`bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
\`\`\`

**Method 3: Manual start**
\`\`\`bash
sudo mongod --dbpath /var/lib/mongodb
\`\`\`

4. Run the application:
\`\`\`bash
npm run dev
\`\`\`

## Scripts

- \`npm run dev\` - Start both client and server
- \`npm run install:all\` - Install all dependencies
- \`npm run dev:client\` - Start only client
- \`npm run dev:server\` - Start only server`;
  }

  getGitignore() {
    return `node_modules/
.env
.env.local
.DS_Store
dist/
build/
logs/
*.log
uploads/`;
  }

  getRootPackageJSON() {
    return JSON.stringify({
      name: this.projectName,
      version: "1.0.0",
      description: "MERN Stack Application",
      scripts: {
        "dev:client": "cd client && npm run dev",
        "dev:server": "cd server && npm run dev",
        "build:client": "cd client && npm run build",
        "start:server": "cd server && npm start",
        "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
        "install:all": "npm install && cd client && npm install && cd ../server && npm install"
      },
      devDependencies: {
        "concurrently": "^7.6.0"
      }
    }, null, 2);
  }

  getDockerCompose() {
    return `version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_DATABASE=mernapp
    volumes:
      - mongodb_data:/data/db

  server:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongodb:27017/mernapp
      - JWT_SECRET=your-jwt-secret
    depends_on:
      - mongodb

  client:
    build: ./client
    ports:
      - "3000:3000"
    depends_on:
      - server

volumes:
  mongodb_data:`;
  }

  // Main generation method
  generate() {
    console.log(`Creating MERN project: ${this.projectName}`);

    // Create project root directory
    this.createDir(this.projectPath);

    // Generate all parts
    this.generateClient();
    this.generateServer();
    this.generateShared();
    this.generateRootFiles();

    console.log('Project structure generated successfully!');
    console.log(`\nNext steps:
  cd ${this.projectName}
  npm run install:all
  Start MongoDB
  cp server/.env.example server/.env
  npm run dev`);
  }
}

// CLI argument parsing
const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
  console.error('Please provide a project name');
  console.log('Usage: node create-mern-app.js <project-name> [options]');
  console.log('\nOptions:');
  console.log('  --typescript    Use TypeScript');
  console.log('  --redux         Include Redux Toolkit');
  console.log('  --socketio      Include Socket.IO');
  console.log('  --docker        Include Docker configuration');
  process.exit(1);
}

// Parse options
const options = {
  typescript: args.includes('--typescript'),
  redux: args.includes('--redux'),
  socketio: args.includes('--socketio'),
  docker: args.includes('--docker'),
};

// Create and run generator
try {
  const generator = new MernProjectGenerator(projectName, options);
  generator.generate();
} catch (error) {
  console.error('Error generating project:', error.message);
  process.exit(1);
}