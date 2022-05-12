import React from "react";
import { useForm } from '@mantine/form';
import { createStyles, Card, Container, Text, TextInput, Group, Button, Select } from "@mantine/core";

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
    const form = useForm ({
        initialValues: { amount: '', tenure: '' },
        validate: (values) => ({
            amount: values.amount < 200 ? 'Too short name' : null, //200 replace with salary
        }),
      });

    return (
        <Container>

            <Card withBorder radius="md" className={classes.card} >
                <Text pb="40"><b>Request New Loan</b></Text>
                <form className={classes.mt} onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput mb={20} label="Loan Amount" placeholder="Loan Amount" {...form.getInputProps('amount')} />
                    <Select
                        clearable
                        label="Tenure"
                        placeholder="Choose Tenure"
                        data={[
                            { value: '12', label: '12 Months' },
                            { value: '24', label: '24 Months' },
                        ]}
                    />
                    <Group position="right" mt="md">
                        <Button type="submit">Request</Button>
                    </Group>
                </form>
            </Card>
        </Container>
      );
}
