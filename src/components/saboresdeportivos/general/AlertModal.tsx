"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Loader2 } from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  text: string;
  textLoading: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  title,
  text,
  textLoading,
  description,
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal title={title} description={description} isOpen={isOpen} onClose={onClose}>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? textLoading : text}
        </Button>
      </div>
    </Modal>
  );
};
