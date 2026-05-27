import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import { useLogin } from '../hooks/useAuth';
import { loginSchema, LoginInput } from '../types/auth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';

const LoginPage = () => {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-ink-primary">Welcome back</h1>
      <p className="mb-6 text-sm text-ink-secondary">Sign in to manage your tasks.</p>

      <form className="space-y-4" onSubmit={handleSubmit((values) => loginMutation.mutate(values))}>
        <Input
          label="Email"
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
          aria-label="Email"
          {...register('email')}
          error={errors.email?.message}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password}
          registration={register('password')}
        />

        <Button type="submit" className="w-full" isLoading={loginMutation.isPending} aria-label="Login">
          Login
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-ink-secondary">
        New here?{' '}
        <Link className="font-medium text-brand hover:underline" to="/register">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
