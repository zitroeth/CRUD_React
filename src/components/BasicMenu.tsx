import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableViewIcon from '@mui/icons-material/TableView';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import { teal } from '@mui/material/colors';
import Link from '@mui/material/Link';


export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    let timeoutId: number | null = null;

    const handleClose = () => {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            setAnchorEl(null);
        }, 0);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuEnter = () => {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!timeoutId) {
            clearTimeout(timeoutId);
        }
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={open ? handleClose : handleClick}
                onMouseEnter={handleClick}
                onMouseLeave={handleClose}
                color="inherit"
                sx={{
                    zIndex: (theme) => theme.zIndex.modal + 1,
                    "& .MuiButton-root:hover": {
                        bgcolor: "transparent",
                        color: teal[200]
                    }
                }}
            >
                <Typography variant="h6" component="div" sx={{
                    textTransform: "capitalize", 
                    "& .MuiButton-root:hover": {
                        bgcolor: "transparent",
                        color: teal[200]
                    }
                }}>
                    Forms
                </Typography>
                <ExpandMoreIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    onMouseLeave: handleMenuClose,
                    onMouseEnter: handleMenuEnter
                }}
                sx={{
                    "& .MuiList-root": {
                        display: "flex",
                        flexDirection: "row",
                    },
                    "& .MuiMenuItem-root:hover": {
                        bgcolor: "transparent",
                        color: teal[200]
                    },
                    "& .MuiMenuItem-root.Mui-disabled": {
                        opacity: 1,
                        color: teal[400],
                        pr: "4vw",
                    }
                }}
            >
                <div style={{ display: "flex", flexDirection: "column" }} >
                    <MenuItem disabled={true}>
                        <AddIcon />
                        Create
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose} component={Link} href="/create/Friend" >Friend</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} href="/create/Belonging" >Belonging</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} href="/create/Borrowed" >Borrowed</MenuItem>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <MenuItem disabled={true}><TableViewIcon />Listing</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose} component={Link} href="/read/Friend" >Friend</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} href="/read/Belonging" >Belonging</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} href="/read/Borrowed" >Borrowed</MenuItem>
                </div>

            </Menu>
        </div>
    );
}