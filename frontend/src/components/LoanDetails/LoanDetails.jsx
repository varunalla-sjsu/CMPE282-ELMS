import React, { useState } from "react";
import { createStyles, Card, Container, Text, Collapse, Table } from "@mantine/core";

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
  }));

export function LoanDetails() {
    const { classes } = useStyles();
    const [opened, setOpen] = useState(false);
    const elements = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
      ];

    const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.position}</td>
          <td>{element.name}</td>
          <td>{element.symbol}</td>
          <td>{element.mass}</td>
        </tr>
      ));

    return (
        <Container>

            <Card withBorder radius="md" className={classes.card} >
                <Text pb="40"><b>Loan Details</b></Text>
                <Table>
                    <thead>
                        <tr>
                        <th>Amount</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Remaining Months</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Card>
        </Container>
      );
}
