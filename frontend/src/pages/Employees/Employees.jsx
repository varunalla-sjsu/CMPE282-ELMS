import React, { useState } from "react";
import { Center, Container, Text, Tabs } from "@mantine/core";
import EmpDetails from '../../components/EmpDetails';
import LoanDetails from '../../components/LoanDetails';

import { Button,Group} from '@mantine/core';

export function Employees() {
    return (
        <Container>
            <Tabs variant="outline" tabPadding="lg">
            <Tabs.Tab label="Profile"><EmpDetails /></Tabs.Tab>
            <Tabs.Tab label="Loan Details"><LoanDetails /></Tabs.Tab>
            <Tabs.Tab label="Settings">Settings tab content</Tabs.Tab>
            </Tabs>
        </Container>
      );
}
