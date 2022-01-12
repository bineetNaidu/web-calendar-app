import Calendar from 'react-calendar';
import {
  Container,
  Box,
  Text,
  Divider,
  Input,
  IconButton,
  Textarea,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { FaPlus } from 'react-icons/fa';
import {
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import 'react-calendar/dist/Calendar.css';
import { TaskType } from '../lib/types';
import { TaskCard } from '../components/TaskCard';
import { useUserStore } from '../lib/user.store';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/product');
    }
  }, [navigate, user.isAuthenticated]);

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => {
        const data = doc.data() as TaskType;
        data.id = doc.id;
        return data;
      });
      setTasks(tasks);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Container
      maxW="container.xl"
      d="flex"
      justifyContent="space-between"
      py="4"
      minH="full"
      h="full"
    >
      <Box flex="3" d="flex" flexDirection="column" justifyContent="center">
        <Calendar className="bg-transparent" onChange={setDate} view="month" />
        <Divider my="6" />
        <Box mb="4">
          <Text
            as="span"
            textDecoration="Highlight"
            fontStyle="italic"
            fontWeight="extrabold"
          >
            -&gt;{' '}
            {date.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <Text as="span" mx="2" color="gray.500">
            |
          </Text>
          <Text
            as="span"
            color="gray.300"
            textTransform="uppercase"
            fontWeight="bold"
          >
            ADD TASKS
          </Text>
        </Box>
        <Formik
          initialValues={{ title: '', description: '' }}
          onSubmit={async (values, { setSubmitting, setValues }) => {
            const data: Omit<TaskType, 'id'> = {
              created_at: Timestamp.now() as any,
              done: false,
              created_user_id: '',
              description: values.description,
              title: values.title,
            };

            await addDoc(collection(db, 'tasks'), data);

            setSubmitting(false);
            setValues({ title: '', description: '' });
          }}
        >
          {({ isSubmitting, getFieldProps }) => (
            <Form>
              <VStack>
                <Input placeholder="Title" {...getFieldProps('title')} />
                <Textarea
                  placeholder="Description"
                  {...getFieldProps('description')}
                />
                <IconButton
                  isLoading={isSubmitting}
                  aria-label="add task btn"
                  w="full"
                  type="submit"
                  colorScheme="green"
                  icon={<FaPlus />}
                />
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
      <Box flex="4" d="flex" flexDirection="column">
        <Heading as="h3">Tasks</Heading>
        <VStack>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </VStack>
      </Box>
      <Box flex="3"></Box>
    </Container>
  );
};

export default Home;
