import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from 'src/views/Login';
import Root from 'src/views/Root';
import Realism from 'src/views/Root/Realism';
import Conditionality from 'src/views/Root/Conditionality';
import ModelAssessment from 'src/views/Root/ModelAssessment';
import NavBar from 'src/components/NavBar';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import useUsername from 'src/hooks/useUsername';
import useDarkMode from "./hooks/useDarkMode";
import useZoomed from "./hooks/useZoomed";

import LINKS from 'src/links';

import './App.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {

  const { username, setUsername } = useUsername();
  const { darkMode, setDarkMode } = useDarkMode();
  const { zoomed, setZoomed } = useZoomed();

  const router = createBrowserRouter([
    {
      path: LINKS.ROOT,
      element: <Root />,
    },
    {
      path: LINKS.TASK1,
      element: <Realism zoomed={ zoomed! } />,
    },
    {
      path: LINKS.TASK2,
      element: <Conditionality zoomed={ zoomed! } />,
    },
    {
      path: LINKS.TASK3,
      element: <ModelAssessment zoomed={ zoomed! } />,
    },
  ]);

  const theme = darkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const loggedInContent = (
    <>
        <NavBar
          username={ username || '' }
          toggleTheme={ toggleTheme }
          darkMode={ darkMode! }
          zoomed={ zoomed! }
          setZoomed={ setZoomed! }
        />
        <RouterProvider router={ router } />
    </>
  )
  const content = username ? loggedInContent : <Login setUsername={ setUsername }/>;

  return (
    <>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        { content }
      </ThemeProvider>
    </>
  )
}

export default App;
