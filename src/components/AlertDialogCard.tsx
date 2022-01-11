import { FC, MutableRefObject } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';

interface AlertDialogCardProps {
  isOpen: boolean;
  onClose: () => void | Promise<void>;
  title: string;
  message: string;
  cancelRef?: React.RefObject<HTMLButtonElement> | MutableRefObject<any>;
  onAccept: () => void | Promise<void>;
}

const AlertDialogCard: FC<AlertDialogCardProps> = ({
  message,
  title,
  onClose,
  cancelRef,
  isOpen,
  onAccept,
}) => {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{message}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme="red" ml={3} onClick={onAccept}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { AlertDialogCard };
