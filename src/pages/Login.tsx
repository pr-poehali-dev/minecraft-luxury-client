import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
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
                    className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
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
                    className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Повторите пароль
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
                      className="w-full bg-muted border border-border rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border bg-muted"
                    />
                    <span className="text-foreground/60">Запомнить меня</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Забыли пароль?
                  </a>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary text-background hover:bg-primary/90 py-6 text-lg"
              >
                {isLogin ? "Войти" : "Зарегистрироваться"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-foreground/60 text-sm">
                {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                {" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? "Зарегистрироваться" : "Войти"}
                </button>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-center text-foreground/40 text-sm mb-4">
                Или продолжите с
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-border hover:bg-muted"
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon name="Github" size={18} className="mr-2" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  className="border-border hover:bg-muted"
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon name="Chrome" size={18} className="mr-2" />
                  Google
                </Button>
              </div>
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
