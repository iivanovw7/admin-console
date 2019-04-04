import blue from '@material-ui/core/colors/blue';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createMuiTheme } from '@material-ui/core/styles';

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
    secondary: {
      main: '#ffffff'
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
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  toolbar: theme.mixins.toolbar,
  contentSingle: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  contentList: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      height: '90vh'
    },
    [theme.breakpoints.down('sm')]: {
      height: '100%',
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
  fromLimitSelector: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  controlsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10
  },
  selectorsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10
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
  rowClass: {
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.1),
      cursor: 'pointer'
    },
    [theme.breakpoints.up('sm')]: {
      height: '48px',
    },
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },
  nameCell: {
    paddingRight: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,

    [theme.breakpoints.up('sm')]: {
      width: '30%',
    },

    [theme.breakpoints.down('sm')]: {
      width: '60%',
    }

  },
  addressCell: {
    paddingRight: 5,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  employeesCell: {
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
  }
});

export const Notification = theme => ({
  close: {
    padding: theme.spacing.unit / 2
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

