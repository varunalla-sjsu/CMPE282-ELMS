import React, { useState } from "react";
import { createStyles, Card, Container, Text,Pagination, Collapse, Table, Button, Skeleton } from "@mantine/core";
import {getLoanRequestsByDept,approveLoan, rejectLoan} from "../../services/ManagerService" 
import { useMutation, useQuery } from "react-query";
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

export function LoanApproval() {
    const { classes } = useStyles();
    const [activePage,setActivePage] = useState(1);

    const { data, isLoading, isFetching } = useQuery(["getLoanRequestsByDept", activePage],() => getLoanRequestsByDept(activePage), { keepPreviousData : true , suspense: false });
    const approve = useMutation(approveLoan);
    const reject = useMutation(rejectLoan);

    function approveL(id){
      approve.mutateAsync(id).then((res) => {
        showNotification({
          title: `Loan Approve`,
          message: `You have approve a loan with id: ${id}`,
          color: "green"
        })
      }).catch((err) => {
        showNotification({
          title: `Some problem!`,
          message: `There was a problem approving a loan.`,
          color: "red"
        })
      })
    }
    
    function rejectL(id){
      reject.mutateAsync(id).then((res) => {
        showNotification({
          title: `Loan Rejected`,
          message: `You have rejected a loan with id: ${id}`,
          color: "red"
        })
      }).catch((err) => {
        showNotification({
          title: `Some problem!`,
          message: `There was a problem rejecting a loan.`,
          color: "red"
        })
      })
    }

    if(isLoading || isFetching){
      
      return(
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
    
    const rows = data.data.map((element) => (
        <tr key={element.loanid}>
          <td>{element.loanid}</td>
          <td>${element.loan_amount}</td>
          <td>{element.total_installments/12}</td>
          <td><Button color="teal" onClick={(e)=>{approveL(element.loanid)}}>Accept</Button> <Button color="red" onClick={(e)=>{rejectL(element.loanid)}}>Reject</Button></td>
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
                        <th>Tenure</th>
                        <th>Accept/Reject</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Card>
            <Pagination size="lg" page={activePage} onChange={setActivePage} total={Math.ceil(data.total / 20)} withEdges />

        </Container>
      );
}
