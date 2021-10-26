import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="100%" h="auto" maxW="900px" maxH="600px">
        <ModalBody bg="pGray.800" p="0">
          <Image src={imgUrl} roundedTopLeft="6px" roundedTopRight="6px" />
        </ModalBody>

        <ModalFooter
          bg="pGray.800"
          roundedBottomLeft="6px"
          roundedBottomRight="6px"
        >
          <Link href={imgUrl} target="_blank">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
