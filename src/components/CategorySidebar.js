import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const CategorySidebar = ({ categories, selectedCategoryId, onSelectCategory }) => {
    return (
        <List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={selectedCategoryId === null}
                        onClick={() => onSelectCategory(null)}
                        sx={{
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
        </List>
    )
}

export default CategorySidebar;