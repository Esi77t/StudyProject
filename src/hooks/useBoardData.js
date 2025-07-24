import { useCallback, useEffect, useState } from "react";
import api from "../api/api";

const useBoardData = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchType, setSearchType] = useState('title_content');
    const [keyword, setKeyword] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesRes = await api.get('/api/categories');
                setCategories(categoriesRes.data);
            } catch (error) {
                console.error("카테고리를 불러오는데 실패했습니다.", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (categories.length === 0) {
                    const categoriesRes = await api.get('/api/categories');
                    setCategories(categoriesRes.data);
                }

                const params = {
                    categoryId: selectedCategoryId,
                    page: currentPage - 1,
                    size: 10,
                    searchType: searchTerm.trim() ? searchType : null,
                    keyword: searchTerm.trim() || null
                };

                const postsRes = await api.get('/api/posts', { params });
                setPosts(postsRes.data.content);
                setTotalPages(postsRes.data.totalPages);
            } catch (error) {
                console.error("데이터를 불러오는데 실패했습니다.", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [selectedCategoryId, currentPage, searchTerm, searchType, categories]);

    const handleCategorySelect = useCallback((categoryId) => {
        if (selectedCategoryId !== categoryId) {
            setSelectedCategoryId(categoryId);
            setCurrentPage(1);
            setSearchTerm('');
            setKeyword('');
        }
    }, [selectedCategoryId]);

    const handleSearch = useCallback(() => {
        setCurrentPage(1);
        setSearchTerm(keyword);
    }, [keyword]);

    const handlePageChange = useCallback((event, value) => {
        setCurrentPage(value);
    }, []);

    return {
        posts,
        categories,
        selectedCategoryId,
        loading,
        currentPage,
        totalPages,
        searchType,
        keyword,
        displayTitle: categories.find(cat => cat.id === selectedCategoryId)?.name || "게시판",
        setSearchType,
        setKeyword,
        handleCategorySelect,
        handleSearch,
        handlePageChange
    };
}

export default useBoardData;