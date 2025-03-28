import { ApiKeyDetailsRow } from "./DetailsRow";
import { ApiKeyKeyForm } from "./KeyForm";
import { ApiKeyValidationSchema } from "./validations";
import { ApiKey } from "@3rdweb-sdk/react/hooks/useApi";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { Button, CodeBlock, Heading, Text } from "tw-components";

interface ApiKeysCreateModalProps {
  apiKey?: ApiKey | null;
  open: boolean;
  form?: UseFormReturn<ApiKeyValidationSchema, any>;
  loading?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export const ApiKeysCreateModal: React.FC<ApiKeysCreateModalProps> = ({
  open,
  apiKey,
  form,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const { secret, key } = apiKey || {};

  const renderKeys = () => {
    return (
      <>
        <VStack gap={4}>
          {secret && (
            <>
              {key && (
                <ApiKeyDetailsRow
                  title="Client ID"
                  content={<CodeBlock codeValue={key} code={key} />}
                  description="Identifies your application. It should generally be restricted to specific domains (web) and/or bundle-ids (native)."
                />
              )}

              <Divider />

              <ApiKeyDetailsRow
                title="Secret Key"
                content={<CodeBlock codeValue={secret} code={secret} />}
                description="Identifies and authenticates your application from the backend."
              />

              <Alert status="warning" variant="left-accent">
                <AlertIcon />
                <Flex direction="column" gap={2}>
                  <Heading as={AlertTitle} size="label.md">
                    Secret Key Handling
                  </Heading>
                  <Text as={AlertDescription} size="body.md">
                    Store the Secret Key in a secure place and{" "}
                    <strong>never share it</strong>. You will not be able to
                    retrieve it again. If you lose it, you will need to
                    regenerate a new Secret Key.
                  </Text>
                </Flex>
              </Alert>
            </>
          )}
        </VStack>
      </>
    );
  };

  const renderCreateForm = () => {
    if (form && onSubmit) {
      return <ApiKeyKeyForm form={form} onSubmit={onSubmit} tabbed={false} />;
    }
    return null;
  };

  return (
    <Modal isOpen={open} onClose={secret ? () => undefined : onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {secret ? "Your New Api Key" : "Create API Key"}
        </ModalHeader>
        {!secret && <ModalCloseButton />}
        <ModalBody>{apiKey ? renderKeys() : renderCreateForm()}</ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={apiKey ? onClose : onSubmit}
            isLoading={loading}
            disabled={loading}
          >
            {secret ? "I have stored the Secret Key securely" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
