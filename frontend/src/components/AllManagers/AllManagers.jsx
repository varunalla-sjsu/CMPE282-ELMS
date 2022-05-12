import React, { useState } from "react";
import { createStyles, Card, Container, Text, Pagination, Table } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    card: {
      position: 'relative',
      cursor: 'pointer',
      marginBottom: 20,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },
  
    title: {
      display: 'block',
      marginTop: theme.spacing.md,
      fontSize: 22,
      fontWeight: 600,
      marginBottom: theme.spacing.xs / 2,
    },

    subtitle: {
        display: 'block',
        fontSize: 18,
        marginBottom: 20,
      },

    para:{
        fontSize: 14,
        paddingBottom: 12,
    }
  }));

export function AllManagers() {
    const { classes } = useStyles();
    const [activePage, setPage] = useState(1);
    const elements = [
        { id: 1, first_name: 'Jane', last_name: 'Doe', title: 'Accountant', hire_date: '5-12-2022', department: 'Finance' },
        { id: 2, first_name: 'Jane', last_name: 'Doe', title: 'Accountant', hire_date: '5-12-2022', department: 'Finance' },
        { id: 3, first_name: 'Jane', last_name: 'Doe', title: 'Accountant', hire_date: '5-12-2022', department: 'Finance' },
        { id: 4, first_name: 'Jane', last_name: 'Doe', title: 'Accountant', hire_date: '5-12-2022', department: 'Finance' },
      ];

    const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.id}</td>
          <td>{element.first_name} {element.last_name}</td>
          <td>{element.title}</td>
          <td>{element.department}</td> 
          <td>{element.hire_date}</td>
        </tr>
      ));

    return (
        <Container>

            <Card withBorder radius="md" className={classes.card} >
                <Table>
                <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Start Date</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Card>
            <Pagination size="sm" page={activePage} onChange={setPage} total={3} withEdges />
        </Container>
      );
}
