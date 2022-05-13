import React, { useState } from "react";
import { createStyles, Card, Container, Text, Pagination, Table } from "@mantine/core";
import { useQuery } from "react-query";
import { getAllEmployees } from "./../../services/AdminService";
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

  para: {
    fontSize: 14,
    paddingBottom: 12,
  }
  
}));

export function AllEmp() {
  const { classes } = useStyles();
  const [activePage, setPage] = useState(1);
  const pageSize = 10;
  const { data } = useQuery(["getAllEmployees", activePage], () => getAllEmployees(activePage, pageSize), { keepPreviousData: true });

  const rows = data.data.data.map((element) => (
    < tr key={element.emp_no} >
      <td>{element.emp_no}</td>
      <td>{element.first_name} {element.last_name}</td>
      <td>{element.titles[element.titles.length - 1].title}</td>
      <td>{element.dept_emp[element.dept_emp.length - 1].departments.dept_name}</td>
      <td>{(new Date(element.hire_date)).toDateString()}</td>
    </ tr>
  ));

  return (
    <Container>

      <Card withBorder radius="md" className={classes.card} >
        <div class="typewriter">
          <h1>Total Employees: {data.data.total} </h1>
        </div>

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
      <Pagination size="sm" page={activePage} onChange={setPage} total={Math.floor(data.data.total / 20)} withEdges />
    </Container>
  );
}
