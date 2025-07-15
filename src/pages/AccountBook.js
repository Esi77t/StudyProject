import { useEffect, useState } from "react";
import api from "../api/api";
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";

const AccountBook = () => {
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        date: new Date().toISOString().slice(0, 10),
        type: '지출',
        category: '',
        amount: '',
        description: '',
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/api/transactions');
                setTransaction(response.data);
            } catch (error) {
                console.error("불러오는데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTransactions();
    }, []);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/api/transactions', formData);
            setTransaction([response.data, ...transaction]);
            setFormData({
                date: new Date().toISOString().slice(0, 10),
                type: '지출',
                category: '',
                amount: '',
                description: '',
            });
        } catch (error) {
            console.error("거래 내역 추가 실패: ", error);
            alert("내역 추가에 실패했습니다.");
        }
    }

    if(loading) {
        return(
            <Container maxWidth="md" sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        )
    }

    return(
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight={ 600 } sx={{ mb: 4 }}>
                    가계부
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                    <Stack direction="row" spacing={ 2 } alignItems="center">
                        <TextField
                            name="date"
                            label="날짜"
                            type="date"
                            value={ formData.date }
                            onChange={ handleFormChange }
                            InputLabelProps={{ shrink: true }}
                            size="small"
                        />
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <InputLabel>수입/지출</InputLabel>
                            <Select
                                name="type"
                                value={ formData.type }
                                label="수입/지출"
                                onChange={ handleFormChange }
                            >
                                <MenuItem value="지출">지출</MenuItem>
                                <MenuItem value="수입">수입</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField name="category" label="분류" value={ formData.category } onChange={ handleFormChange } size="small" />
                        <TextField name="description" label="내용" value={ formData.description } onChange={ handleFormChange } size="small" sx={{ flexGrow: 1 }} />
                        <TextField name="amount" label="금액" type="number" value={ formData.amount } onChange={ handleFormChange } size="small" />
                        <Button type="submit" variant="contained">추가</Button>
                    </Stack>
                </Box>
                <TableContainer component={ Paper } elevation={ 0 } sx={{ mt: 3 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '15%' }}>날짜</TableCell>
                                <TableCell sx={{ width: '15%' }}>분류</TableCell>
                                <TableCell>내용</TableCell>
                                <TableCell sx={{ width: '15%' }}>금액</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { transaction.length > 0 ? (
                                transaction.map((tr) => (
                                    <TableRow key={ tr.id }>
                                        <TableCell>{ tr.date }</TableCell>
                                        <TableCell>{ tr.category }</TableCell>
                                        <TableCell>{ tr.description }</TableCell>
                                        <TableCell align="right" sx={{ color: tr.type === '지출' ? 'error.main' : 'primary.main', fontWeight: 'bold' }}>
                                            {tr.type === '지출' ? '-' : '+'}
                                            {tr.amount.toLocaleString()}원
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                                        거래 내역이 없습니다.
                                    </TableCell>
                                </TableRow>
                            ) }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    )
}

export default AccountBook;