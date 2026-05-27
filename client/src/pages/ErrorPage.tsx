import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { Button } from '../components/ui/Button';

const ErrorPage = () => {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? error.statusText
    : error instanceof Error
      ? error.message
      : 'Unexpected application error';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-page px-4 text-center">
      <h1 className="text-3xl font-bold text-ink-primary">Something went wrong</h1>
      <p className="max-w-md text-ink-secondary">{message}</p>
      <Button onClick={() => window.location.reload()} aria-label="Reload page">
        Reload
      </Button>
    </div>
  );
};

export default ErrorPage;
