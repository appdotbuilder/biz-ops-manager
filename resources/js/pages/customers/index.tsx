import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    status: string;
    created_at: string;
}

interface PaginatedCustomers {
    data: Customer[];
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
    customers: PaginatedCustomers;
    filters: {
        search?: string;
        status?: string;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Customers', href: '/customers' },
];

export default function CustomersIndex({ customers, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = () => {
        router.get(route('customers.index'), {
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
        router.get(route('customers.index'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            👥 Customers
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Manage your customer database
                        </p>
                    </div>
                    <Link
                        href={route('customers.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        ➕ Add Customer
                    </Link>
                </div>

                {/* Filters */}
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-64">
                            <input
                                type="text"
                                placeholder="Search customers..."
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
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
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

                {/* Customer List */}
                <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    {customers.data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Name</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Email</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Phone</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Company</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Status</th>
                                            <th className="px-6 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers.data.map((customer) => (
                                            <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    {customer.name}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                    {customer.email}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                    {customer.phone || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                    {customer.company || '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        customer.status === 'active' 
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                                    }`}>
                                                        {customer.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={route('customers.show', customer.id)}
                                                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('customers.edit', customer.id)}
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
                            {customers.last_page > 1 && (
                                <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3 dark:border-gray-600">
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Showing {((customers.current_page - 1) * customers.per_page) + 1} to {Math.min(customers.current_page * customers.per_page, customers.total)} of {customers.total} results
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {customers.links.map((link, index) => (
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
                            <div className="text-6xl mb-4">👥</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No customers found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Get started by adding your first customer.
                            </p>
                            <Link
                                href={route('customers.create')}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                            >
                                ➕ Add Customer
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}