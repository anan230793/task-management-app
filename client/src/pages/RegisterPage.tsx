import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import { useRegister } from '../hooks/useAuth';
import { registerSchema, RegisterInput } from '../types/auth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';

const RegisterPage = () => {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-ink-primary">Create account</h1>
      <p className="mb-6 text-sm text-ink-secondary">Start managing your tasks today.</p>

      <form className="space-y-4" onSubmit={handleSubmit((values) => registerMutation.mutate(values))}>
        <Input
          label="Name"
          placeholder="Your full name"
          aria-label="Name"
          {...register('name')}
          error={errors.name?.message}
        />

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
          placeholder="Create a password"
          autoComplete="new-password"
          error={errors.password}
          hint="Must contain uppercase, lowercase, number, and special character (e.g. Test@123)"
          registration={register('password')}
        />

        <Button type="submit" className="w-full" isLoading={registerMutation.isPending} aria-label="Register">
          Register
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-ink-secondary">
        Already have an account?{' '}
        <Link className="font-medium text-brand hover:underline" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
