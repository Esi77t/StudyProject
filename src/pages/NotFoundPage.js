import { Container, Typography } from "@mui/material";

const NotFoundPage = () => {
    return(
        <Container>
            <Typography variant="h4" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }} fontWeight={ 600 }>
                페이지를 찾을 수 없습니다.
            </Typography>
        </Container>
    )
}

export default NotFoundPage;