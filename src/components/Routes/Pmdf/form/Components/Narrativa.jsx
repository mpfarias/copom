import React, { useState } from 'react';
import { Grid, Button, FormLabel, TextField,  } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Narrativa() {
    
    const [state, setState] = useState({
        narrativa: ''
    });

    const { narrativa } = state;

    const handleChange = (field, value) => {
        setState(prevState => ({ ...prevState, [field]: value }));
    };
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    
    return (
        <>
            <Grid item xs={12} sx={{ mb: 4 }}>
                <FormLabel style={{ fontWeight: 'bold', fontSize: 18, }} id="demo-controlled-radio-buttons-group" component="legend">Copie o texto abaixo e cole no campo NARRATIVA do CAD:</FormLabel>
                <TextField
                    className="narrativa-text"
                    sx={{
                        backgroundColor: 'rgba(0, 200, 0, 0.1)',
                    }}
                    multiline
                    fullWidth
                    value={narrativa}
                    InputProps={{
                        disabled: true
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Grid item xs={8}>
                    <CopyToClipboard text={narrativa} onCopy={() => console.log("narrativa")}>
                        <Button variant="contained"
                            color="secondary"
                            onClick={handleClick}
                            style={{ backgroundColor: '#32CD32', color: '#FFFFFF', width: '100%', marginBottom: 15 }}>Copiar texto
                        </Button>
                    </CopyToClipboard>
                </Grid>
            </Grid>
        </>
    )
}

export default Narrativa