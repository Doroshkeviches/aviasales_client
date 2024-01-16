import { Button, MenuItem, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesConstant } from "src/constants/RoutesConstants.enum";
import { useAppDispatch } from "src/storeTypes";
import { signout } from "src/utils/signout";

const ManagerHeaderComp: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleClickSignOut = () => {
        signout(dispatch)
    }

    const navToFlights = () => navigate(RoutesConstant.flights)
    const navToTickets = () => navigate(RoutesConstant.tickets)

    return (
        <header style={{ display: 'flex', padding: '10px 60px', justifyContent: 'center' }}>
            <MenuItem >
                <Typography variant="h4" onClick={navToFlights} className="navlink">Flights</Typography>
            </MenuItem>
            <MenuItem >
                <Typography variant="h4" onClick={navToTickets} className="navlink">Tickets</Typography>
            </MenuItem>
            <Button onClick={handleClickSignOut} variant="contained" color="error" sx={{ marginLeft: 'auto' }}>Sign out</Button>
        </header>
    );
};

export default ManagerHeaderComp;