import React from 'react';

// This is the page component that will load after a successful login redirect.
const UserFinancesPage = () => {
    return (
        // Using common Tailwind classes for a basic page layout
        <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 border-b pb-2">
                    Your Financed Data Overview
                </h1>
                <p className="text-gray-600 mt-1">
                    Welcome back! Here you can manage and view all your financial records.
                </p>
            </header>

            <main className="space-y-8">
                {/* Placeholder for Data Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DataCard title="Total Assets" value="$150,000" color="bg-blue-100 text-blue-800" />
                    <DataCard title="Monthly Income" value="$5,200" color="bg-green-100 text-green-800" />
                    <DataCard title="Monthly Expenses" value="$3,100" color="bg-red-100 text-red-800" />
                </div>

                {/* Placeholder for Transactions Table */}
                <section className="bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                    <p className="text-gray-500">
                        *This is where your table or list of transactions will be rendered after fetching data.*
                    </p>
                    <button className="mt-4 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
                        View Full History
                    </button>
                </section>
            </main>
        </div>
    );
};

// Helper component for demonstration
const DataCard = ({ title, value, color }) => (
    <div className={`p-5 rounded-xl shadow-md ${color} flex flex-col justify-between`}>
        <p className="text-sm font-medium opacity-75">{title}</p>
        <p className="text-3xl font-extrabold mt-1">{value}</p>
    </div>
);

export default UserFinancesPage;
