import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import {
  Button,
  Checkbox,
  createTheme,
  Dialog,
  FormHelperText,
  TextField,
  ThemeProvider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import { blue, red, grey } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useImmer } from 'use-immer';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSnackbar } from 'notistack';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import uuid from 'react-uuid';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: blue[700],
    },
    error: {
      main: red[500],
    },
    text: {
      primary: grey[700],
      secondary: grey[800],
      disabled: grey[800],
      hint: grey[800],
    },
  },
});

function createData(id, title, description, deadline, priority, isComplete) {
  return { id, title, description, deadline, priority, isComplete };
}

let rows = [];

function ScrollTop(props) {
  const { children, window } = props;
  // will default to window.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function TodoPopup(props) {
  const { item, onClose, onUpdate, onAdd, open, isAdd, titles } = props;
  const [title, setTitle] = React.useState(item.title);
  const [titleEmpty, setTitleEmpty] = React.useState(false);
  const [titleHelperText, setTitleHelperText] = React.useState('');

  const [description, setDescription] = React.useState(item.description);
  const [descriptionEmpty, setDescriptionEmpty] = React.useState(false);
  const [descriptionHelperText, setDescriptionHelperText] = React.useState('');

  const [selectedDate, setSelectedDate] = React.useState(dayjs(item.deadline));
  const [selectedDateEmpty, setSelectedDateEmpty] = React.useState(false);
  const [selectedDateHelperText, setSelectedDateHelperText] =
    React.useState('');

  const [priority, setPriority] = React.useState(item.priority);
  const [priorityEmpty, setPriorityEmpty] = React.useState(false);
  const [priorityHelperText, setPriorityHelperText] = React.useState('');

  useEffect(() => {
    setDescription(item.description);
    setSelectedDate(dayjs(item.deadline));
    setPriority(item.priority);
  }, [props.item]);

  const handleTitleChange = (value) => {
    setTitle(value);

    if (value.length === 0) {
      setTitleEmpty(true);
      setTitleHelperText('Title is Required!');
    } else {
      setTitleEmpty(false);
      setTitleHelperText('');
    }
    if (titles.includes(value)) {
      setTitleEmpty(true);
      setTitleHelperText('Title must be unique!');
    }
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    if (value.length === 0) {
      setDescriptionEmpty(true);
      setDescriptionHelperText('Description is Required!');
    } else {
      setDescriptionEmpty(false);
      setDescriptionHelperText('');
    }
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    if (newValue === null) {
      setSelectedDateEmpty(true);
      setSelectedDateHelperText('Deadline is Required!');
    } else {
      setSelectedDateEmpty(false);
      setSelectedDateHelperText('');
    }
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
    if (value.length === 0) {
      setPriorityEmpty(true);
      setPriorityHelperText('Priority is Required!');
    } else {
      setPriorityEmpty(false);
      setPriorityHelperText('');
    }
  };

  const handleClose = () => {
    if (item) {
      handleTitleChange(item.title);
      handleDescriptionChange(item.description);
      handleDateChange(dayjs(item.deadline));
      handlePriorityChange(item.priority);
    }
    setTitleEmpty(false);
    setTitleHelperText('');
    setDescriptionEmpty(false);
    setDescriptionHelperText('');
    setSelectedDateEmpty(false);
    setSelectedDateHelperText('');
    setPriorityEmpty(false);
    setPriorityHelperText('');
    onClose();
  };

  const checks = () => {
    if (titles.includes(title)) {
      setTitleEmpty(true);
      setTitleHelperText('Title must be unique!');
    }
    if (title.length === 0) {
      setTitleEmpty(true);
      setTitleHelperText('Title is Required!');
    }
    if (description.length === 0) {
      setDescriptionEmpty(true);
      setDescriptionHelperText('Description is Required!');
    }
    if (priority.length === 0) {
      setPriorityEmpty(true);
      setPriorityHelperText('Priority is Required!');
    }
    if (selectedDate === null) {
      setSelectedDateEmpty(true);
      setSelectedDateHelperText('Deadline is Required!');
    }
  };

  const handleAdd = () => {
    checks();
    if (
      !titles.includes(title) &&
      selectedDate !== null &&
      priority.length !== 0 &&
      title.length !== 0 &&
      description.length !== 0
    ) {
      onAdd(
        createData(
          item.id,
          title,
          description,
          selectedDate.format('MM/DD/YY'),
          priority,
          item.isComplete
        )
      );
      setSelectedDate(dayjs());
      setTitle('');
      setDescription('');
      setPriority('low');
      handleClose();
    }
  };

  const handleEdit = () => {
    checks();
    if (
      selectedDate !== null &&
      priority.length !== 0 &&
      title.length !== 0 &&
      description.length !== 0
    ) {
      onUpdate(item.id, description, selectedDate.format('MM/DD/YY'), priority);
      handleClose();
    }
  };

  const editButton = () => {
    return (
      <Button
        onClick={(e) => {
          handleEdit();
        }}
        variant="contained"
        size="large"
        startIcon={<EditIcon />}
        color={'secondary'}
        sx={{ width: '110px', margin: '5px' }}
      >
        EDIT
      </Button>
    );
  };

  const addButton = () => {
    return (
      <Button
        onClick={(e) => {
          handleAdd();
        }}
        variant="contained"
        size="large"
        startIcon={<AddCircleIcon />}
        color={'secondary'}
        sx={{ width: '110px', margin: '5px' }}
      >
        ADD
      </Button>
    );
  };

  const titleBlock = () => {
    return (
      <TextField
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        error={titleEmpty}
        helperText={titleHelperText}
        id="outlined-basic"
        label="Title"
        variant="outlined"
        sx={{ width: '280px', paddingBottom: '32px' }}
      />
    );
  };

  const editToolbar = () => {
    return (
      <Toolbar
        sx={{
          backgroundColor: blue[800],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          color: 'white',
        }}
      >
        <EditIcon></EditIcon>
        <Typography variant="p" component="div">
          Edit Task
        </Typography>
      </Toolbar>
    );
  };

  const addToolbar = () => {
    return (
      <Toolbar
        sx={{
          backgroundColor: blue[800],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          color: 'white',
        }}
      >
        <AddCircleIcon></AddCircleIcon>
        <Typography variant="p" component="div">
          Add Task
        </Typography>
      </Toolbar>
    );
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {!isAdd && editToolbar()}
      {isAdd && addToolbar()}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '32px 32px 18px 32px',
        }}
      >
        {isAdd && titleBlock()}
        <TextField
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          error={descriptionEmpty}
          helperText={descriptionHelperText}
          id="outlined-basic"
          label="Description"
          variant="outlined"
          sx={{ width: '280px', paddingBottom: '32px' }}
        />
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          sx={{ width: '280px', marginBottom: '24px' }}
        >
          <DatePicker
            label="Deadline"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                error={selectedDateEmpty}
                helperText={selectedDateHelperText}
              />
            )}
          />
        </LocalizationProvider>
        <FormControl
          sx={{ width: '280px', marginTop: '24px' }}
          error={priorityEmpty}
        >
          <FormLabel id="demo-row-radio-buttons-group-label">
            Priority
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={priority}
            onChange={(e) => handlePriorityChange(e.target.value)}
          >
            <FormControlLabel value="low" control={<Radio />} label="Low" />
            <FormControlLabel value="med" control={<Radio />} label="Med" />
            <FormControlLabel value="high" control={<Radio />} label="High" />
          </RadioGroup>
          {priorityEmpty && (
            <FormHelperText error>{priorityHelperText}</FormHelperText>
          )}
        </FormControl>
      </Container>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: '5px!important',
        }}
      >
        {!isAdd && editButton()}
        {isAdd && addButton()}
        <Button
          onClick={(e) => {
            handleClose();
          }}
          variant="contained"
          size="large"
          startIcon={<DoDisturbIcon />}
          color={'error'}
          sx={{ width: '110px', margin: '5px' }}
        >
          CANCEL
        </Button>
      </Container>
    </Dialog>
  );
}

TodoPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  titles: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  isAdd: PropTypes.bool.isRequired,
};

export default function BackToTop(props) {
  const [addPopupOpen, setAddPopupOpen] = React.useState(false);
  const [editPopupOpen, setEditPopupOpen] = React.useState(false);
  const [todoList, updateTodoList] = useImmer(rows);
  // Use an empty object with default values as a placeholder when there are no items
  const emptyTodo = createData(
    uuid(),
    '',
    '',
    dayjs().format('MM/DD/YY'),
    'low',
    false
  );
  const [selectedRow, setSelectedRow] = React.useState(emptyTodo);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setAddPopupOpen(true);
  };

  const handleClose = () => {
    setAddPopupOpen(false);
  };

  const handleClickEditOpen = (item) => {
    setSelectedRow(item);
    setEditPopupOpen(true);
  };

  const handleEditClose = () => {
    setEditPopupOpen(false);
  };

  function handleToggleTodo(id) {
    updateTodoList((draft) => {
      const todo = draft.find((a) => a.id === id);
      todo.isComplete = !todo.isComplete;
    });
  }

  function handleDeleteTodo(id) {
    updateTodoList((draft) => {
      const index = draft.findIndex((a) => a.id === id);
      draft.splice(index, 1);
    });
    enqueueSnackbar('Task was deleted successfully!', {
      variant: 'success',
      autoHideDuration: 5000,
      // anchorOrigin: { vertical: "top", horizontal: "right" }
    });
  }

  function handleAddTodo(newItem) {
    updateTodoList((draft) => {
      draft.push(newItem);
    });
    enqueueSnackbar('Task was added successfully!', {
      variant: 'success',
      autoHideDuration: 5000,
      // anchorOrigin: { vertical: "top", horizontal: "right" }
    });
  }

  function handleUpdateTodo(id, description, deadline, priority) {
    updateTodoList((draft) => {
      const todo = draft.find((a) => a.id === id);
      todo.description = description;
      todo.deadline = deadline;
      todo.priority = priority;
    });
    enqueueSnackbar('Task was updated successfully!', {
      variant: 'success',
      autoHideDuration: 5000,
      // anchorOrigin: { vertical: "top", horizontal: "right" }
    });
  }

  function CanUpdate(props) {
    const isComplete = props.item.isComplete;
    if (!isComplete) {
      return (
        <Button
          onClick={() => {
            handleClickEditOpen(props.item);
          }}
          variant="contained"
          size="large"
          startIcon={<EditIcon />}
          color={'secondary'}
          sx={{ width: '130px' }}
        >
          UPDATE
        </Button>
      );
    }
  }

  // Component to display a message when the todo list is empty
  const EmptyListMessage = () => {
    return (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <Typography variant="subtitle1" sx={{ py: 5 }}>
            No tasks to display. Click the ADD button to create a new task.
          </Typography>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TodoPopup
          titles={todoList.map((item) => item.title)}
          open={addPopupOpen}
          item={createData(
            uuid(),
            '',
            '',
            dayjs().format('MM/DD/YY'),
            'low',
            false
          )}
          onClose={handleClose}
          onAdd={handleAddTodo}
          onUpdate={() => {}}
          isAdd={true}
        />
        <TodoPopup
          titles={todoList.map((item) => item.title)}
          open={editPopupOpen}
          item={selectedRow}
          onClose={handleEditClose}
          onAdd={() => {}}
          onUpdate={handleUpdateTodo}
          isAdd={false}
        />
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Container
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MenuIcon></MenuIcon>
              <Typography variant="p" component="div">
                FRAMEWORKS
              </Typography>
            </Container>
            <Button
              onClick={(e) => {
                handleClickOpen();
              }}
              variant="contained"
              size="large"
              startIcon={<AddCircleIcon />}
              color={'secondary'}
            >
              ADD
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar id="back-to-top-anchor" />
        <TableContainer
          component={Paper}
          sx={{ boxShadow: 'none', padding: '16px' }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <colgroup>
              <col style={{ width: '16.66%' }} />
              <col style={{ width: '16.66%' }} />
              <col style={{ width: '16.66%' }} />
              <col style={{ width: '16.66%' }} />
              <col style={{ width: '16.66%' }} />
              <col style={{ width: '16.66%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Deadline</TableCell>
                <TableCell align="center">Priority</TableCell>
                <TableCell align="center">Is Complete</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoList.length > 0 ? (
                todoList.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.deadline}</TableCell>
                    <TableCell align="center">{row.priority}</TableCell>
                    <TableCell align="center">
                      <Checkbox
                        checked={row.isComplete}
                        onChange={(e) => {
                          handleToggleTodo(row.id);
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Container
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <CanUpdate item={row}></CanUpdate>
                        <Button
                          onClick={(e) => {
                            handleDeleteTodo(row.id);
                          }}
                          variant="contained"
                          size="large"
                          startIcon={<CancelIcon />}
                          color={'error'}
                          sx={{ width: '130px' }}
                        >
                          DELETE
                        </Button>
                      </Container>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <EmptyListMessage />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <ScrollTop {...props}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </React.Fragment>
    </ThemeProvider>
  );
}
