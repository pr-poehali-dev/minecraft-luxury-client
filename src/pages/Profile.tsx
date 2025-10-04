import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setUsername(userData.username);
      setEmail(userData.email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/69844200-720c-455b-a8f1-144f8d100741', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, username, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка обновления профиля');
        setLoading(false);
        return;
      }

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setSuccess('Профиль успешно обновлён!');
        setIsEditing(false);
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/771a8405-83fc-4ff7-acca-ff945b2e0d78', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка смены пароля');
        setLoading(false);
        return;
      }

      if (data.success) {
        setSuccess('Пароль успешно изменён!');
        setIsChangingPassword(false);
        setCurrentPassword('');
        setNewPassword('');
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
              На главную
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Мой профиль
            </h1>
            <p className="text-foreground/60">
              Ваши данные аккаунта
            </p>
          </div>

          <Card className="border-2 border-primary/20 animate-scale-in">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={40} className="text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{user.username}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-600 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              {!isEditing && !isChangingPassword && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input
                      id="username"
                      type="text"
                      value={user.username}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userId">ID пользователя</Label>
                    <Input
                      id="userId"
                      type="text"
                      value={user.id}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              )}

              {isEditing && (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-username">Имя пользователя</Label>
                    <Input
                      id="edit-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-primary to-secondary"
                      disabled={loading}
                    >
                      {loading ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setUsername(user.username);
                        setEmail(user.email);
                        setError('');
                      }}
                      disabled={loading}
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              )}

              {isChangingPassword && (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Текущий пароль</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      disabled={loading}
                      placeholder="Введите текущий пароль"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Новый пароль</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      disabled={loading}
                      placeholder="Минимум 6 символов"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-primary to-secondary"
                      disabled={loading}
                    >
                      {loading ? 'Изменение...' : 'Изменить пароль'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setCurrentPassword('');
                        setNewPassword('');
                        setError('');
                      }}
                      disabled={loading}
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              )}

              {!isEditing && !isChangingPassword && (
                <div className="pt-6 border-t border-border space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsEditing(true);
                      setError('');
                      setSuccess('');
                    }}
                  >
                    <Icon name="Edit" size={18} className="mr-2" />
                    Редактировать профиль
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsChangingPassword(true);
                      setError('');
                      setSuccess('');
                    }}
                  >
                    <Icon name="Lock" size={18} className="mr-2" />
                    Изменить пароль
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/')}
                  >
                    <Icon name="Home" size={18} className="mr-2" />
                    Вернуться на главную
                  </Button>
                  
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" size={18} className="mr-2" />
                    Выйти из аккаунта
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;