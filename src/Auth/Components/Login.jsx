import React, { useState, useEffect } from "react";
// Since external imports like 'react-feather' often fail in isolated environments, 
// we will replace them with inline SVG icons to ensure the component is runnable.

// We must mock or comment out unresolvable project-specific imports:
// import { api } from "../../AxiosMeta/ApiAxios"; 
// import { authCheck } from "../Components/ProtectedCheck";

// Mock implementation for external dependencies
// In a real environment, you must provide the actual implementation for api and authCheck.
const api = {
    post: async (url, data) => {
        // Mock API response for successful login
        if (data.email === 'test@example.com' && data.password === 'YOUR_PASSWORD') {
            return { data: { token: 'mock-token', user: { id: 1, email: data.email } } };
        }
        // Mock API response for failed login
        if (data.email === 'Email not found') {
             throw new Error('Email not found');
        }
        if (data.password !== 'YOUR_PASSWORD') {
            throw new Error('Invalid credentials');
        }
        throw new Error('Something went wrong');
    }
};
const authCheck = () => ({ auth: true }); // Mock protected check

// Replaced react-feather imports with inline SVG components
const Mail = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const Lock = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const Eye = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const EyeOff = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.46m-1.72-1.72A10 10 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>;
const ArrowRight = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const Key = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7 7l-7 7-4-4 7-7 7-7 4 4z"></path><path d="M16 16l-3-3"></path><path d="M15 11l-4 4"></path></svg>;
const X = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const CheckCircle = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14 9 11"></polyline></svg>;

// Mock Link component for isolated running
const Link = (props) => <a href={props.to} {...props} onClick={(e) => e.preventDefault()}>{props.children}</a>;


const LoginForm = ({ error, setError, message, setMessage }) => {
  const { auth } = authCheck();
  const [loading, setLoading] = useState(false);
  
  // ===================================================================
  // CHANGE 1: Set a default valid test email for quicker login/testing.
  // IMPORTANT: Change 'test@example.com' to your actual registered email
  // to test the successful login mock.
  const [email, setEmail] = useState('test@example.com'); 
  
  // CHANGE 2: Set a default test password.
  // IMPORTANT: Replace "YOUR_PASSWORD" with the password you used.
  const [password, setPassword] = useState('YOUR_PASSWORD'); 
  // ===================================================================

  const [showPassword, setShowPassword] = useState(false);
  const [remembered, setremembered] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);

  useEffect(() => {
    // Check for saved email
    const savedEmail = localStorage.getItem('rememberedEmail');
    // If a saved email exists, use it unless the default is a mock email
    if (savedEmail && email === 'test@example.com') { 
      setEmail(savedEmail);
      setremembered(true);
    }
  }, [email]); 

  const validateEmail = (email) => {
    // This is the function that requires an '@' symbol
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Only check validity if email is not empty
    setIsEmailValid(validateEmail(newEmail) || newEmail === ''); 
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // NOTE: We are using the mocked 'api.post' for resolution.
      await api.post('/api/auth/login', { email, password,remembered });
      setMessage('Login successful! Redirecting...');
      
      if (remembered) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // In a real application, a router would handle navigation. 
      // We are now redirecting to the specific user finances page.
      setTimeout(() => {
        // --- MODIFICATION: Redirect to user finances page ---
        window.location.href = '/user-finances'; 
        // ---------------------------------------------------
        console.log('Login successful. Attempting to redirect to /user-finances');
        setMessage('Login Successful!');
        setLoading(false);
      }, 1500);

    } catch (err) {
      setLoginAttempts(prev => prev + 1);
      // Ensure we access the message property correctly from the mocked error or native error
      const errorMessage = err.message || 'Something went wrong during login.';
      setError(errorMessage);
    } finally {
      // If redirection is successful, loading is handled in setTimeout. 
      // If login failed, reset loading here.
      if (message !== 'Login successful! Redirecting...') {
        setLoading(false);
      }
    }
  };


  const isValidEmail = validateEmail(email);
  const showEmailError = error ||  !isValidEmail && email !== '';

  const handleOAuthGoogleLogin = () => {
    // NOTE: import.meta.env is not available in this isolated environment. 
    // We will mock the base URL using a known value for demonstration.
    const VITE_API_URL = 'https://finencegetapi.onrender.com';
    window.location.href = `${VITE_API_URL}/auth/google`;
    console.log('Attempting Google OAuth redirection to:', `${VITE_API_URL}/auth/google`);
  };


  return (
    // Tailwind classes are assumed to be available
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                Sign in to your account
            </h2>
             
            {/* Error/Message Display (Always visible) */}
            <div className="space-y-2">
                {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex items-center">
                    <X size={16} className="text-red-500 mr-2 h-4 w-4" />
                    <p className="text-sm font-medium text-red-600">Error: {error}</p>
                    </div>
                </div>
                )}
                {message && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                    <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2 h-4 w-4" />
                    <p className="text-sm font-medium text-green-600">{message}</p>
                    </div>
                </div>
                )}
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                    <label 
                        htmlFor="email" 
                        className={`block text-sm font-medium mb-1 ${
                            error === 'Email not found' ? 'text-red-500' : 'text-gray-700'
                        }`}
                    >
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className={`h-5 w-5 ${
                                error === 'Email not found' ? 'text-red-400' : 'text-gray-400'
                            }`} />
                        </div>
                        <input
                            autoComplete="email"
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={handleEmailChange}
                            className={`
                                pl-10 w-full px-3 py-2 border-2 rounded-lg
                                transition-colors duration-200
                                focus:outline-none focus:ring-2
                                ${!isEmailValid && email
                                    ? 'border-red-300 text-red-500 focus:border-red-500 focus:ring-red-200'
                                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                }
                            `}
                            placeholder="you@example.com"
                        />
                    </div>
                    {!isEmailValid && email && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                            <X size={14} className="mr-1 h-3 w-3" />
                            Please enter a valid email address
                        </p>
                    )}
                </div>

                {/* Password Input */}
                <div>
                    <label 
                        htmlFor="password" 
                        className={`block text-sm font-medium mb-1 ${
                            error === 'Invalid credentials' ? 'text-red-500' : 'text-gray-700'
                        }`}
                    >
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className={`h-5 w-5 ${
                                error === 'Invalid credentials' ? 'text-red-400' : 'text-gray-400'
                            }`} />
                        </div>
                        <input
                            autoComplete="current-password"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`
                                pl-10 pr-10 w-full px-3 py-2 border-2 rounded-lg
                                transition-colors duration-200
                                focus:outline-none focus:ring-2
                                ${error === 'Invalid credentials'
                                    ? 'border-red-300 text-red-500 focus:border-red-500 focus:ring-red-200'
                                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                }
                            `}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            checked={remembered}
                            onChange={(e) => setremembered(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>
                    <Link 
                        to="/login/resetpassword"
                        className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || !isEmailValid || !email || !password}
                    className={`
                        w-full py-3 px-4 rounded-lg font-medium
                        transition-all duration-200 transform
                        flex items-center justify-center gap-2
                        ${loading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : (!isEmailValid || !email || !password)
                                ? 'bg-blue-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]'
                        }
                        text-white shadow-lg hover:shadow-xl
                    `}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Signing in...
                        </>
                    ) : (
                        <>
                            Sign In
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
                
                <div className="pt-4 border-t border-gray-200">
                    <button type="button" onClick={handleOAuthGoogleLogin} className={`
                        w-full py-3 px-4 rounded-lg font-medium border border-gray-300 text-gray-700
                        transition-all duration-200 transform
                        flex items-center justify-center gap-2
                        ${loading 
                            ? 'bg-gray-50 cursor-not-allowed' :
                            'bg-white hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98]'
                        }
                    `}>
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-gray-700">Sign In with Google</h1>
                    </button>
                </div>

                {/* Create Account Link */}
                <div className="text-center">
                    <span className="text-gray-600 text-sm">Don't have an account? </span>
                    <Link 
                        to="/register"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                    >
                        Create one now
                    </Link>
                </div>

                {/* Max Attempts Warning */}
                {loginAttempts >= 3 && (
                    <div className="text-amber-600 text-sm flex items-center gap-2 bg-amber-50 p-3 rounded-lg">
                        <Key className="h-4 w-4" />
                        <span>Multiple failed attempts detected. Consider resetting your password.</span>
                    </div>
                )}
            </form>
        </div>
    </div>
  );
};

export default LoginForm;
