import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
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
                Скачать
              </a>
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
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 animate-glow"
                >
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-primary/50 hover:bg-primary/10 text-lg px-8"
                >
                  Узнать больше
                </Button>
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
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Скачать
              </span>
            </h2>
            <p className="text-foreground/70 text-lg">
              Установите Luxury Client и начните персонализировать свой игровой опыт
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border animate-scale-in">
            <CardContent className="p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="Package" size={24} className="text-primary" />
                    <span className="text-sm font-semibold text-foreground/60">ВЕРСИЯ 1.0</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Luxury Client v1.0</h3>
                  <p className="text-foreground/70 mb-6">
                    Совместим с Minecraft 1.20.x
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={20} className="text-secondary mt-1" />
                      <div>
                        <span className="font-semibold">Настройка интерфейса:</span>
                        <p className="text-sm text-foreground/60">Полный контроль над UI элементами</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={20} className="text-secondary mt-1" />
                      <div>
                        <span className="font-semibold">Визуальные эффекты:</span>
                        <p className="text-sm text-foreground/60">Расширенная кастомизация графики</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle" size={20} className="text-secondary mt-1" />
                      <div>
                        <span className="font-semibold">Профили настроек:</span>
                        <p className="text-sm text-foreground/60">Сохранение и быстрое переключение</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-12 h-14 animate-glow"
                  >
                    <Icon name="Download" size={24} className="mr-2" />
                    Скачать
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-foreground/50 justify-center">
                    <Icon name="Shield" size={16} />
                    <span>Безопасная загрузка</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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