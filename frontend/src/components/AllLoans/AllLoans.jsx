import React, { useState } from "react";
import { createStyles, Card, Container, Text, Collapse, Pagination, Table, Button, Skeleton } from "@mantine/core";
import { useModals } from '@mantine/modals';
import { useMutation, useQuery } from "react-query";
import { getAllLoans, preCloseLoan } from "./../../services/AdminService";
import { showNotification } from "@mantine/notifications";
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
  const { data, isLoading, isFetching } = useQuery(["getAllLoans", activePage], () => getAllLoans(activePage, pageSize), { keepPreviousData: true });

  const approve = useMutation(preCloseLoan);
  function preClose(id) {
    approve.mutateAsync(id).then((res) => {
      showNotification({
        title: `Loan Preclosed`,
        message: `You have preclosed a loan with id: ${id}`,
        color: "green"
      })
    }).catch((err) => {
      showNotification({
        title: `Some problem!`,
        message: `There was a problem preclosing the loan.`,
        color: "red"
      })
    })
  }


  const rows = data.data.data.map((element) => (
    < tr key={element.loanid} >
      <td>{element.loanid}</td>
      <td>{element.emp_no}</td>
      <td>{element.employees.first_name} {element.employees.last_name}</td>
      <td>{element.department.dept_name}</td>
      <td>{element.loan_amount}</td>
      <td>{element.total_installments - element.paid_installments}</td>
      <td>{element.total_installments}</td>
      <td>{element.status}</td>
      <td>{element.status === "APPROVED" && <Button onClick={()=>preClose(element.loanid)}>Pre Close</Button>}</td>
    </ tr>
  ));

  if (isLoading || isFetching) {

    return (
      <Skeleton>
        <Container>

          <Card withBorder radius="md" className={classes.card} >
            <Text pb="40"><b></b></Text>
            <Table>

            </Table>
          </Card>
        </Container>
      </Skeleton>
    )
  }
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
