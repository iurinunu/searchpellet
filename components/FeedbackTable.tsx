import React from 'react';
import { Box, Code, Switch, IconButton } from '@chakra-ui/react';

import { Table, Tr, Th, Td } from './Table';

const FeedbackTable = (props: any) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th width="50px">{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {props.feedback.map((feedback: any) => (
          <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>{feedback.route || '/'}</Code>
            </Td>
            <Td>
              <Switch
                color="green"
                defaultIsChecked={feedback.status === 'active'}
              />
            </Td>
            <Td>
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;