import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


const Searchbar = ({onCreate}) => {
    const classes = useStyles();
    const [state, setState] = useState({
        pickup:'',
        destination:'',
        startDate: new Date()
    })


//change the state when the search input is typed
const handleChange = (e) => {
    setState({
        ...state,
        [e.target.name]: e.target.value
    });
}

//change the state when the date input is typed
const handleDateChange = date => {
    setState({...state,
        startDate: date
    });
}

//handles submit feature when the event is called.
//after the submission, the state is reset
const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({...state, startDate: state.startDate.toISOString()});
    setState({
        pickup:'',
        destination:'',
        startDate: new Date()
    })
}

    return(
        <form className={classes.form} noValidate>
            <FormControl className={classes.FormControl} variant="outlined">
                <InputLabel htmlFor="component-outlined">
                    pickup
                </InputLabel>
            <OutlinedInput
                type='text'
                value={state.pickup}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="pickup"
                onChange={handleChange}
                name="pickup"
            />
            </FormControl>
            <FormControl className={classes.FormControl} variant="outlined">
            <InputLabel htmlFor="component-outlined">
                    destination
                </InputLabel>
            <OutlinedInput
                type='text'
                value={state.destination}
                margin="normal"
                required
                fullWidth
                id="destination"
                onChange={handleChange}
                name="destination"
            />
            </FormControl>
            <DatePicker
                    placeholderText="choose date and time"
                    selected={state.startDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.submit}
            >
                submit
            </Button>
        </form>
    )
}

export default Searchbar;