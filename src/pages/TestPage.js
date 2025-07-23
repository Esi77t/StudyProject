import { Container, Grid, Paper, Typography } from "@mui/material";

const ExpenditureSidebar = () => {
    return (
        <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2">지난 달 지출</Typography>
            <Typography 
                variant="h6" 
                color="error.main" 
                sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
            >
                111,111,111원 추가 지출
            </Typography>
        </Paper>
    );
};

// 테스트 페이지
const TestPage = () => {
    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Grid container spacing={4}>
                <Grid item md={8}>
                    <Paper sx={{ p: 2, height: 200 }}>메인 콘텐츠</Paper>
                </Grid>
                <Grid item md={4}>
                    <ExpenditureSidebar />
                </Grid>
            </Grid>
        </Container>
    );
};

export default TestPage;