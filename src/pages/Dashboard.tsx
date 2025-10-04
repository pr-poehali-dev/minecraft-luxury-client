import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <img 
                  src="https://cdn.poehali.dev/files/5ecc3083-4d4d-4a93-96a6-bfe4519057dd.png" 
                  alt="Logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-foreground">
                LUXURY CLIENT
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-foreground/60 hover:text-foreground transition-colors">
                На главную
              </a>
              <div className="flex items-center gap-3 bg-muted px-4 py-2 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={18} className="text-background" />
                </div>
                <span className="font-medium">Игрок</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                    <Icon name="User" size={48} className="text-background" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Игрок #1337</h3>
                  <p className="text-foreground/60 text-sm">Premium аккаунт</p>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "overview"
                        ? "bg-primary text-background"
                        : "hover:bg-muted text-foreground/80"
                    }`}
                  >
                    <Icon name="LayoutDashboard" size={20} />
                    <span className="font-medium">Обзор</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("downloads")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "downloads"
                        ? "bg-primary text-background"
                        : "hover:bg-muted text-foreground/80"
                    }`}
                  >
                    <Icon name="Download" size={20} />
                    <span className="font-medium">Загрузки</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "settings"
                        ? "bg-primary text-background"
                        : "hover:bg-muted text-foreground/80"
                    }`}
                  >
                    <Icon name="Settings" size={20} />
                    <span className="font-medium">Настройки</span>
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground/80 transition-colors">
                    <Icon name="LogOut" size={20} />
                    <span className="font-medium">Выход</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Добро пожаловать!</h1>
                  <p className="text-foreground/60">Управляйте вашим Luxury Client</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Icon name="Package" size={32} className="text-primary" />
                        <span className="text-3xl font-bold">1.0</span>
                      </div>
                      <h3 className="font-semibold mb-1">Версия клиента</h3>
                      <p className="text-sm text-foreground/60">Актуальная</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Icon name="Clock" size={32} className="text-primary" />
                        <span className="text-3xl font-bold">48ч</span>
                      </div>
                      <h3 className="font-semibold mb-1">Время игры</h3>
                      <p className="text-sm text-foreground/60">За последнюю неделю</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Icon name="Sparkles" size={32} className="text-primary" />
                        <span className="text-3xl font-bold">12</span>
                      </div>
                      <h3 className="font-semibold mb-1">Профили</h3>
                      <p className="text-sm text-foreground/60">Сохранённые настройки</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Bell" size={24} />
                      Последние обновления
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4 pb-4 border-b border-border">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">Версия 1.0 доступна</h4>
                          <p className="text-sm text-foreground/60 mb-2">
                            Обновлённый интерфейс и новые возможности кастомизации
                          </p>
                          <span className="text-xs text-foreground/40">2 дня назад</span>
                        </div>
                      </div>

                      <div className="flex gap-4 pb-4 border-b border-border">
                        <div className="w-2 h-2 bg-foreground/40 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">Новый профиль создан</h4>
                          <p className="text-sm text-foreground/60 mb-2">
                            Профиль "PvP Setup" успешно сохранён
                          </p>
                          <span className="text-xs text-foreground/40">5 дней назад</span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-2 h-2 bg-foreground/40 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">Добро пожаловать</h4>
                          <p className="text-sm text-foreground/60 mb-2">
                            Спасибо за использование Luxury Client
                          </p>
                          <span className="text-xs text-foreground/40">7 дней назад</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "downloads" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Загрузки</h1>
                  <p className="text-foreground/60">Скачайте нужную версию клиента</p>
                </div>

                <Card className="bg-card border-border">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                          <Icon name="Package" size={32} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">Luxury Client v1.0</h3>
                          <p className="text-foreground/60">Для Minecraft 1.20.x</p>
                        </div>
                      </div>
                      <Button size="lg" className="bg-primary text-background hover:bg-primary/90" asChild>
                        <a href="https://luxury.client" target="_blank" rel="noopener noreferrer">
                          <Icon name="Download" size={20} className="mr-2" />
                          Скачать
                        </a>
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                      <div className="flex items-start gap-3">
                        <Icon name="CheckCircle" size={20} className="text-primary mt-1" />
                        <div>
                          <span className="font-semibold">Размер:</span>
                          <p className="text-sm text-foreground/60">125 MB</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="CheckCircle" size={20} className="text-primary mt-1" />
                        <div>
                          <span className="font-semibold">Дата релиза:</span>
                          <p className="text-sm text-foreground/60">01.10.2024</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="CheckCircle" size={20} className="text-primary mt-1" />
                        <div>
                          <span className="font-semibold">Платформа:</span>
                          <p className="text-sm text-foreground/60">Windows, macOS, Linux</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Icon name="CheckCircle" size={20} className="text-primary mt-1" />
                        <div>
                          <span className="font-semibold">Лицензия:</span>
                          <p className="text-sm text-foreground/60">Premium</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Настройки</h1>
                  <p className="text-foreground/60">Управление аккаунтом и профилями</p>
                </div>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Профиль</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Никнейм</label>
                      <input
                        type="text"
                        defaultValue="Игрок #1337"
                        className="w-full bg-muted border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <input
                        type="email"
                        defaultValue="player@luxuryclient.com"
                        className="w-full bg-muted border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Button className="bg-primary text-background hover:bg-primary/90">
                      Сохранить изменения
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Сохранённые профили настроек</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {["Default", "PvP Setup", "Builder Mode"].map((profile) => (
                        <div
                          key={profile}
                          className="flex items-center justify-between p-4 bg-muted rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Icon name="Folder" size={20} className="text-primary" />
                            <span className="font-medium">{profile}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Загрузить
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;