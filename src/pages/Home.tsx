import Calendar from 'react-calendar';
import {
  Container,
  Box,
  Text,
  Divider,
  Input,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import { FaPlus } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';

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
          <Text as="span" textDecoration="Highlight" fontStyle="italic">
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
          initialValues={{ task: '' }}
          onSubmit={(values, { setSubmitting, setValues }) => {
            console.log('values', values);
            setSubmitting(false);
            setValues({ task: '' });
          }}
        >
          {({ isSubmitting, getFieldProps }) => (
            <Form>
              <HStack>
                <Input placeholder="Add Task" {...getFieldProps('task')} />
                <IconButton
                  isLoading={isSubmitting}
                  aria-label="add task btn"
                  type="submit"
                  colorScheme="green"
                  icon={<FaPlus />}
                />
              </HStack>
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
