import React, { useState } from "react";
import { createStyles, Card, Container, Text, Collapse, Table, Button } from "@mantine/core";

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
    const elements = [
        { id: 6, amount: 4000, tenure: 12 },
      ];

    const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.id}</td>
          <td>${element.amount}</td>
          <td>{element.tenure}</td>
          <td><Button color="teal">Accept</Button> <Button color="red" >Reject</Button></td>
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
        </Container>
      );
}
