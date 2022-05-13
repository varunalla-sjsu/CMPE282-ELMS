import React from "react";
import { Container, Tabs } from "@mantine/core";
import DeptEmployees from "../../components/DeptEmployees";
import LoanApproval from "../../components/LoanApproval";
import EmpDetails from '../../components/EmpDetails';
import { OnDeptLoans } from "../../components/AllDeptLoans/OnDeptLoans";

export function Manager() {
    return (
        <Container>
            <Tabs variant="outline" tabPadding="lg">
                <Tabs.Tab label="Employees List"><DeptEmployees /></Tabs.Tab>
                <Tabs.Tab label="Current Department Loans"><OnDeptLoans /></Tabs.Tab>
                <Tabs.Tab label="Loan Requests"><LoanApproval /></Tabs.Tab>
                <Tabs.Tab label="Profile"><EmpDetails /></Tabs.Tab>
            </Tabs>
        </Container>
      );
}
