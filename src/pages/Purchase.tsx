import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useNavigate, useSearchParams } from 'react-router-dom';

const Purchase = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const planName = searchParams.get('plan') || 'Standard';
  const price = searchParams.get('price') || '499';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handlePurchase = async () => {
    if (!user) return;
    
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/576c52f6-2e1e-4c50-b343-f704206c7b78', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          planName, 
          price: parseFloat(price),
          paymentMethod: 'card'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка при создании заказа');
        setLoading(false);
        return;
      }

      if (data.success) {
        setSuccess(true);
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center px-6">
        <Card className="max-w-md w-full border-2 border-green-500/20 animate-scale-in">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={40} className="text-white" />
            </div>
            <CardTitle className="text-2xl">Покупка успешна!</CardTitle>
            <CardDescription>
              Вы успешно приобрели тариф {planName}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-foreground/60">Тариф:</span>
                <span className="font-medium">{planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Сумма:</span>
                <span className="font-medium">{price} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Статус:</span>
                <span className="font-medium text-green-600">Оплачено</span>
              </div>
            </div>
            
            <Button
              className="w-full bg-gradient-to-r from-primary to-secondary"
              onClick={() => navigate('/')}
            >
              <Icon name="Home" size={18} className="mr-2" />
              Вернуться на главную
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Оформление покупки
            </h1>
            <p className="text-foreground/60">
              Завершите покупку клиента
            </p>
          </div>

          <Card className="border-2 border-primary/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Детали заказа</CardTitle>
              <CardDescription>Проверьте информацию перед оплатой</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg border-2 border-primary/20">
                  <h3 className="text-2xl font-bold mb-2">{planName}</h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {price} ₽
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Покупатель</Label>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-foreground/60">{user.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Способ оплаты</Label>
                    <div className="bg-muted p-3 rounded-lg flex items-center gap-3">
                      <Icon name="CreditCard" size={20} className="text-primary" />
                      <span>Банковская карта</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <Button
                  className="w-full bg-gradient-to-r from-primary to-secondary py-6 text-lg"
                  onClick={handlePurchase}
                  disabled={loading}
                >
                  {loading ? (
                    'Обработка...'
                  ) : (
                    <>
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      Оплатить {price} ₽
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-foreground/40">
                Нажимая кнопку "Оплатить", вы соглашаетесь с условиями использования
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
