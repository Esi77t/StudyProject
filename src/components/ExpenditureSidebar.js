import { Box, Divider, Paper, Skeleton, Typography } from "@mui/material";

const ExpenditureSidebar = ({ summary }) => {
    if(!summary || typeof summary.currentMonthTotal !== 'number' || typeof summary.lastMonthTotal !== 'number') {
        return(
            <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    월별 지출 요약
                </Typography>
                <Skeleton variant="text" width="80%" height={40} />
                <Divider sx={{ my: 2 }}/>
                <Skeleton variant="text" width="60%" height={30} />
            </Paper>
        )
    }

    const difference = summary.lastMonthTotal - summary.currentMonthTotal;

    return(
        <Paper elevation={ 0 } sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                월별 지출 요약
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">이번 달 지출</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    { summary.currentMonthTotal.toLocaleString() }원
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
                <Typography variant="body2" color="text.secondary">지난 달 지출</Typography>
                { difference >= 0 ? (
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        { difference.toLocaleString() }원 절약
                    </Typography>
                ) : (
                    <Typography variant="h6" color="error.main" sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                        { Math.abs(difference).toLocaleString() }원 추가 지출
                    </Typography>
                )}
            </Box>
        </Paper>
    );
}

export default ExpenditureSidebar;