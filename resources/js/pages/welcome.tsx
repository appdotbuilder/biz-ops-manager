import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Business Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-800 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-200">
                <header className="mb-8 w-full max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                                <span className="text-xl font-bold">📊</span>
                            </div>
                            <span className="text-xl font-semibold">BizManager</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-white/50 dark:text-gray-300 dark:hover:bg-gray-800/50"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="w-full max-w-6xl">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            🚀 Complete Business Management Solution
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Streamline your business operations with our all-in-one platform. Manage inventory, track customers, and analyze sales performance - all in one beautiful, intuitive interface.
                        </p>
                        {!auth.user && (
                            <div className="flex gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Start Free Trial
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-8 py-3 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="text-4xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Inventory Management</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>• Track stock levels in real-time</li>
                                <li>• Low stock alerts</li>
                                <li>• Product categorization</li>
                                <li>• SKU management</li>
                                <li>• Automated reorder points</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Customer Management</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>• Complete customer profiles</li>
                                <li>• Purchase history tracking</li>
                                <li>• Contact management</li>
                                <li>• Customer segmentation</li>
                                <li>• Notes and interactions</li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="text-4xl mb-4">📈</div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Sales Reporting</h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>• Real-time sales tracking</li>
                                <li>• Revenue analytics</li>
                                <li>• Performance metrics</li>
                                <li>• Monthly/yearly reports</li>
                                <li>• Profit margin analysis</li>
                            </ul>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-16">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
                            🎯 Powerful Dashboard at Your Fingertips
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="bg-blue-50 rounded-lg p-4 text-center dark:bg-blue-900/20">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">125</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Active Customers</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 text-center dark:bg-green-900/20">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">$15,420</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</div>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4 text-center dark:bg-purple-900/20">
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">89</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Products in Stock</div>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-4 text-center dark:bg-orange-900/20">
                                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">12</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Sales Today</div>
                            </div>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                            ✨ Why Choose BizManager?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="text-left">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">🎨 Beautiful & Intuitive</h3>
                                <p className="text-gray-600 dark:text-gray-300">Clean, modern interface designed for efficiency and ease of use.</p>
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">⚡ Lightning Fast</h3>
                                <p className="text-gray-600 dark:text-gray-300">Built with modern technology for speed and reliability.</p>
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">📱 Mobile Ready</h3>
                                <p className="text-gray-600 dark:text-gray-300">Fully responsive design works perfectly on all devices.</p>
                            </div>
                            <div className="text-left">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">🔒 Secure & Reliable</h3>
                                <p className="text-gray-600 dark:text-gray-300">Enterprise-grade security to protect your business data.</p>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="mt-16 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>Ready to transform your business? 
                        <Link href={route('register')} className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 ml-1">
                            Get started today!
                        </Link>
                    </p>
                </footer>
            </div>
        </>
    );
}