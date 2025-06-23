// Very simple search for lost items (beginner style)
window.onload = function() {
    var searchInput = document.getElementById('searchInput');
    var categorySelect = document.getElementById('categorySelect');
    var searchBtn = document.getElementById('searchBtn');
    var itemCards = document.getElementsByClassName('item-card');

    function filterItems() {
        var searchText = searchInput.value.toLowerCase();
        var selectedCategory = categorySelect.value;
        for (var i = 0; i < itemCards.length; i++) {
            var card = itemCards[i];
            var title = card.getElementsByTagName('h3')[0].textContent.toLowerCase();
            var category = card.getElementsByClassName('category')[0].textContent.toLowerCase();
            if ((searchText === '' || title.indexOf(searchText) !== -1) &&
                (selectedCategory === '' || category.indexOf(selectedCategory) !== -1)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        }
    }

    searchBtn.onclick = filterItems;
};
