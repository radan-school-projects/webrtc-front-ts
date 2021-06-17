import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

export interface DialogContent {
  title: string;
  description: string;
}

interface OfferDialogProps {
  isOpen: boolean;
  // title: string;
  // description: string;
  content: DialogContent;
  onClose: () => void;
}

const OfferDialog = ({
  isOpen,
  // title,
  // description,
  content,
  onClose,
}: OfferDialogProps) => {
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const { title, description } = content;

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {/* Delete Customer */}
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {/* Are you sure? You can't undo this action afterwards. */}
            {description}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onClose} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default OfferDialog;
