import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function NavTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch('/one')
            .then((result) => (result.json()))
            .then((data) => setData(data.name))
        fetch('/two')
            .then((result) => (result.json()))
            .then((data) => setData(data.name))
        fetch('/three')
            .then((result) => (result.json()))
            .then((data) => setData(data.name))
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    <LinkTab label="Page One" href="/drafts" {...a11yProps(0)} />
                    <LinkTab label="Page Two" href="/trash" {...a11yProps(1)} />
                    <LinkTab label="Page Three" href="/spam" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Typography variant='h1'>
                    {!data ? "Loading page 1..." : data}
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography variant='h1'>
                    {!data ? "Loading page 2..." : data}
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography variant='h1'>
                    {!data ? 'Loading page 3...' : data}
                </Typography>
            </TabPanel>
        </div>
    );
}
