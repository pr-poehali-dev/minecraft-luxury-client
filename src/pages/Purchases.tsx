import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from 'react-router-dom';

interface Payment {
  id: number;
  plan_name: string;
  amount: number;
  payment_id: string;
  status: string;
  created_at: string;
  paid_at: string | null;
}

interface Purchase {
  id: number;
  plan_name: string;
  price: number;
  payment_method: string;
  created_at: string;
}

const Purchases = () => {
  const [user, setUser] = useState<any>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchPurchases();
    }
  }, [user]);

  const fetchPurchases = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://functions.poehali.dev/c27293e7-4a96-411d-8105-2204fdaea32a?user_id=${user.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка загрузки данных');
        return;
      }

      setPayments(data.payments || []);
      setPurchases(data.purchases || []);
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'paid':
        return { text: 'Оплачено', color: 'text-green-600', icon: 'CheckCircle', bg: 'bg-green-500/10' };
      case 'pending':
        return { text: 'Ожидание', color: 'text-yellow-600', icon: 'Clock', bg: 'bg-yellow-500/10' };
      case 'canceled':
        return { text: 'Отменено', color: 'text-red-600', icon: 'XCircle', bg: 'bg-red-500/10' };
      default:
        return { text: status, color: 'text-foreground/60', icon: 'HelpCircle', bg: 'bg-muted' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!user) {
    return null;
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
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              История покупок
            </h1>
            <p className="text-foreground/60">
              Все ваши заказы и платежи
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6 animate-scale-in">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Icon name="RefreshCw" size={40} className="animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-6">
              {payments.length === 0 && purchases.length === 0 ? (
                <Card className="border-2 border-border/50 animate-scale-in">
                  <CardContent className="py-20 text-center">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="ShoppingBag" size={40} className="text-foreground/40" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Пока нет покупок</h3>
                    <p className="text-foreground/60 mb-6">
                      Выберите подходящий тариф и начните использовать клиент
                    </p>
                    <Button
                      className="bg-gradient-to-r from-primary to-secondary"
                      onClick={() => navigate('/#pricing')}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Посмотреть тарифы
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {payments.length > 0 && (
                    <div className="space-y-4 animate-fade-in">
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Icon name="CreditCard" size={24} className="text-primary" />
                        Платежи СБП
                      </h2>
                      {payments.map((payment) => {
                        const statusInfo = getStatusInfo(payment.status);
                        return (
                          <Card key={payment.id} className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <div>
                                  <CardTitle className="text-xl">{payment.plan_name}</CardTitle>
                                  <CardDescription>
                                    {formatDate(payment.created_at)}
                                  </CardDescription>
                                </div>
                                <div className={`${statusInfo.bg} px-3 py-1 rounded-full flex items-center gap-2`}>
                                  <Icon name={statusInfo.icon as any} size={16} className={statusInfo.color} />
                                  <span className={`text-sm font-medium ${statusInfo.color}`}>
                                    {statusInfo.text}
                                  </span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <p className="text-sm text-foreground/60">Сумма</p>
                                  <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    {payment.amount} ₽
                                  </p>
                                </div>
                                {payment.paid_at && (
                                  <div className="text-right space-y-1">
                                    <p className="text-sm text-foreground/60">Оплачено</p>
                                    <p className="text-sm font-medium">
                                      {formatDate(payment.paid_at)}
                                    </p>
                                  </div>
                                )}
                              </div>
                              {payment.payment_id && (
                                <div className="mt-4 pt-4 border-t border-border">
                                  <p className="text-xs text-foreground/40">
                                    ID платежа: {payment.payment_id}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}

                  {purchases.length > 0 && (
                    <div className="space-y-4 animate-fade-in">
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Icon name="ShoppingBag" size={24} className="text-primary" />
                        Прочие покупки
                      </h2>
                      {purchases.map((purchase) => (
                        <Card key={purchase.id} className="border-2 border-border/50">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-xl">{purchase.plan_name}</CardTitle>
                                <CardDescription>
                                  {formatDate(purchase.created_at)}
                                </CardDescription>
                              </div>
                              <div className="bg-green-500/10 px-3 py-1 rounded-full flex items-center gap-2">
                                <Icon name="CheckCircle" size={16} className="text-green-600" />
                                <span className="text-sm font-medium text-green-600">
                                  Завершено
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <p className="text-sm text-foreground/60">Сумма</p>
                                <p className="text-2xl font-bold">
                                  {purchase.price} ₽
                                </p>
                              </div>
                              <div className="text-right space-y-1">
                                <p className="text-sm text-foreground/60">Способ оплаты</p>
                                <p className="text-sm font-medium capitalize">
                                  {purchase.payment_method === 'card' ? 'Карта' : purchase.payment_method}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Purchases;
