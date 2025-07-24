import React, { useState } from 'react';
import { Paper, TextField, Button, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const TransactionForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().slice(0, 10),
        type: '지출',
        category: '',
        amount: '',
        description: ''
    });

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
        setFormData({
            date: new Date().toISOString().slice(0, 10),
            type: '지출',
            category: '',
            amount: '',
            description: ''
        });
    };

    return (
        <Paper
            elevation={0}
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: { xs: 2, sm: 3 }, border: '1px solid', borderColor: 'divider' }}
        >
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 1.5, md: 2 }}
                alignItems="center"
            >
                <TextField name="date" label="날짜" type="date" value={formData.date} onChange={handleFormChange} InputLabelProps={{ shrink: true }} size="small" sx={{ width: { xs: '100%', md: 180 } }}/>
                <FormControl size="small" sx={{ width: { xs: '100%', md: 120 } }}>
                    <InputLabel>수입/지출</InputLabel>
                    <Select name="type" value={formData.type} label="수입/지출" onChange={handleFormChange}>
                        <MenuItem value="지출">지출</MenuItem>
                        <MenuItem value="수입">수입</MenuItem>
                    </Select>
                </FormControl>
                <TextField name="category" label="분류" value={formData.category} onChange={handleFormChange} size="small" sx={{ width: { xs: '100%', md: 120 } }}/>
                <TextField name="description" label="내용" value={formData.description} onChange={handleFormChange} size="small" sx={{ flexGrow: 1, width: { xs: '100%', md: 'auto' }, minWidth: { md: '150px' } }}/>
                <TextField name="amount" label="금액" type="number" value={formData.amount} onChange={handleFormChange} size="small" sx={{ width: { xs: '100%', md: 120 } }}/>
                <Button type="submit" variant="contained" sx={{ width: { xs: '100%', md: 'auto' }, whiteSpace: 'nowrap' }}>
                    추가
                </Button>
            </Stack>
        </Paper>
    );
};

export default TransactionForm;