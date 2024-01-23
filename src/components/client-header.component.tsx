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
    const navToChat= () => navigate(RoutesConstant.chat)

    return (
        <header style={{ display: 'flex', padding: '10px 60px', justifyContent: 'center' }}>
            <MenuItem onClick={navToFlights}>
                <Typography variant="h4" className="navlink">Flights</Typography>
            </MenuItem>
            <MenuItem onClick={navToChat}>
                <Typography variant="h4" className="navlink">Chat</Typography>
            </MenuItem>
            <MenuItem onClick={navToProfile}>
                <Typography variant="h4" className="navlink">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={navToCart}>
                <Typography variant="h4" className="navlink">Cart</Typography>
            </MenuItem>
            <Button onClick={handleClickSignOut} variant="contained" color="error" sx={{ marginLeft: 'auto' }}>Sign out</Button>
        </header>
    );
};

export default ClientHeaderComp;