import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Sale {
    id: number;
    sale_number: string;
    customer: {
        name: string;
    };
    total_amount: number;
    status: string;
    sale_date: string;
}

interface PaginatedSales {
    data: Sale[];
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
    sales: PaginatedSales;
    filters: {
        search?: string;
        status?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Sales', href: '/sales' },
];

export default function SalesIndex({ sales, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = () => {
        router.get(route('sales.index'), {
            search: search || undefined,
            status: status || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('');
        router.get(route('sales.index'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            📈 Sales Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Track and manage your sales orders
                        </p>
                    </div>
                    <Link
                        href={route('sales.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        ➕ New Sale
                    </Link>
                </div>

                {/* Filters */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-64">
                            <input
                                type="text"
                                placeholder="Search sales..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
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

                {/* Sales List */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {sales.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Sale #</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Customer</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Amount</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Date</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Status</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.data.map((sale) => (
                                            <tr key={sale.id} className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white font-mono">
                                                    {sale.sale_number}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                    {sale.customer.name}
                                                </td>
                                                <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                                                    ${Number(sale.total_amount).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                    {new Date(sale.sale_date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        sale.status === 'completed' 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                            : sale.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                                    }`}>
                                                        {sale.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route('sales.show', sale.id)}
                                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('sales.edit', sale.id)}
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
                            {sales.last_page > 1 && (
                                <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3 dark:border-gray-600">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Showing {((sales.current_page - 1) * sales.per_page) + 1} to {Math.min(sales.current_page * sales.per_page, sales.total)} of {sales.total} results
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {sales.links.map((link, index) => (
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
                            <div className="text-6xl mb-4">📈</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No sales found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Get started by creating your first sale.
                            </p>
                            <Link
                                href={route('sales.create')}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                            >
                                ➕ New Sale
                            </Link>
                        </div>
                    )}
                </div>

                {/* Summary Stats */}
                {sales.data.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                ${sales.data.filter(s => s.status === 'completed').reduce((sum, s) => sum + Number(s.total_amount), 0).toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Completed Sales</div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                {sales.data.filter(s => s.status === 'pending').length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Pending Sales</div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {sales.data.filter(s => s.status === 'cancelled').length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Cancelled Sales</div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {sales.total}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Sales</div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}