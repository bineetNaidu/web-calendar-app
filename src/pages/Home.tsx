import Calendar from 'react-calendar';
import {
  Container,
  Box,
  Text,
  Divider,
  Input,
  IconButton,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import { FaPlus } from 'react-icons/fa';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import 'react-calendar/dist/Calendar.css';
import { TaskType } from '../lib/types';

const Home: FC = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Container
      maxW="container.xl"
      d="flex"
      justifyContent="space-between"
      alignItems="center"
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
      <Box flex="4"></Box>
      <Box flex="3"></Box>
    </Container>
  );
};

export default Home;
