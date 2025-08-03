import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    min_stock_level: number;
    status: string;
    category: {
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    products: PaginatedProducts;
    categories: Category[];
    filters: {
        search?: string;
        category?: string;
        status?: string;
        low_stock?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/products' },
];

export default function ProductsIndex({ products, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');
    const [status, setStatus] = useState(filters.status || '');
    const [lowStock, setLowStock] = useState(filters.low_stock || '');

    const handleSearch = () => {
        router.get(route('products.index'), {
            search: search || undefined,
            category: categoryFilter || undefined,
            status: status || undefined,
            low_stock: lowStock || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setCategoryFilter('');
        setStatus('');
        setLowStock('');
        router.get(route('products.index'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            📦 Inventory Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Track and manage your product inventory
                        </p>
                    </div>
                    <Link
                        href={route('products.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        ➕ Add Product
                    </Link>
                </div>

                {/* Filters */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-64">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <input
                                type="checkbox"
                                checked={lowStock === '1'}
                                onChange={(e) => setLowStock(e.target.checked ? '1' : '')}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            Low Stock Only
                        </label>
                        <button
                            onClick={handleSearch}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                        >
                            🔍 Search
                        </button>
                        <button
                            onClick={clearFilters}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                {/* Product List */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {products.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Product</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">SKU</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Category</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Price</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Stock</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Status</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.data.map((product) => (
                                            <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    {product.name}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono">
                                                    {product.sku}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                    {product.category.name}
                                                </td>
                                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                                                    ${Number(product.price).toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`font-medium ${
                                                            product.quantity <= product.min_stock_level 
                                                                ? 'text-red-600 dark:text-red-400' 
                                                                : 'text-gray-900 dark:text-white'
                                                        }`}>
                                                            {product.quantity}
                                                        </span>
                                                        {product.quantity <= product.min_stock_level && (
                                                            <span className="text-red-500">⚠️</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        product.status === 'active' 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                                    }`}>
                                                        {product.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route('products.show', product.id)}
                                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('products.edit', product.id)}
                                                            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            {products.last_page > 1 && (
                                <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3 dark:border-gray-600">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Showing {((products.current_page - 1) * products.per_page) + 1} to {Math.min(products.current_page * products.per_page, products.total)} of {products.total} results
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {products.links.map((link, index) => (
                                            link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-1 text-sm rounded ${
                                                        link.active 
                                                            ? 'bg-blue-600 text-white' 
                                                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 text-sm text-gray-400 dark:text-gray-600"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-12 text-center">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No products found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Get started by adding your first product.
                            </p>
                            <Link
                                href={route('products.create')}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                            >
                                ➕ Add Product
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}