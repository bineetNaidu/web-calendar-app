import { FC } from 'react';
import {
  Center,
  HStack,
  Text,
  Divider,
  Box,
  Icon,
  Heading,
} from '@chakra-ui/react';
import { TaskType } from '../lib/types';
import { FaCheckSquare } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Timestamp } from 'firebase/firestore';

interface TaskCardProps {
  task: TaskType;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  console.log(task);
  return (
    <Center py={2}>
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
        <Divider orientation="vertical" bgColor="gray.800" minH="12" w="0.5" />
        <Box>
          <Heading as="h4" size="md">
            {task.title}
          </Heading>
          <Text color="gray.400">{task.description}</Text>
        </Box>
      </HStack>
    </Center>
  );
};

export { TaskCard };
