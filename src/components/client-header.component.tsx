import { Button, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesConstant } from "src/constants/RoutesConstants.enum";

import { useTranslation } from 'react-i18next';
import { getCurrentLanguage, changeLanguage } from "src/i18n/i18n";

const ClientHeaderComp: FC = () => {
    const navigate = useNavigate()
    const { t } = useTranslation();

    const currentLanguage = getCurrentLanguage();
    const handleChangeLanguage = () => {
        const newLanguage = currentLanguage === 'en' ? 'ru' : 'en';
        changeLanguage(newLanguage);
    };

    const handleClickSignOut = () => {
        navigate(RoutesConstant.sign_in)
    }

    const navToFlights = () => navigate(RoutesConstant.flights)
    const navToCart = () => navigate(RoutesConstant.cart)
    const navToProfile = () => navigate(RoutesConstant.user)

    return (
        <header style={{ display: 'flex', padding: '10px 40px', justifyContent: 'center' }}>
            <MenuItem onClick={navToFlights}>
                <Typography variant="h4" className="navlink">{t('header.flights')}</Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant="h4" className="navlink">{t('header.chat')}</Typography>
            </MenuItem>
            <MenuItem onClick={navToProfile}>
                <Typography variant="h4" className="navlink">{t('header.profile')}</Typography>
            </MenuItem>
            <MenuItem onClick={navToCart}>
                <Typography variant="h4" className="navlink">{t('header.cart')}</Typography>
            </MenuItem>
            <FormControl className="lang">
                <Select
                    labelId="language-select-label"
                    id="language-select"
                    value={currentLanguage}
                    onChange={handleChangeLanguage}
                // label={t('Language')}
                >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="ru">Русский</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={handleClickSignOut} variant="contained" color="error">{t('header.signout')}</Button>
        </header>
    );
};

export default ClientHeaderComp;