import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import BuildIcon from '@material-ui/icons/Build';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BarChartIcon from '@material-ui/icons/BarChart';
import cls from './Nav.module.css';
import {Link} from "react-router-dom";
import {ExitToApp} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Nav(props) {
    const userName = props.name;
    const {window} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function closeMenu(e) {
        e.preventDefault();
        document.getElementById("nav").className = cls.nav;
    }

    // document.querySelector("buttonClose").addEventListener('click',closeMenu);
    const drawer = (
        <div id="nav" className={cls.nav}>
            <List>
                <ListItem button key={userName}>
                    <ListItemIcon> <AccountCircleIcon/> </ListItemIcon>
                    <ListItemText primary={userName}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button key={"Profile"} component={Link} to="/Profile/" >
                    <ListItemIcon> <AccountCircleIcon/> </ListItemIcon>
                    <ListItemText primary={"Profile"}/>
                </ListItem>
                <ListItem button key={"Notifications"} component={Link} to="/Notification/" >
                    <ListItemIcon> <BuildIcon/> </ListItemIcon>
                    <ListItemText primary={"Notifications"}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button key={"Ratings"}>
                    <ListItemIcon> <BarChartIcon/> </ListItemIcon>
                    <ListItemText primary={"Ratings"}/>
                </ListItem>
                <ListItem button key={"Settings"}>
                    <ListItemIcon> <BuildIcon/> </ListItemIcon>
                    <ListItemText primary={"Settings"}/>
                </ListItem>
            </List>
            <Divider/>
            <ListItem button key={"Log out"}>
                <ListItemIcon> <ExitToApp/> </ListItemIcon>
                <ListItemText primary={"Log out"}/>
            </ListItem>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <div className={classes.root}>
            <CssBaseline/>

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}


export default Nav