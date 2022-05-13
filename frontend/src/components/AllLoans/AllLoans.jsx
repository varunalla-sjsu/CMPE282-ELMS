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

export function AllLoans() {
    const { classes } = useStyles();
    const [opened, setOpen] = useState(false);
    const elements = [
        { id: 6, amount: 12.011, months: 3, tenure: 12, symbol: 'Active', name: 'Carbon' },
        { id: 7, amount: 14.007, months: 3, tenure: 12, symbol: 'Active', name: 'Nitrogen' },
        { id: 39, amount: 88.906, months: 3, tenure: 12, symbol: 'Active', name: 'Yttrium' },
        { id: 56, amount: 137.33, months: 3, tenure: 12, symbol: 'Active', name: 'Barium' },
        { id: 58, amount: 140.12, months: 3, tenure: 12, symbol: 'Active', name: 'Cerium' },
      ];

    const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.id}</td>
          <td>{element.amount}</td>
          <td>{element.months}</td>
          <td>{element.tenure}</td>
          <td className={classes.green}>{element.symbol}</td>
          <td><Button>Close</Button></td>
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
                        <th>PreClose Loan</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Card>
        </Container>
      );
}
