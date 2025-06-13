// Updated arrays with prices included
const breakfastMenu = ['Pancakes - $12', 'Eggs Benedict - $22.99', 'Oatmeal - $21.99', 'Frittata - $15'];
const mainCourseMenu = ['Steak - $35', 'Pasta - $25', 'Burger - $18', 'Salmon - $30'];
const dessertMenu = ['Cake - $10', 'Ice Cream - $8', 'Pudding - $9', 'Fruit Salad - $7'];

// Use map() for breakfastMenu
const breakfastMenuItemsHTML = breakfastMenu
  .map((item, index) => `<p>Item ${index + 1}: ${item}</p>`)
  .join('');
document.getElementById('breakfastMenuItems').innerHTML = breakfastMenuItemsHTML;

// Use forEach() for mainCourseMenu
let mainCourseItem = '';
mainCourseMenu.forEach((item, index) => {
  mainCourseItem += `<p>Item ${index + 1}: ${item}</p>`;
});
document.getElementById('maincourseMenuItems').innerHTML = mainCourseItem;

// Use for loop for dessertMenu
let dessertItem = '';
for (let i = 0; i < dessertMenu.length; i++) {
  dessertItem += `<p>Item ${i + 1}: ${dessertMenu[i]}</p>`;
}
document.getElementById('dessertMenuItems').innerHTML = dessertItem;
