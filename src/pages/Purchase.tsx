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
  const [paymentMethod, setPaymentMethod] = useState<'sbp' | 'card'>('sbp');
  const [paymentCreated, setPaymentCreated] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (paymentCreated && paymentData?.payment_id && !paymentSuccess) {
      interval = setInterval(async () => {
        setCheckingPayment(true);
        try {
          const response = await fetch(
            `https://functions.poehali.dev/bdbe30de-bedb-4b17-96ef-c3889e0db22e?payment_id=${paymentData.payment_id}`
          );
          const data = await response.json();
          
          if (data.paid) {
            setPaymentSuccess(true);
            clearInterval(interval);
          }
        } catch (err) {
          console.error('Error checking payment:', err);
        } finally {
          setCheckingPayment(false);
        }
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paymentCreated, paymentData, paymentSuccess]);

  const handleCreatePayment = async () => {
    if (!user) return;
    
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/16052182-b511-4900-8e8a-f274b784be5f', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: user.id, 
          planName, 
          amount: parseFloat(price),
          paymentMethod
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка при создании платежа');
        setLoading(false);
        return;
      }

      if (data.success) {
        if (paymentMethod === 'card' && data.redirect_url) {
          window.location.href = data.redirect_url;
        } else if (paymentMethod === 'sbp') {
          setPaymentData(data);
          setPaymentCreated(true);
        }
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

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center px-6">
        <Card className="max-w-md w-full border-2 border-green-500/20 animate-scale-in">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={40} className="text-white" />
            </div>
            <CardTitle className="text-2xl">Оплата успешна!</CardTitle>
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

  if (paymentCreated && paymentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center px-6">
        <Card className="max-w-md w-full border-2 border-primary/20 animate-scale-in">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="QrCode" size={40} className="text-white" />
            </div>
            <CardTitle className="text-2xl">Оплата через СБП</CardTitle>
            <CardDescription>
              Отсканируйте QR-код в приложении банка
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white p-6 rounded-lg flex items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentData.qr_code_url)}`}
                alt="QR код для оплаты"
                className="w-48 h-48"
              />
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-foreground/60">Тариф:</span>
                <span className="font-medium">{planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Сумма:</span>
                <span className="font-medium text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {price} ₽
                </span>
              </div>
              {checkingPayment && (
                <div className="flex items-center gap-2 text-sm text-foreground/60 pt-2 border-t border-border">
                  <Icon name="RefreshCw" size={14} className="animate-spin" />
                  <span>Проверяем статус оплаты...</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                <div className="flex gap-3">
                  <Icon name="Info" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-foreground/80">
                    <p className="font-medium mb-1">Как оплатить:</p>
                    <ol className="list-decimal list-inside space-y-1 text-foreground/60">
                      <li>Откройте приложение вашего банка</li>
                      <li>Найдите раздел "Оплата по QR"</li>
                      <li>Отсканируйте код выше</li>
                      <li>Подтвердите оплату</li>
                    </ol>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(paymentData.payment_url, '_blank')}
              >
                <Icon name="ExternalLink" size={18} className="mr-2" />
                Открыть ссылку для оплаты
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setPaymentCreated(false);
                  setPaymentData(null);
                }}
              >
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Отменить
              </Button>
            </div>
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
              Оплата через Систему быстрых платежей
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
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('sbp')}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          paymentMethod === 'sbp' 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border bg-muted hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === 'sbp' ? 'border-primary' : 'border-border'
                          }`}>
                            {paymentMethod === 'sbp' && (
                              <div className="w-3 h-3 rounded-full bg-primary" />
                            )}
                          </div>
                          <Icon name="Smartphone" size={20} className="text-primary" />
                          <div className="text-left flex-1">
                            <p className="font-medium">Система быстрых платежей</p>
                            <p className="text-xs text-foreground/60">
                              Оплата через QR-код в приложении банка
                            </p>
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          paymentMethod === 'card' 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border bg-muted hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === 'card' ? 'border-primary' : 'border-border'
                          }`}>
                            {paymentMethod === 'card' && (
                              <div className="w-3 h-3 rounded-full bg-primary" />
                            )}
                          </div>
                          <Icon name="CreditCard" size={20} className="text-primary" />
                          <div className="text-left flex-1">
                            <p className="font-medium">Банковская карта</p>
                            <p className="text-xs text-foreground/60">
                              Visa, MasterCard, МИР
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <Button
                  className="w-full bg-gradient-to-r from-primary to-secondary py-6 text-lg"
                  onClick={handleCreatePayment}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Icon name="RefreshCw" size={20} className="mr-2 animate-spin" />
                      Создаём платёж...
                    </>
                  ) : (
                    <>
                      <Icon name={paymentMethod === 'sbp' ? 'QrCode' : 'CreditCard'} size={20} className="mr-2" />
                      Оплатить {price} ₽
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-center text-foreground/40">
                Нажимая кнопку, вы соглашаетесь с условиями использования
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Purchase;