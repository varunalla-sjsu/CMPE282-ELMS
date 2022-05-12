import React from 'react';
import { createStyles, Header, Group } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

export function TopBar() {
  const { classes } = useStyles();
  
  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <h2>Loan Management System</h2>
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
      <Group position="center">
      {/* Implementing top bar here */}
    </Group>
          </Group>
        </Group>
      </div>
      
    </Header>
  );
}