import { PropsWithChildren, useMemo } from 'react';

import { BaseModal } from './ui/BaseModal';

interface TaskModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

export const TaskModal = ({ isOpen, title, onClose, children }: PropsWithChildren<TaskModalProps>) => {
  const titleId = useMemo(() => `task-modal-title-${Math.random().toString(36).slice(2, 9)}`, []);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} labelledBy={titleId}>
      <h2 id={titleId} className="mb-4 text-xl font-semibold text-ink-primary">
        {title}
      </h2>
      {children}
    </BaseModal>
  );
};
