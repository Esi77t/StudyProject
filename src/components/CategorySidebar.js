import { List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";

const CategorySidebar = ({ categories, selectedCategoryId, onSelectCategory }) => {
    return(
        <div>
            <Typography variant="h6" sx={{ mb: 1, p: 1, fontWeight: 600 }}>
                카테고리
            </Typography>
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedCategoryId === null}
                        onClick={() => onSelectCategory(null)}
                        sx={{
                            borderRadius: 1,
                            '&.Mui-selected': {
                                backgroundColor: '#a0a0a0ff',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#7e7e7eff',
                                }
                            },
                            '&.Mui-selected .MuiListItemText-primary': {
                                color: 'white',
                                fontWeight: 'bold',
                            }
                        }}
                    >
                        <ListItemText primary="전체보기" />
                    </ListItemButton>
                </ListItem>
                {categories.map((category) => (
                    <ListItem key={category.id} disablePadding>
                        <ListItemButton
                            selected={selectedCategoryId === category.id}
                            onClick={() => onSelectCategory(category.id)}
                            sx={{
                                borderRadius: 1,
                                '&.Mui-selected': {
                                    backgroundColor: '#a0a0a0ff',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#7e7e7eff',
                                    }
                                },
                                '&.Mui-selected .MuiListItemText-primary': {
                                    color: 'white',
                                    fontWeight: 'bold',
                                }
                            }}
                        >
                            <ListItemText primary={category.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default CategorySidebar;