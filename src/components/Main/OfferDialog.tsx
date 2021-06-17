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
  // onClose: () => void;
  onAccept: () => void;
  onRefuse: () => void;
}

const OfferDialog = ({
  isOpen,
  // title,
  // description,
  content,
  // onClose,
  onAccept,
  onRefuse,
}: OfferDialogProps) => {
  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const { title, description } = content;

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onRefuse}
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
            <Button colorScheme="green" onClick={onAccept} mr={3}>
              Accept
            </Button>
            <Button colorScheme="red" ref={cancelRef} onClick={onRefuse}>
              Refuse
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default OfferDialog;
