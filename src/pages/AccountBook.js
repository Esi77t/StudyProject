import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DevBlogContext } from '../context/DevBlogProvider';
import api from '../api/api';
import ExpenditureSidebar from '../components/ExpenditureSidebar';
import TransactionForm from '../components/TransactionForm';
import { Container, Typography, Box, CircularProgress, Stack } from '@mui/material';
import TransactionList from '../components/TransactionList';

const AccountBook = () => {
    const { isLoggedIn } = useContext(DevBlogContext);
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const [summaryData, setSummaryData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [transactionsRes, summaryRes] = await Promise.all([
                api.get('/api/transactions'),
                api.get('/api/transactions/summary')
            ]);
            setTransactions(transactionsRes.data);
            setSummaryData(summaryRes.data);
        } catch (error) {
            console.error("데이터 로딩 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (formData) => {
        if (!isLoggedIn) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }
        try {
            await api.post('/api/transactions', formData);
            fetchData();
        } catch (error) {
            console.error("거래 내역 추가 실패:", error);
            alert("내역 추가에 실패했습니다.");
        }
    };

    const handleDelete = async (transactionId) => {
        if (window.confirm("정말로 이 내역을 삭제하시겠습니까?")) {
            try {
                await api.delete(`/api/transactions/${transactionId}`);
                fetchData();
                alert("거래 내역이 삭제되었습니다.");
            } catch (error) {
                console.error("삭제 실패:", error);
                alert("삭제에 실패했습니다.");
            }
        }
    };

    if (loading) {
        return <Container sx={{ my: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Container>;
    }

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
                가계부
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>
                <Box sx={{ width: { xs: '100%', md: '300px' }, flexShrink: 0 }}>
                    <ExpenditureSidebar summary={summaryData} />
                </Box>
                <Box sx={{ flexGrow: 1, width: '100%' }}>
                    <Stack spacing={3}>
                        <TransactionForm onSubmit={handleSubmit} />
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
                        ) : (
                            <TransactionList transactions={transactions} onDelete={handleDelete} />
                        )}
                    </Stack>
                </Box>
            </Box>
        </Container>
    )
};

export default AccountBook;