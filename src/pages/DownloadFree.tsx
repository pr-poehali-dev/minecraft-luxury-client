import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import MinecraftLoader from "@/components/MinecraftLoader";

const DownloadFree = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  const handleDownload = () => {
    setShowLoader(true);
    setTimeout(() => {
      window.open('https://example.com/luxury-client-free.zip', '_blank');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Box" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold luxury-gradient-text">
                LUXURY CLIENT
              </span>
            </a>
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Бесплатная версия
            </h1>
            <p className="text-foreground/60 text-lg">
              Попробуйте базовые функции клиента
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/20 animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Download" size={24} className="text-primary" />
                  Скачать клиент
                </CardTitle>
                <CardDescription>Бесплатная версия с ограничениями</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Базовые функции клиента</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Стабильная работа</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="X" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Без обновлений</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="X" size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">Без технической поддержки</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="AlertCircle" size={16} className="text-yellow-500" />
                    <span className="text-yellow-600">Реклама в клиенте</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                  onClick={handleDownload}
                >
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать бесплатно
                </Button>

                <p className="text-xs text-center text-foreground/40">
                  Скачивая клиент, вы соглашаетесь с условиями использования
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary animate-scale-in [animation-delay:100ms]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Zap" size={24} className="text-primary" />
                  Премиум версия
                </CardTitle>
                <CardDescription>Получите полный доступ ко всем функциям</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Все функции без ограничений</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Регулярные обновления</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Приоритетная поддержка</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Эксклюзивные профили</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                    <span>Без рекламы</span>
                  </div>
                </div>

                <div className="text-center py-2">
                  <p className="text-sm text-foreground/60 mb-2">От 250₽/месяц</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Выгода до 85%
                  </p>
                </div>

                <Button 
                  className="w-full bg-primary text-background hover:bg-primary/90"
                  onClick={() => navigate('/#download')}
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Смотреть тарифы
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/50 backdrop-blur-sm border-border animate-fade-in [animation-delay:200ms]">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Icon name="Info" size={24} className="text-primary mt-1" />
                <div className="space-y-2">
                  <h3 className="font-bold text-lg">Системные требования</h3>
                  <ul className="space-y-1 text-sm text-foreground/70">
                    <li>• Minecraft версии 1.8 - 1.20</li>
                    <li>• Java 8 или выше</li>
                    <li>• Windows 7/10/11, macOS или Linux</li>
                    <li>• Минимум 2GB оперативной памяти</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showLoader && (
        <MinecraftLoader onComplete={() => setShowLoader(false)} />
      )}
    </div>
  );
};

export default DownloadFree;