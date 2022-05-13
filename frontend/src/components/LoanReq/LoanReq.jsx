import React, {useState} from "react";
import { useForm } from '@mantine/form';
import { createStyles, Card, Container, Text, TextInput, Group, Button, Select, NumberInput } from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import { createEmployeeLoan, getEmployeeProfile } from "../../services/EmployeeService";
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

    mt: {
        marginTop: 30,
    }
  }));

export function LoanReq() {
    const { classes } = useStyles();
    const { data: item } = useQuery("getEmployeeProfile", getEmployeeProfile);
    const createLoan = useMutation(createEmployeeLoan);
    const form = useForm ({
        initialValues: { amount: '', tenure: '' },
        validate: (values) => ({
            amount: values.amount > item.salary ? "You cannot get loan more then your salary": null, //200 replace with salary
        }),
      });

      

    return (
        <Container>

            <Card withBorder radius="md" className={classes.card} >
                <Text pb="40"><b>Request New Loan</b></Text>
                <form className={classes.mt} onSubmit={form.onSubmit((values) => {
                    createLoan.mutateAsync({
                        loan_amount: values.amount,
                        total_installments: values.tenure
                    }).then((res) => {
                        showNotification({
                            color: "green",
                            title: "Sucessfully Requested",
                            message: "Your Loan is in Request Status"
                        })
                    }).catch((err) => {
                        showNotification({
                            color: "red",
                            title: "Error",
                            message: "Your Loan not Requested! Please try again."
                        })
                    })


                })}>
                    <NumberInput mb={20} label="Loan Amount" placeholder="Loan Amount" {...form.getInputProps('amount')} />
                    <NumberInput mb={20} label="Tenure" placeholder="Tenure" {...form.getInputProps('tenure')} />
                    <Group position="right" mt="md">
                        <Button type="submit">Request</Button>
                    </Group>
                </form>
            </Card>
        </Container>
      );
}
