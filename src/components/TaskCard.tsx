import { FC, useRef } from 'react';
import {
  Center,
  HStack,
  Text,
  Divider,
  Box,
  IconButton,
  ButtonGroup,
  Icon,
  Heading,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { TaskType } from '../lib/types';
import { FaCheckSquare, FaTrash, FaEdit } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AlertDialogCard } from './AlertDialogCard';
interface TaskCardProps {
  task: TaskType;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDeleteTask = async () => {
    const taskRef = doc(db, 'tasks', task.id);
    await deleteDoc(taskRef);
  };

  return (
    <>
      <Center py={2} role="group" position="relative">
        <ButtonGroup
          size="sm"
          variant="ghost"
          position="absolute"
          top="12px"
          right="0px"
          d="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          opacity={0}
          _groupHover={{
            transform: 'translate(35px, 2px)',
            transition: 'all 0.5s ease-in-out',
            opacity: 1,
          }}
        >
          <VStack>
            <IconButton
              aria-label="ctx to delete"
              icon={<FaTrash />}
              onClick={onOpen}
            />
            <IconButton aria-label="ctx to edit" icon={<FaEdit />} />
          </VStack>
        </ButtonGroup>
        <HStack
          borderWidth="1px"
          borderRadius="lg"
          bg="gray.900"
          minW="md"
          boxShadow={'2xl'}
          padding={4}
        >
          <Center flexDirection="column">
            <Text>
              {new Timestamp(
                (task.created_at as any).seconds,
                (task.created_at as any).nanoseconds
              )
                .toDate()
                .toDateString()}
            </Text>
            <Box>
              {task.done ? (
                <Icon as={FaCheckSquare} color="green.500" />
              ) : (
                <Icon as={ImCross} color="red.500" />
              )}
            </Box>
          </Center>
          <Divider
            orientation="vertical"
            bgColor="gray.800"
            minH="12"
            w="0.5"
          />
          <Box>
            <Heading as="h4" size="md">
              {task.title}
            </Heading>
            <Text color="gray.400">{task.description}</Text>
          </Box>
        </HStack>
      </Center>
      <AlertDialogCard
        isOpen={isOpen}
        message="Are you sure you want to delete this task?"
        title="Delete Task"
        onClose={onClose}
        cancelRef={cancelRef}
        onAccept={handleDeleteTask}
      />
    </>
  );
};

export { TaskCard };
