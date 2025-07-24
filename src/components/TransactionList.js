import { Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TransactionList = ({ transactions, onDelete }) => {
    return(
        <>
            <TableContainer component={Paper} elevation={0} sx={{ display: { xs: 'none', md: 'block' }, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '20%' }}>날짜</TableCell>
                            <TableCell sx={{ width: '20%' }}>분류</TableCell>
                            <TableCell>내용</TableCell>
                            <TableCell align="right" sx={{ width: '20%', pr: 1 }}>금액</TableCell>
                            <TableCell align="center" sx={{ width: '10%', px: 1 }}>삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((tr) => (
                            <TableRow key={tr.id}>
                                <TableCell>{tr.date}</TableCell>
                                <TableCell>{tr.category}</TableCell>
                                <TableCell>{tr.description}</TableCell>
                                <TableCell align="right" sx={{ color: tr.type === '지출' ? 'error.main' : 'primary.main', fontWeight: 'bold', pr: 1 }}>
                                    {tr.type === '지출' ? '-' : '+'} {tr.amount.toLocaleString()}원
                                </TableCell>
                                <TableCell align="center" sx={{ px: 1 }}>
                                    <IconButton size="small" onClick={() => onDelete(tr.id)}><DeleteIcon fontSize="inherit" /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                {transactions.map((tr) => (
                    <Paper key={tr.id} variant="outlined" sx={{ p: 2, mb: 1.5, display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body2" color="text.secondary">{tr.date} &middot; {tr.category}</Typography>
                            <Typography fontWeight="medium">{tr.description}</Typography>
                            <Typography sx={{ color: tr.type === '지출' ? 'error.main' : 'primary.main', fontWeight: 'bold' }}>
                                {tr.type === '지출' ? '-' : '+'} {tr.amount.toLocaleString()}원
                            </Typography>
                        </Box>
                        <IconButton size="small" onClick={() => onDelete(tr.id)}><DeleteIcon fontSize="small" /></IconButton>
                    </Paper>
                ))}
            </Box>
            {transactions.length === 0 && (
                <Paper variant="outlined" sx={{ py: 5, textAlign: 'center' }}>
                    <Typography>거래 내역이 없습니다.</Typography>
                </Paper>
            )}
        </>
    )
}

export default TransactionList;