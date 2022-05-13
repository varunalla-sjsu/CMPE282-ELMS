import React, { useState } from "react";
import { createStyles, Card, Container, Text, Pagination, Table } from "@mantine/core";
import {getDeptEmployees} from "../../services/deptService"
import { useQuery } from "react-query";

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

export function DeptEmployees() {
    const { classes } = useStyles();
    const [activePage, setPage] = useState(1);
    const { data } = useQuery(["getDeptEmployees", activePage],() => getDeptEmployees(activePage), { keepPreviousData : true });
    
    const rows = data.data.map((element) => (
        <tr key={element.emp_no}>
          <td>{element.emp_no}</td>
          <td>{element.employees.first_name} {element.employees.last_name}</td>
          <td>{element.title}</td>
          <td>{element.employees.hire_date.split('T')[0]}</td>
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
                        <th>Start Date</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Card>
            <Pagination size="lg" page={activePage} onChange={setPage} siblings={3}  total={Math.ceil(data.total/ 20)} withEdges />
        </Container>
      );
}
