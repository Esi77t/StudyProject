import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { Box, Button, CircularProgress, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ExpenditureSidebar from "../components/ExpenditureSidebar";
import { DevBlogContext } from "../context/DevBlogProvider";
import { useNavigate } from "react-router-dom";

const AccountBook = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        date: new Date().toISOString().slice(0, 10),
        type: '지출',
        category: '',
        amount: '',
        description: '',
    });
    const [summaryData, setSummaryData] = useState();
    const { isLoggedIn } = useContext(DevBlogContext);
    const navigate = useNavigate();

    const fetchSummary = async () => {
        try {
            const summaryRes = await api.get('/api/transactions/summary');
            setSummaryData(summaryRes.data);
        } catch (error) {
            console.error("요약 정보 로딩 실패:", error);
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [transactionsRes, summaryRes] = await Promise.all([
                    api.get('/api/transactions'),
                    api.get('/api/transactions/summary')
                ]);
                setTransactions(transactionsRes.data);
                setSummaryData(summaryRes.data);
            } catch (error) {
                console.error("데이터를 불러오는데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, []);


    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleDelete = async (transactionId) => {
        if (window.confirm("정말로 이 내역을 삭제하시겠습니까?")) {
            try {
                await api.delete(`/api/transactions/${transactionId}`);
                setTransactions(transactions.filter(tr => tr.id !== transactionId));
                fetchSummary();
                alert("거래 내역이 삭제됐습니다.");
            } catch (error) {
                console.error("삭제 실패: ", error);
                alert("삭제 실패했습니다. 다시 시도해주세요.")
            }
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        try {
            const response = await api.post('/api/transactions', formData);
            setTransactions([response.data, ...transactions]);
            fetchSummary();
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

    if (loading || !summaryData) {
        return (
            <Container maxWidth="md" sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Container>
        )
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', pt: '10vh', px: 2, }}>
            <Box sx={{ width: '100%', maxWidth: '1200px' }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
                    가계부
                </Typography>
                <Grid container spacing={4} alignItems="flex-start">
                    <Grid item xs={12} md={8} order={{ xs: 1, md: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, }}>
                            <Paper elevation={0} component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 3 }, border: '1px solid', borderColor: 'divider' }}>
                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                                    <TextField
                                        name="date"
                                        label="날짜"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleFormChange}
                                        InputLabelProps={{ shrink: true }}
                                        size="small"
                                        sx={{ width: { xs: '100%', md: 160 } }}
                                    />
                                    <FormControl size="small" sx={{ width: { xs: '100%', md: 120 } }}>
                                        <InputLabel>수입/지출</InputLabel>
                                        <Select
                                            name="type"
                                            value={formData.type}
                                            label="수입/지출"
                                            onChange={handleFormChange}
                                        >
                                            <MenuItem value="지출">지출</MenuItem>
                                            <MenuItem value="수입">수입</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        name="category"
                                        label="분류"
                                        value={formData.category}
                                        onChange={handleFormChange}
                                        size="small"
                                        sx={{ width: { xs: '100%', md: 120 } }}
                                    />
                                    <TextField
                                        name="description"
                                        label="내용"
                                        value={formData.description}
                                        onChange={handleFormChange}
                                        size="small"
                                        sx={{ flexGrow: 1 }}
                                    />
                                    <TextField
                                        name="amount"
                                        label="금액"
                                        type="number"
                                        value={formData.amount}
                                        onChange={handleFormChange}
                                        size="small"
                                        sx={{ width: { xs: '100%', md: 120 } }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ width: { xs: '100%', md: 'auto' }, whiteSpace: 'nowrap' }}
                                    >
                                        추가
                                    </Button>
                                </Stack>
                            </Paper>
                            <TableContainer component={Paper} elevation={0} sx={{ display: { xs: 'none', md: 'block' }, border: '1px solid', borderColor: 'divider', overflowX: 'auto', maxWidth: '100%', }}>
                            <Table sx={{ minWidth: 800 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>날짜</TableCell>
                                        <TableCell>분류</TableCell>
                                        <TableCell>내용</TableCell>
                                        <TableCell align="right">금액</TableCell>
                                        <TableCell align="center">삭제</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.length > 0 ? (
                                        transactions.map((tr) => (
                                            <TableRow key={tr.id}>
                                                <TableCell>{tr.date}</TableCell>
                                                <TableCell>{tr.category}</TableCell>
                                                <TableCell>{tr.description}</TableCell>
                                                <TableCell align="right" sx={{ color: tr.type === '지출' ? 'error.main' : 'primary.main', fontWeight: 'bold' }}>
                                                    {tr.type === '지출' ? '-' : '+'} {tr.amount.toLocaleString()}원
                                                </TableCell>
                                                <TableCell align="center">
                                                    <IconButton size="small" onClick={() => handleDelete(tr.id)}>
                                                        <DeleteIcon fontSize="inherit" />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center" sx={{ py: 5 }}>거래 내역이 없습니다.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                            {transactions.length > 0 ? (
                                transactions.map(tr => (
                                    <Paper key={tr.id} variant="outlined" sx={{ p: 2, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="body2" color="text.secondary">{tr.date} &middot; {tr.category}</Typography>
                                            <Typography fontWeight="medium">{tr.description}</Typography>
                                            <Typography
                                                sx={{ color: tr.type === '지출' ? 'error.main' : 'primary.main', fontWeight: 'bold' }}
                                            >
                                                {tr.type === '지출' ? '-' : '+'} {tr.amount.toLocaleString()}원
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <IconButton size="small" onClick={() => handleDelete(tr.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </Paper>
                                ))
                            ) : (
                                <Paper variant="outlined" sx={{ py: 5, textAlign: 'center' }}>
                                    <Typography>거래 내역이 없습니다.</Typography>
                                </Paper>
                            )}
                        </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }} sx={{ position: 'sticky', top: 110 }}>
                        <Box>
                            <ExpenditureSidebar summary={summaryData} />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default AccountBook;