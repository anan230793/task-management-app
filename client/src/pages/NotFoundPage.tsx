import { Link } from 'react-router-dom';

import { Button } from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-page px-4 text-center">
      <h1 className="text-5xl font-bold text-ink-primary">404</h1>
      <p className="text-ink-secondary">The page you are looking for does not exist.</p>
      <Link to="/dashboard">
        <Button aria-label="Back to dashboard">Back to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
