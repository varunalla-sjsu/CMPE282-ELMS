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
    // const elements = [
    //     { id: 1, first_name: 'Jane', last_name: 'Doe', title: 'Accountant', hire_date: '5-12-2022' },
    //     { id: 2, first_name: 'Jane', last_name: 'Doe', title: 'Accountant', hire_date: '5-12-2022' },
    //     { id: 3, first_name: 'Jane', last_name: 'Doe', title: 'Accountant', hire_date: '5-12-2022' },
    //     { id: 4, first_name: 'Jane', last_name: 'Doe', title: 'Accountant', hire_date: '5-12-2022' },
    //   ];

    const rows = data.data.map((element) => (
        <tr key={element.emp_no}>
          <td>{element.emp_no}</td>
          <td>{element.employees.first_name} {element.employees.last_name}</td>
          <td>{element.title}</td>
          <td>{element.employees.hire_date}</td>
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
            <Pagination size="sm" page={activePage} onChange={setPage} total={Math.ceil(data.data.total / 20)} withEdges />
        </Container>
      );
}
