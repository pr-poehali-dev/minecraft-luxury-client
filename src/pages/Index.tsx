import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Box" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                LUXURY CLIENT
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
                Главная
              </a>
              <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
                Возможности
              </a>
              <a href="#download" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
                Тарифы
              </a>
              {user ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors font-medium"
                  >
                    <Icon name="User" size={18} />
                    {user.username}
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-medium"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <a href="/login" className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Войти
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  LUXURY
                </span>
                <br />
                <span className="text-foreground">CLIENT</span>
              </h1>
              <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
                Премиальный клиент для Minecraft с полной настройкой интерфейса и внешнего вида под ваш стиль игры
              </p>
              <div className="flex flex-col gap-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 animate-glow w-fit"
                  asChild
                >
                  <a href="#download">
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Купить
                  </a>
                </Button>
                
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-primary/50 hover:bg-primary/10"
                    asChild
                  >
                    <a href="https://t.me/luxuryclientt" target="_blank" rel="noopener noreferrer">
                      <Icon name="Send" size={20} />
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-primary/50 hover:bg-primary/10"
                    asChild
                  >
                    <a href="https://discord.gg/FYDBBApF" target="_blank" rel="noopener noreferrer">
                      <svg width="20" height="20" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
                      </svg>
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-primary/50 hover:bg-primary/10"
                    asChild
                  >
                    <a href="https://www.youtube.com/channel/UCihOOmlMqx7lMcehrRseWLg" target="_blank" rel="noopener noreferrer">
                      <Icon name="Youtube" size={20} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border">
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/files/5ecc3083-4d4d-4a93-96a6-bfe4519057dd.png" 
                    alt="Luxury Client Logo"
                    className="w-full h-full object-contain p-8"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Возможности
              </span>
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Настройте игру под себя с помощью расширенных функций кастомизации
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 animate-scale-in">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6">
                  <Icon name="Palette" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Настройка интерфейса</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Полная кастомизация UI: меняйте цвета, размеры, положение элементов. Создайте уникальный стиль.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 animate-scale-in [animation-delay:100ms]">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6">
                  <Icon name="Sparkles" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Внешний вид</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Настраивайте визуальные эффекты, анимации и детали отображения для максимального комфорта.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 animate-scale-in [animation-delay:200ms]">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-6">
                  <Icon name="Settings" size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Гибкая конфигурация</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Сохраняйте настройки в профилях и переключайтесь между ними одним кликом.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="download" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Выберите тариф
              </span>
            </h2>
            <p className="text-foreground/70 text-lg">
              Получите доступ к Luxury Client — выберите подходящий вариант
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 animate-scale-in">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Icon name="Download" size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Бесплатно</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">0₽</span>
                  </div>
                  <p className="text-foreground/60 text-sm">С ограничениями</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Базовые функции</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="X" size={18} className="text-muted-foreground mt-0.5" />
                    <span className="text-sm text-muted-foreground">Без обновлений</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="X" size={18} className="text-muted-foreground mt-0.5" />
                    <span className="text-sm text-muted-foreground">Без поддержки</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="X" size={18} className="text-muted-foreground mt-0.5" />
                    <span className="text-sm text-muted-foreground">Реклама в клиенте</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-muted text-foreground hover:bg-muted/80"
                  onClick={() => navigate('/download-free')}
                >
                  Скачать
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 animate-scale-in [animation-delay:50ms]">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Icon name="Clock" size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">30 дней</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">250₽</span>
                  </div>
                  <p className="text-foreground/60 text-sm">Месячная подписка</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Все возможности</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Обновления</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Поддержка</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Без рекламы</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary text-background hover:bg-primary/90"
                  onClick={() => {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                      navigate('/purchase?plan=30 дней&price=250');
                    } else {
                      navigate('/login');
                    }
                  }}
                >
                  Купить
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary relative overflow-hidden animate-scale-in [animation-delay:100ms]">
              <div className="absolute top-4 right-4 bg-primary text-background px-3 py-1 rounded-full text-xs font-bold">
                ПОПУЛЯРНО
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Icon name="Calendar" size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">365 дней</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">450₽</span>
                    <div className="text-sm text-foreground/60 mt-1">
                      <span className="line-through">3000₽</span> -85%
                    </div>
                  </div>
                  <p className="text-foreground/60 text-sm">Годовая подписка</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Все возможности</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Обновления</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Приоритет поддержка</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Эксклюзив профили</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary text-background hover:bg-primary/90 animate-glow"
                  onClick={() => {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                      navigate('/purchase?plan=365 дней&price=450');
                    } else {
                      navigate('/login');
                    }
                  }}
                >
                  Купить
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 animate-scale-in [animation-delay:150ms]">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Icon name="Infinity" size={48} className="text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Навсегда</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">599₽</span>
                  </div>
                  <p className="text-foreground/60 text-sm">Разовый платёж</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Все возможности</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Обновления навсегда</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">VIP поддержка</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={18} className="text-primary mt-0.5" />
                    <span className="text-sm">Ранний доступ</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary text-background hover:bg-primary/90"
                  onClick={() => {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                      navigate('/purchase?plan=Навсегда&price=599');
                    } else {
                      navigate('/login');
                    }
                  }}
                >
                  Купить
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Box" size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                LUXURY CLIENT
              </span>
            </div>
            <p className="text-foreground/50 text-sm">
              © 2024 Luxury Client. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;