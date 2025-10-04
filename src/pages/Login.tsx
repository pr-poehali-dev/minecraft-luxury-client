import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/f6598e55-c953-4948-8fda-08c3684c816e', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка входа');
        setLoading(false);
        return;
      }

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/1d1511d6-493b-4fac-a37e-ba09d4c9e665', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка регистрации');
        setLoading(false);
        return;
      }

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <a href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <img 
                src="https://cdn.poehali.dev/files/5ecc3083-4d4d-4a93-96a6-bfe4519057dd.png" 
                alt="Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-3xl font-bold text-foreground">
              LUXURY CLIENT
            </span>
          </a>
          <p className="text-foreground/60">
            {isLogin ? "Войдите в ваш аккаунт" : "Создайте новый аккаунт"}
          </p>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-border animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {isLogin ? "Вход" : "Регистрация"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Никнейм
                  </label>
                  <div className="relative">
                    <Icon 
                      name="User" 
                      size={18} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                    />
                    <input
                      type="text"
                      placeholder="Введите никнейм"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email
                </label>
                <div className="relative">
                  <Icon 
                    name="Mail" 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Пароль
                </label>
                <div className="relative">
                  <Icon 
                    name="Lock" 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                  />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    minLength={6}
                    disabled={loading}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary text-background hover:bg-primary/90 py-6 text-lg"
                disabled={loading}
              >
                {loading ? 'Загрузка...' : (isLogin ? "Войти" : "Зарегистрироваться")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-foreground/60 text-sm">
                {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                {" "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="text-primary hover:underline font-medium"
                  disabled={loading}
                >
                  {isLogin ? "Зарегистрироваться" : "Войти"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-foreground/40">
          <p>
            Входя в систему, вы соглашаетесь с{" "}
            <a href="#" className="text-primary hover:underline">
              условиями использования
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;