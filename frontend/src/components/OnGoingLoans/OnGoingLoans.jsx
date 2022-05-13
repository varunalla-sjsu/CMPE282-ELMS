import React, { useState } from "react";
import { createStyles, Card, Container, Text, Table, Button, Pagination } from "@mantine/core";
import { useQuery } from "react-query";
import { getEmployeeActiveLoan } from "../../services/EmployeeService";

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

export function OnGoingLoans() {
    const { classes } = useStyles();
    const [activePage, setPage] = useState(1);
    const { data } = useQuery(["getEmployeeActiveLoan",activePage],() => getEmployeeActiveLoan(activePage), { keepPreviousData : true });

    const rows = data.data.data.map((element) => (
        <tr key={element.loanid}>
          <td>{element.loanid}</td>
          <td>{element.loan_amount}</td>
          <td>{element.total_installments - element.paid_installments}</td>
          <td>{element.total_installments/12}</td>
          <td className={classes.green}>{element.status}</td>
        </tr>
      ));

    return (
        <Container>

            <Card withBorder radius="md" className={classes.card} >
                <Text pb="40"><b>Loan Details</b></Text>
                <Table>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Months Remaining</th>
                        <th>Tenure</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Card>
            <Pagination size="lg" page={activePage} onChange={setPage} total={Math.ceil(data.data.total / 20)} withEdges />
        </Container>
      );
}
