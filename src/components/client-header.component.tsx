import { Button, MenuItem, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesConstant } from "src/constants/RoutesConstants.enum";
import { useAppDispatch } from "src/storeTypes";

const ClientHeaderComp: FC = () => {
    const navigate = useNavigate()

    const handleClickSignOut = () => {
        navigate(RoutesConstant.sign_in)
    }

    const navToFlights = () => navigate(RoutesConstant.flights)
    const navToCart = () => navigate(RoutesConstant.cart)
    const navToProfile = () => navigate(RoutesConstant.user)

    return (
        <header style={{ display: 'flex', padding: '10px 60px', justifyContent: 'center' }}>
            <MenuItem >
                <Typography variant="h4" onClick={navToFlights} className="navlink">Flights</Typography>
            </MenuItem>
            <MenuItem >
                <Typography variant="h4" onClick={navToProfile} className="navlink">Profile</Typography>
            </MenuItem>
            <MenuItem >
                <Typography variant="h4" onClick={navToCart} className="navlink">Cart</Typography>
            </MenuItem>
            <Button onClick={handleClickSignOut} variant="contained" color="error" sx={{ marginLeft: 'auto' }}>Sign out</Button>
        </header>
    );
};

export default ClientHeaderComp;