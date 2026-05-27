import { useMemo } from 'react';

import { BaseModal } from './ui/BaseModal';
import { Button } from './ui/Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  isOpen,
  title,
  description,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const titleId = useMemo(() => `confirm-modal-title-${Math.random().toString(36).slice(2, 9)}`, []);
  const descriptionId = useMemo(() => `confirm-modal-desc-${Math.random().toString(36).slice(2, 9)}`, []);

  return (
    <BaseModal isOpen={isOpen} onClose={onCancel} labelledBy={titleId} describedBy={descriptionId} maxWidth="sm">
      <h3 id={titleId} className="text-lg font-semibold text-ink-primary">
        {title}
      </h3>
      <p id={descriptionId} className="mt-2 text-sm text-ink-secondary">
        {description}
      </p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel} aria-label="Cancel delete">
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isLoading} aria-label="Confirm delete">
          Delete
        </Button>
      </div>
    </BaseModal>
  );
};
