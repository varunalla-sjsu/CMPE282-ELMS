import React from "react";
import { Container, Tabs } from "@mantine/core";
import {AllEmp} from "../../components/AllEmp/AllEmp";
import {AllLoans} from "../../components/AllLoans/AllLoans";
import AllManagers from "../../components/AllManagers";
import EmpDetails from '../../components/EmpDetails';

export function Admin() {
    return (
        <Container>
            <Tabs variant="outline" tabPadding="lg">
                <Tabs.Tab label="Employees' List"><AllEmp /></Tabs.Tab>
                <Tabs.Tab label="All Departments"><AllManagers /></Tabs.Tab>
                <Tabs.Tab label="All Active Loans"><AllLoans /></Tabs.Tab>
                <Tabs.Tab label="Profile"><EmpDetails /></Tabs.Tab>

            </Tabs>
        </Container>
    );
}
