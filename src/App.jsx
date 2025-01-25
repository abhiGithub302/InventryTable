import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InventoryTable from './components/InventoryTable';
import ItemForm from './components/ItemForm';
import './index.css';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', quantity: 5, price: 99999 },
    { id: 2, name: 'Desk Chair', category: 'Furniture', quantity: 15, price: 15999 },
    { id: 3, name: 'Mouse', category: 'Electronics', quantity: 8, price: 3000 },
    { id: 4, name: 'Notebook', category: 'Office Supplies', quantity: 50, price: 999 },
    { id: 5, name: 'Textbook', category: 'Books', quantity: 20, price: 599 },
    { id: 6, name: 'T-shirt', category: 'Clothing', quantity: 30, price: 1899 },
    { id: 7, name: 'Blender', category: 'Kitchen', quantity: 10, price: 4999 },
    { id: 8, name: 'Basketball', category: 'Sports Equipment', quantity: 12, price: 3599 },
    { id: 9, name: 'Hammer', category: 'Tools', quantity: 25, price: 899 },
    { id: 10, name: 'Miscellaneous Box', category: 'Other', quantity: 5, price: 3999 },
    { id: 11, name: 'Monitor', category: 'Electronics', quantity: 7, price: 17000 },
    { id: 12, name: 'Standing Desk', category: 'Furniture', quantity: 10, price: 39999 },
    { id: 13, name: 'Markers', category: 'Office Supplies', quantity: 40, price: 489 },
    { id: 14, name: 'Cookbook', category: 'Books', quantity: 15, price: 1799 },
    { id: 15, name: 'Jeans', category: 'Clothing', quantity: 20, price: 12999 },
    { id: 16, name: 'Microwave Oven', category: 'Kitchen', quantity: 4, price: 499 },
    { id: 17, name: 'Soccer Ball', category: 'Sports Equipment', quantity: 9, price: 2400 },
    { id: 18, name: 'Screwdriver Set', category: 'Tools', quantity: 18, price: 999 },
    { id: 19, name: 'Gift Card', category: 'Other', quantity: 100, price: 1999 },
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'quantity', direction: 'desc' });

  const handleAddItem = (newItem) => {
    setItems([...items, { ...newItem, id: items.length + 1 }]);
    setShowForm(false);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(items.map((item) => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setEditingItem(null);
    setShowForm(false);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
    const sortedItems = [...items].sort((a, b) => {
      if (direction === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
    setItems(sortedItems);
  };

  const filteredItems = categoryFilter
    ? items.filter((item) => item.category.toLowerCase().includes(categoryFilter.toLowerCase()))
    : items;

  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Welcome to GoveStock System</h2>
          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm transition-colors"
          >
            Add New Item
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <ItemForm
              item={editingItem}
              onSubmit={editingItem ? handleUpdateItem : handleAddItem}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
            />
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Category
            </label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
              Sort by Quantity
            </label>
            <select
              id="sort"
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onChange={(e) => {
                const [key, direction] = e.target.value.split('-');
                handleSort(key, direction);
              }}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
              <option value="quantity-desc">Highest to Lowest</option>
              <option value="quantity-asc">Lowest to Highest</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <InventoryTable
            items={filteredItems}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            onSort={handleSort}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
