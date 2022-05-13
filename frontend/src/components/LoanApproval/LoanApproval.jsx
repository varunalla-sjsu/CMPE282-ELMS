import React, { useState } from "react";
import { createStyles, Card, Container, Text,Pagination, Collapse, Table, Button } from "@mantine/core";
import {getLoanRequestsByDept,approveLoan} from "../../services/ManagerService" 
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

    green: {
        color: '#40d92a',
    }
  }));

export function LoanApproval() {
    const { classes } = useStyles();
    const [opened, setOpen] = useState(false);
    const [activePage,setActivePage] = useState(1);

    const { data } = useQuery(["getLoanRequestsByDept", activePage],() => getLoanRequestsByDept(activePage), { keepPreviousData : true });
    console.log(data)
    const elements = [
        { id: 6, amount: 4000, tenure: 12 },
      ];
    
    const approve=(id) =>{
      approveLoan(id)
    }
    const rows = data.data.map((element) => (
        <tr key={element.loanid}>
          <td>{element.loanid}</td>
          <td>${element.loan_amount}</td>
          <td>{element.total_installments/12}</td>
          <td><Button color="teal" onClick={(e)=>{approve(element.id)}}>Accept</Button> <Button color="red" >Reject</Button></td>
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
            <Pagination size="sm" page={activePage} onChange={setActivePage} total={Math.ceil(data.data.total / 20)} withEdges />

        </Container>
      );
}
