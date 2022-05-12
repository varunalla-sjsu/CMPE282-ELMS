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

export function EmpDetails() {
    const { classes } = useStyles();
    const [opened, setOpen] = useState(false);

    return (
        <Container>
            <Text className={classes.title}>Employee Name</Text>
            <Card withBorder radius="md" className={classes.card} >
                <Text  className={classes.subtitle}><b>Details</b></Text>
                <Text className={classes.para}> <b>Date of Birth:</b> 22nd Nov, 1993</Text> {/* {birth_date} */}
                <Text className={classes.para}> <b>Date of Hire:</b> 1st Jan, 2021</Text>{/* {hire_date} */}
                <Text className={classes.para}> <b>Role:</b> Software Engineer</Text>{/* {titles} */}
                <Text className={classes.para}> <b>Department:</b> Finance</Text>{/* {dept_emp} */}
                <Text className={classes.para}> <b>Reporting Manager:</b> Jane Doe</Text>{/* {dept_manager} */}
                <Text className={classes.para}> <b>Current Salary:</b> $40000</Text>{/* {salaries} */}
            </Card>
        </Container>
      );
}
