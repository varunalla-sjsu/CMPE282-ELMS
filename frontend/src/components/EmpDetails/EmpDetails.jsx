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

    const item = {
        "birth_date":"",
        "hire_date":"",
        "title":"",
        "dept_name":"",
        "dept_manager":"",
        "first_name":"",
        "last_name":"",
        "salary":""
      }

    // var empdet = JSON.parse(details);

    return (
        <Container>
                <>
                    <Text className={classes.title}>{item.first_name} {item.last_name}</Text>
                    <Card withBorder radius="md" className={classes.card} >
                        <Text  className={classes.subtitle}><b>Details</b></Text>
                        <Text className={classes.para}> <b>Date of Birth:</b> {item.birth_date}</Text> {/* {birth_date} */}
                        <Text className={classes.para}> <b>Date of Hire:</b> {item.hire_date}</Text>{/* {hire_date} */}
                        <Text className={classes.para}> <b>Role:</b> {item.titles}</Text>{/* {titles} */}
                        <Text className={classes.para}> <b>Department:</b> {item.dept_emp}</Text>{/* {dept_emp} */}
                        <Text className={classes.para}> <b>Department Manager:</b> {item.dept_manager}</Text>{/* {dept_manager} */}
                        <Text className={classes.para}> <b>Current Salary:</b> {item.salaries}</Text>{/* {salaries} */}
                    </Card>
                </>
        </Container>
      );
}
