import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DashboardStats {
    totalCustomers: number;
    totalProducts: number;
    lowStockProducts: number;
    monthlyRevenue: number;
    todaysSales: number;
}

interface RecentSale {
    id: number;
    sale_number: string;
    customer: {
        name: string;
    };
    total_amount: number;
    sale_date: string;
    status: string;
}

interface Props {
    stats: DashboardStats;
    recentSales: RecentSale[];
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recentSales }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Business Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            📊 Business Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Overview of your business performance
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Customers
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats.totalCustomers}
                                </p>
                            </div>
                            <div className="text-3xl">👥</div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Products
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stats.totalProducts}
                                </p>
                            </div>
                            <div className="text-3xl">📦</div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Low Stock Items
                                </p>
                                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                    {stats.lowStockProducts}
                                </p>
                            </div>
                            <div className="text-3xl">⚠️</div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Monthly Revenue
                                </p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    ${Number(stats.monthlyRevenue).toLocaleString()}
                                </p>
                            </div>
                            <div className="text-3xl">💰</div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Today's Sales
                                </p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {stats.todaysSales}
                                </p>
                            </div>
                            <div className="text-3xl">📈</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        🚀 Quick Actions
                    </h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Link
                            href={route('customers.create')}
                            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                            <div className="text-2xl">👤</div>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    Add Customer
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Create a new customer profile
                                </p>
                            </div>
                        </Link>

                        <Link
                            href={route('products.create')}
                            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                            <div className="text-2xl">📦</div>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    Add Product
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Add new product to inventory
                                </p>
                            </div>
                        </Link>

                        <Link
                            href={route('sales.create')}
                            className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 text-left transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                            <div className="text-2xl">💳</div>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    New Sale
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Create a new sales order
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Recent Sales */}
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            📋 Recent Sales
                        </h2>
                        <Link
                            href={route('sales.index')}
                            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            View All →
                        </Link>
                    </div>
                    
                    {recentSales.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-600">
                                        <th className="text-left py-2 text-gray-600 dark:text-gray-400">Sale #</th>
                                        <th className="text-left py-2 text-gray-600 dark:text-gray-400">Customer</th>
                                        <th className="text-left py-2 text-gray-600 dark:text-gray-400">Amount</th>
                                        <th className="text-left py-2 text-gray-600 dark:text-gray-400">Date</th>
                                        <th className="text-left py-2 text-gray-600 dark:text-gray-400">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentSales.map((sale) => (
                                        <tr key={sale.id} className="border-b border-gray-100 dark:border-gray-700">
                                            <td className="py-3 font-medium text-gray-900 dark:text-white">
                                                {sale.sale_number}
                                            </td>
                                            <td className="py-3 text-gray-600 dark:text-gray-400">
                                                {sale.customer.name}
                                            </td>
                                            <td className="py-3 text-gray-900 dark:text-white">
                                                ${Number(sale.total_amount).toLocaleString()}
                                            </td>
                                            <td className="py-3 text-gray-600 dark:text-gray-400">
                                                {new Date(sale.sale_date).toLocaleDateString()}
                                            </td>
                                            <td className="py-3">
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <div className="text-4xl mb-2">📄</div>
                            <p>No recent sales to display</p>
                            <Link
                                href={route('sales.create')}
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm mt-2 inline-block"
                            >
                                Create your first sale →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Management Links */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Link
                        href={route('customers.index')}
                        className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <div className="text-4xl mb-2">👥</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            Manage Customers
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            View and manage customer database
                        </p>
                    </Link>

                    <Link
                        href={route('products.index')}
                        className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <div className="text-4xl mb-2">📦</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            Inventory Management
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Track products and stock levels
                        </p>
                    </Link>

                    <Link
                        href={route('sales.index')}
                        className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <div className="text-4xl mb-2">📈</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            Sales Reports
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Analyze sales performance and trends
                        </p>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}