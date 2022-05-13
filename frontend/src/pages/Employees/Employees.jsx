import React from "react";
import { Container, Tabs } from "@mantine/core";
import EmpDetails from '../../components/EmpDetails';
import LoanDetails from '../../components/LoanDetails';
import OnGoingLoans from '../../components/OnGoingLoans';
import LoanReq from "../../components/LoanReq";


export function Employees() {
    return (
        <Container>
            <Tabs variant="outline" tabPadding="lg">
                <Tabs.Tab label="Loan Details"><LoanDetails /></Tabs.Tab>
                <Tabs.Tab label="On-Going Loans"><OnGoingLoans /></Tabs.Tab>
                <Tabs.Tab label="Request Loan"><LoanReq /></Tabs.Tab>
                <Tabs.Tab label="Profile"><EmpDetails /></Tabs.Tab>
            </Tabs>
        </Container>
      );
}
