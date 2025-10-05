import { useState } from "react";
import MinecraftLoader from "@/components/MinecraftLoader";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const LoaderDemo = () => {
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Box" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
        <div className="container mx-auto max-w-2xl text-center space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Демо загрузчика
            </h1>
            <p className="text-foreground/60 text-lg mb-8">
              Посмотрите, как выглядит процесс загрузки ресурсов клиента
            </p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Что загружается:</h3>
              <div className="grid gap-3 text-left">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Icon name="Image" size={20} className="text-primary" />
                  <span>Текстуры блоков и предметов</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Icon name="Box" size={20} className="text-primary" />
                  <span>3D модели объектов</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Icon name="Volume2" size={20} className="text-primary" />
                  <span>Звуковые эффекты</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Icon name="Settings" size={20} className="text-primary" />
                  <span>Инициализация системы</span>
                </div>
              </div>
            </div>

            <Button 
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary"
              onClick={() => setShowLoader(true)}
            >
              <Icon name="Play" size={20} className="mr-2" />
              Запустить загрузчик
            </Button>
          </div>

          <div className="text-sm text-foreground/60">
            Загрузчик автоматически отслеживает прогресс загрузки всех ресурсов клиента
          </div>
        </div>
      </div>

      {showLoader && (
        <MinecraftLoader onComplete={() => setShowLoader(false)} />
      )}
    </div>
  );
};

export default LoaderDemo;
