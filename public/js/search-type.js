const searchQueryInput = document.getElementById('searchQuery');
const suggestionsList = document.getElementById('suggestions');

searchQueryInput.addEventListener('input', () => {
    const query = searchQueryInput.value.toLowerCase();
    if (query.length > 0) {
        // Tạo danh sách gợi ý
        const filteredTypes = types.filter(type => type.name.toLowerCase().includes(query));
        suggestionsList.innerHTML = '';
        filteredTypes.forEach(type => {
            const suggestionItem = document.createElement('li');
            suggestionItem.classList.add('px-4', 'py-2', 'cursor-pointer', 'hover:bg-gray-200');
            suggestionItem.innerHTML = type.name;
            suggestionItem.addEventListener('click', () => {
                selectedType = type;
                fetchTypeDetails(type.url);
                searchQueryInput.value = type.name;  // Hiển thị tên loại đã chọn trong ô tìm kiếm
                suggestionsList.style.display = 'none';  // Ẩn danh sách gợi ý sau khi chọn
            });
            suggestionsList.appendChild(suggestionItem);
        });
        suggestionsList.style.display = filteredTypes.length > 0 ? 'block' : 'none';
    } else {
        suggestionsList.style.display = 'none';
    }
});

// Lắng nghe sự kiện để ẩn gợi ý khi click ra ngoài
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        suggestionsList.style.display = 'none';
    }
});
