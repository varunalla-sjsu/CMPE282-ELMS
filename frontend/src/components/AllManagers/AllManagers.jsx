import React, { useState } from "react";
import { createStyles, Card, Container, Text, Pagination, Table } from "@mantine/core";
import { useQuery } from "react-query";
import { getAllDepartments } from "./../../services/AdminService";
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
    const pageSize = 10;
    const { data } = useQuery(["getAllDepartments", activePage], () => getAllDepartments(activePage, pageSize), { keepPreviousData: true });


   /* const rows = elements.map((element) => (
          <td>{element.id}</td>
          <td>{element.first_name} {element.last_name}</td>
          <td>{element.title}</td>
          <td>{element.department}</td> 
          <td>{element.hire_date}</td>
        </tr>

      <td>{element.dept_manager[element.dept_manager.length - 1].title}</td>
      <td>{element.dept_emp[element.dept_emp.length - 1].departments.dept_name}</td>
      <td>{(new Date(element.hire_date)).toDateString()}</td>
      ));*/
      console.log(data);

  const rows = data.data.data.map((element) => (
    < tr key={element.dept_no} >
      <td>{element.dept_no}</td>
      <td>{element.dept_name}</td>
      <td>
      {element.dept_manager[element.dept_manager.length-1].employees.first_name} {element.dept_manager[element.dept_manager.length-1].employees.last_name}
      </td>
      <td>
      {element.dept_manager[element.dept_manager.length-1].employees.first_name} {element.dept_manager[element.dept_manager.length-1].employees.last_name}
      </td>
      <td>
      {(new Date(element.dept_manager[element.dept_manager.length-1].from_date)).toDateString()}
        </td>
    </ tr>
  ));
    return (
        <Container>

            <Card withBorder radius="md" className={classes.card} >
                <Table>
                <thead>
                        <tr>
                        <th>ID</th>
                        <th>Department Name</th>
                        <th>
                          Manager
                        </th>
                        <th>Title</th>
              
                        <th>Start Date</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Card>
            <Pagination size="sm" page={activePage} onChange={setPage} total={Math.floor(data.data.total / 20)} withEdges />
        </Container>
      );
}
