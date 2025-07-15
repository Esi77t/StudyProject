import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom"

const PostTable = ({ posts }) => {

    const navigate = useNavigate();

    const handlePostClick = (postId) => {
        navigate(`/board/${ postId }`)
    }

    return(
        <TableContainer component={ Paper } elevation={ 0 }>
            <Table stickyHeader aria-label="post list table" sx={{ tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ width: '10%' }}>번호</TableCell>
                        <TableCell align="left" sx={{ width: '50%' }}>글 제목</TableCell>
                        <TableCell align="center" sx={{ width: '15%' }}>작성자</TableCell>
                        <TableCell align="center" sx={{ width: '10%' }}>조회수</TableCell>
                        <TableCell align="center" sx={{ width: '15%' }}>카테고리</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { posts.length > 0 ? (
                        posts.map((post) => (
                            <TableRow key={ post.id } hover onClick={() => handlePostClick(post.id)} sx={{ cursor: 'pointer' }}>
                                <TableCell align="center">{ post.id }</TableCell>
                                <TableCell align="left" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ post.title }</TableCell>
                                <TableCell align="center">{ post.author }</TableCell>
                                <TableCell align="center">{ post.views }</TableCell>
                                <TableCell align="center">{ post.categoryName }</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={ 5 } align="center" sx={{ py: 10 }}>
                                게시글이 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PostTable;