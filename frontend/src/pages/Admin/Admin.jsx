import React from "react";
import { Container, Tabs } from "@mantine/core";
import {AllEmp} from "../../components/AllEmp/AllEmp";
import {AllLoans} from "../../components/AllLoans/AllLoans";
import AllManagers from "../../components/AllManagers";


export function Admin() {
    return (
        <Container>
            <Tabs variant="outline" tabPadding="lg">
                <Tabs.Tab label="Employees' List"><AllEmp /></Tabs.Tab>
                <Tabs.Tab label="Manager List"><AllManagers /></Tabs.Tab>
                <Tabs.Tab label="All Active Loans"><AllLoans /></Tabs.Tab>
            </Tabs>
        </Container>
    );
}
