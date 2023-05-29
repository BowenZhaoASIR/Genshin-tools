const filterDropdown = document.getElementById('filter');
  // get the selected value from localStorage
  const selectedValue = localStorage.getItem('selectedFilter');
  if (selectedValue) {
    filterDropdown.value = selectedValue;
  }
  // add an event listener to save the selected value to localStorage when the dropdown changes
  filterDropdown.addEventListener('change', function() {
    localStorage.setItem('selectedFilter', this.value);
});
