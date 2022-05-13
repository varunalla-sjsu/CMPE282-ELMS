import React, { useState } from "react";
import { createStyles, Card, Container, Text, Collapse,Pagination, Table, Button } from "@mantine/core";

import { useQuery } from "react-query";
import { getAllLoans } from "./../../services/AdminService";
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

    green: {
        color: '#40d92a',
    }
  }));

export function AllLoans() {
    const { classes } = useStyles();
    const [opened, setOpen] = useState(false);
    const [activePage, setPage] = useState(1);

    const pageSize = 10;
    const { data } = useQuery(["getAllLoans", activePage], () => getAllLoans(activePage, pageSize), { keepPreviousData: true });
  

    const elements = [
        { id: 6, amount: 12.011, months: 3, tenure: 12, symbol: 'Active', name: 'Carbon' },
        { id: 7, amount: 14.007, months: 3, tenure: 12, symbol: 'Active', name: 'Nitrogen' },
        { id: 39, amount: 88.906, months: 3, tenure: 12, symbol: 'Active', name: 'Yttrium' },
        { id: 56, amount: 137.33, months: 3, tenure: 12, symbol: 'Active', name: 'Barium' },
        { id: 58, amount: 140.12, months: 3, tenure: 12, symbol: 'Active', name: 'Cerium' },
      ];
/*
    const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.id}</td>
          <td>{element.amount}</td>
          <td>{element.months}</td>
          <td>{element.tenure}</td>
          <td className={classes.green}>{element.symbol}</td>
          <td><Button>Close</Button></td>
        </tr>
      ));*/
      console.log(data);
      function preClose(){

      }
      const rows = data.data.data.map((element) => (
        < tr key={element.loanid} >
            <td>{element.loanid}</td>
            <td>{element.emp_no}</td>
          <td>{element.employees.first_name} {element.employees.last_name}</td>
          <td>{element.department.dept_name}</td>
          <td>{ element.loan_amount }</td>
          <td>{ element.total_installments - element.paid_installments }</td>
          <td>{ element.total_installments }</td>
          <td>{element.status}</td>
          <td>{element.status==="APPROVED"&&<Button onClick={preClose(element.loanid)}>Pre Close</Button>}</td>
        </ tr>
      ));
    return (
        <Container>

            <Card withBorder radius="md" className={classes.card} >
                <Text pb="40"><b>Loan Details</b></Text>
                <Table>
                    <thead>
                        <tr>
                        <th>Loan ID</th>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Department Name</th>
                        <th>Amount</th>
                        <th>Months Remaining</th>
                        <th>Tenure</th>
                        <th>Status</th>
                        <th>PreClose Loan</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Card>

            <Pagination size="sm" page={activePage} onChange={setPage} total={Math.floor(data.data.total / 20)} withEdges />
        </Container>
      );
}
