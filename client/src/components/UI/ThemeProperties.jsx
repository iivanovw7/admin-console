import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const drawerWidth = 240;

//Exporting material-ui main themeProperties configuration
export const themeProperties = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  mixins: {
    toolbar: {
      textAlign: 'center',
      minHeight: '64px',
      justifyContent: 'space-between'
    }
  },
  palette: {
    primary: blue,
    secondary: red,
    logout: {
      main: '#FFFFFF'
    }
  },
  status: {
    danger: 'orange'
  }
});

//Exporting material-ui main styles
export const NavigationStyles = theme => ({
  active: {
    backgroundColor: 'rgba(0, 0, 0, 0.10)'
  },
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  toolbarUserName: {
    [theme.breakpoints.down('xs')]: {
      //display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  searchRoot: {
    marginTop: theme.spacing.unit * 3,
    padding: '4px 6px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  searchIcon: {
    paddingLeft: theme.spacing.unit * 2,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  }
});

export const LoginFormStyles = theme => ({

  [theme.breakpoints.down('sm')]: {
    loginFormContainer: {
      boxShadow: 'none',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  },
  loginWrapper: {
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%'
  },
  loginFormContainer: {
    padding: theme.spacing.unit,
    maxWidth: '500px'
  },
  formPaper: {
    margin: theme.spacing.unit * 2
  },
  paddingTop: theme.spacing.unit * 2,
  paddingBottom: theme.spacing.unit * 2

});

//Exporting material-ui main styles
export const Wrapper = theme => ({
  root: {
    display: 'flex'
  },
  spinnerBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
    margin: '50px'
  },
  toolbar: theme.mixins.toolbar,
  contentSingle: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  contentList: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      height: '90vh'
    },
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    }
  },
  formRoot: {
    display: 'flex',
    flexWrap: 'wrap',

    buttonWrapper: {
      display: 'flex',
      alignItems: 'center'
    }
  },
  pageSelectorTitle: {
    alignItems: 'center',
    display: 'flex',
    margin: '10px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  fromLimitSelector: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      //display: 'none'
    }
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: 'space-between'
  },
  selectorsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10
  },
  icon: {
    margin: theme.spacing.unit * 2
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800]
    }
  }
});

export const Container = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  tables: {
    minWidth: 200,
    width: '100%'
  },
  tableCell: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  branchRowClass: {
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.1),
      cursor: 'pointer'
    },
    [theme.breakpoints.up('sm')]: {
      height: '48px'
    },
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    }
  },
  branchNameCell: {
    paddingRight: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,

    [theme.breakpoints.up('sm')]: {
      width: '30%'
    },

    [theme.breakpoints.down('sm')]: {
      width: '60%'
    }

  },
  branchAddressCell: {
    paddingRight: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  branchEmployeesCell: {
    paddingRight: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  branchPaper: {
    width: '100%',
    maxWidth: 600,
    margin: theme.spacing.unit * 2
  },
  groupRowClass: {
    [theme.breakpoints.up('sm')]: {
      height: '48px'
    },
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    }
  },
  groupNameCell: {
    paddingRight: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,

    [theme.breakpoints.up('sm')]: {
      width: '40%'
    },

    [theme.breakpoints.down('sm')]: {
      width: '60%'
    }

  },
  groupStatusCell: {
    paddingRight: 10,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,

    [theme.breakpoints.up('sm')]: {
      width: '10%'
    },

    [theme.breakpoints.down('sm')]: {
      width: '30%'
    }
  },
  groupDesktopCell: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    width: '10%',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  userRowClass: {
    height: '100%'
  },
  userNameCell: {
    paddingRight: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: '300px'
  },
  userEmailCell: {
    width: '300px',
    padding: 5,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  userStatusCell: {
    padding: 5,
    width: '100px',
  },
  userControlCell: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    width: '100px',
  }

});

export const Notification = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
});

export const Buttons = theme => ({
  formRoot: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  [theme.breakpoints.down('sm')]: {
    mobile: {
      display: 'flex'
    },
    desktop: {
      display: 'none'
    }
  },
  [theme.breakpoints.up('sm')]: {
    mobile: {
      display: 'none'
    },
    desktop: {
      display: 'flex'
    }
  }
});

