'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { SlideProvider } from '@/contexts/SlideContext';

interface Order {
    id: string;
    order_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string | null;
    customer_address?: any;
    items: any[];
    total: number;
    status: string;
    payment_method?: string;
    payment_status?: string;
    razorpay_order_id?: string | null;
    razorpay_payment_id?: string | null;
    created_at: string;
}

interface CustomRequest {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    project_description: string;
    budget_range: string | null;
    timeline: string | null;
    status: string;
    created_at: string;
}

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    status: string;
    created_at: string;
}

export default function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'orders' | 'custom' | 'contact'>('orders');
    const [orders, setOrders] = useState<Order[]>([]);
    const [customRequests, setCustomRequests] = useState<CustomRequest[]>([]);
    const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'amount'>('newest');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Check for existing session on mount
    useEffect(() => {
        const adminAuth = sessionStorage.getItem('admin_authenticated');
        if (adminAuth === 'true') {
            setIsAuthenticated(true);
            fetchAllData();
        }
    }, []);

    // Sort orders when sortBy changes
    useEffect(() => {
        if (orders.length > 0) {
            const sorted = [...orders].sort((a, b) => {
                if (sortBy === 'newest') {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                } else if (sortBy === 'oldest') {
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                } else {
                    return b.total - a.total;
                }
            });
            setOrders(sorted);
        }
    }, [sortBy]);

    const handleLogin = () => {
        if (password === 'jaygehlot20053layeredadmin//200590()') {
            setIsAuthenticated(true);
            setError('');
            // Store in session storage
            sessionStorage.setItem('admin_authenticated', 'true');
            // Set secure cookie
            document.cookie = 'admin_authenticated=true; path=/; SameSite=Strict; Secure';
            fetchAllData();
        } else {
            setError('Invalid password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_authenticated');
        document.cookie = 'admin_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    };

    const fetchAllData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchOrders(),
                fetchCustomRequests(),
                fetchContactSubmissions()
            ]);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(`/api/orders?password=jaygehlot20053layeredadmin//200590()`);
            const data = await response.json();
            if (data.orders) {
                setOrders(data.orders);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const fetchCustomRequests = async () => {
        try {
            const response = await fetch(`/api/custom-requests?password=jaygehlot20053layeredadmin//200590()`);
            const data = await response.json();
            if (data.requests) {
                setCustomRequests(data.requests);
            }
        } catch (err) {
            console.error('Error fetching custom requests:', err);
        }
    };

    const fetchContactSubmissions = async () => {
        try {
            const response = await fetch(`/api/contact?password=jaygehlot20053layeredadmin//200590()`);
            const data = await response.json();
            if (data.submissions) {
                setContactSubmissions(data.submissions);
            }
        } catch (err) {
            console.error('Error fetching contact submissions:', err);
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            const response = await fetch('/api/orders', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId,
                    status: newStatus,
                    adminPassword: 'jaygehlot20053layeredadmin//200590()'
                })
            });
            if (response.ok) {
                // Refetch to get updated data from database
                await fetchOrders();
            }
        } catch (err) {
            console.error('Error updating order:', err);
        }
    };

    const updateCustomRequestStatus = async (requestId: string, newStatus: string) => {
        try {
            const response = await fetch('/api/custom-requests', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    requestId,
                    status: newStatus,
                    adminPassword: 'jaygehlot20053layeredadmin//200590()'
                })
            });
            if (response.ok) {
                fetchCustomRequests();
            }
        } catch (err) {
            console.error('Error updating custom request:', err);
        }
    };

    const updateContactStatus = async (submissionId: string, newStatus: string) => {
        try {
            const response = await fetch('/api/contact', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    submissionId,
                    status: newStatus,
                    adminPassword: 'jaygehlot20053layeredadmin//200590()'
                })
            });
            if (response.ok) {
                fetchContactSubmissions();
            }
        } catch (err) {
            console.error('Error updating contact submission:', err);
        }
    };

    const deleteOrder = async (orderId: string) => {
        if (!confirm('Are you sure you want to delete this order?')) return;

        try {
            const response = await fetch(`/api/orders?orderId=${orderId}&password=jaygehlot20053layeredadmin//200590()`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchOrders();
            }
        } catch (err) {
            console.error('Error deleting order:', err);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    if (!isAuthenticated) {
        return (
            <SlideProvider>
                <Navbar />
                <main className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center px-4">
                    <div className="max-w-md w-full bg-white border border-gray-200 p-8">
                        <h1 className="font-serif text-4xl font-bold mb-8 text-center">Admin Panel</h1>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                    className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                                    placeholder="Enter admin password"
                                />
                            </div>
                            {error && (
                                <div className="text-red-600 text-sm">{error}</div>
                            )}
                            <button
                                onClick={handleLogin}
                                className="w-full bg-black text-white py-3 px-6 hover:bg-gray-900 transition-colors"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </main>
            </SlideProvider>
        );
    }

    return (
        <SlideProvider>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex justify-between items-center">
                        <h1 className="font-serif text-5xl font-bold">Admin Panel</h1>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-gray-600 hover:text-black"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="mb-8 border-b border-gray-200">
                        <div className="flex gap-8">
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`pb-4 border-b-2 transition-colors ${activeTab === 'orders'
                                    ? 'border-black text-black font-medium'
                                    : 'border-transparent text-gray-500 hover:text-black'
                                    }`}
                            >
                                Orders ({orders.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('custom')}
                                className={`pb-4 border-b-2 transition-colors ${activeTab === 'custom'
                                    ? 'border-black text-black font-medium'
                                    : 'border-transparent text-gray-500 hover:text-black'
                                    }`}
                            >
                                Custom Requests ({customRequests.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('contact')}
                                className={`pb-4 border-b-2 transition-colors ${activeTab === 'contact'
                                    ? 'border-black text-black font-medium'
                                    : 'border-transparent text-gray-500 hover:text-black'
                                    }`}
                            >
                                Contact ({contactSubmissions.length})
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-16">
                            <div className="text-xl text-gray-600">Loading...</div>
                        </div>
                    ) : (
                        <>
                            {/* Orders Tab */}
                            {activeTab === 'orders' && (
                                <div className="space-y-4">
                                    {/* Sort Controls */}
                                    <div className="flex justify-end gap-2 mb-4">
                                        <label className="text-sm text-gray-600">Sort by:</label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as any)}
                                            className="border border-gray-300 px-3 py-1 text-sm"
                                        >
                                            <option value="newest">Newest First</option>
                                            <option value="oldest">Oldest First</option>
                                            <option value="amount">Highest Amount</option>
                                        </select>
                                    </div>

                                    {orders.length === 0 ? (
                                        <div className="bg-white border border-gray-200 p-8 text-center text-gray-600">
                                            {filterStatus === 'all' ? 'No orders yet' : `No ${filterStatus} orders`}
                                        </div>
                                    ) : (
                                        orders.filter(order => filterStatus === 'all' || order.status === filterStatus).map((order) => (
                                            <div key={order.id} className="bg-white border border-gray-200 p-6">
                                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                    <div>
                                                        <div className="text-sm text-gray-500">Order Number</div>
                                                        <div className="font-bold">{order.order_number}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Customer</div>
                                                        <div className="font-medium">{order.customer_name}</div>
                                                        <div className="text-sm text-gray-600 flex items-center gap-2">
                                                            {order.customer_email}
                                                            <button
                                                                onClick={() => copyToClipboard(order.customer_email)}
                                                                className="text-blue-600 hover:text-blue-800"
                                                                title="Copy email"
                                                            >
                                                                📋
                                                            </button>
                                                        </div>
                                                        {order.customer_phone && (
                                                            <div className="text-sm text-gray-600 flex items-center gap-2">
                                                                {order.customer_phone}
                                                                <button
                                                                    onClick={() => copyToClipboard(order.customer_phone || '')}
                                                                    className="text-blue-600 hover:text-blue-800"
                                                                    title="Copy phone"
                                                                >
                                                                    📋
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Total</div>
                                                        <div className="font-bold text-xl">₹{order.total.toLocaleString()}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Date</div>
                                                        <div className="text-sm">{new Date(order.created_at).toLocaleDateString()}</div>
                                                    </div>
                                                </div>

                                                {/* Shipping Address */}
                                                {order.customer_address && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                                                            Shipping Address:
                                                            <button
                                                                onClick={() => {
                                                                    const fullAddress = `${order.customer_address.address}${order.customer_address.apartment ? ', ' + order.customer_address.apartment : ''}, ${order.customer_address.city}, ${order.customer_address.state} ${order.customer_address.pincode}, ${order.customer_address.country}`;
                                                                    copyToClipboard(fullAddress);
                                                                }}
                                                                className="text-blue-600 hover:text-blue-800"
                                                                title="Copy address"
                                                            >
                                                                📋
                                                            </button>
                                                        </div>
                                                        <div className="text-sm">
                                                            {order.customer_address.address}
                                                            {order.customer_address.apartment && `, ${order.customer_address.apartment}`}
                                                            <br />
                                                            {order.customer_address.city}, {order.customer_address.state} {order.customer_address.pincode}
                                                            <br />
                                                            {order.customer_address.country}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <div className="text-sm text-gray-500 mb-2">Items:</div>
                                                    {order.items.map((item: any, index: number) => (
                                                        <div key={index} className="text-sm mb-1">
                                                            {item.productName} × {item.quantity} - ₹{item.totalPrice.toLocaleString()}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Payment Information */}
                                                {order.payment_method && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            <div>
                                                                <div className="text-sm text-gray-500">Payment Method</div>
                                                                <div className="font-medium capitalize">
                                                                    {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="text-sm text-gray-500">Payment Status</div>
                                                                <div className="font-medium">
                                                                    <span className={`px-2 py-1 text-xs rounded ${order.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                        order.payment_status === 'failed' ? 'bg-red-100 text-red-800' :
                                                                            'bg-yellow-100 text-yellow-800'
                                                                        }`}>
                                                                        {order.payment_status || 'pending'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {order.razorpay_payment_id && (
                                                                <div>
                                                                    <div className="text-sm text-gray-500">Razorpay Payment ID</div>
                                                                    <div className="text-sm font-mono flex items-center gap-2">
                                                                        {order.razorpay_payment_id}
                                                                        <button
                                                                            onClick={() => copyToClipboard(order.razorpay_payment_id || '')}
                                                                            className="text-blue-600 hover:text-blue-800"
                                                                            title="Copy payment ID"
                                                                        >
                                                                            📋
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="mt-4 flex items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <label className="text-sm text-gray-600">Status:</label>
                                                        <select
                                                            value={order.status}
                                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                            className="border border-gray-300 px-3 py-1 text-sm"
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="processing">Processing</option>
                                                            <option value="shipped">Shipped</option>
                                                            <option value="delivered">Delivered</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteOrder(order.id)}
                                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Custom Requests Tab */}
                            {activeTab === 'custom' && (
                                <div className="space-y-4">
                                    {customRequests.length === 0 ? (
                                        <div className="bg-white border border-gray-200 p-8 text-center text-gray-600">
                                            No custom requests yet
                                        </div>
                                    ) : (
                                        customRequests.map((request) => (
                                            <div key={request.id} className="bg-white border border-gray-200 p-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <div className="text-sm text-gray-500">Name</div>
                                                        <div className="font-bold">{request.name}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Email</div>
                                                        <div className="font-medium">{request.email}</div>
                                                    </div>
                                                </div>
                                                <div className="mb-4">
                                                    <div className="text-sm text-gray-500 mb-1">Project Description</div>
                                                    <div className="text-sm">{request.project_description}</div>
                                                </div>
                                                {request.budget_range && (
                                                    <div className="text-sm mb-2">
                                                        <span className="text-gray-500">Budget:</span> {request.budget_range}
                                                    </div>
                                                )}
                                                {request.timeline && (
                                                    <div className="text-sm mb-4">
                                                        <span className="text-gray-500">Timeline:</span> {request.timeline}
                                                    </div>
                                                )}
                                                <div className="mt-4 flex items-center gap-4">
                                                    <label className="text-sm text-gray-600">Status:</label>
                                                    <select
                                                        value={request.status}
                                                        onChange={(e) => updateCustomRequestStatus(request.id, e.target.value)}
                                                        className="border border-gray-300 px-3 py-1 text-sm"
                                                    >
                                                        <option value="new">New</option>
                                                        <option value="reviewing">Reviewing</option>
                                                        <option value="quoted">Quoted</option>
                                                        <option value="accepted">Accepted</option>
                                                        <option value="rejected">Rejected</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(request.created_at).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Contact Submissions Tab */}
                            {activeTab === 'contact' && (
                                <div className="space-y-4">
                                    {contactSubmissions.length === 0 ? (
                                        <div className="bg-white border border-gray-200 p-8 text-center text-gray-600">
                                            No contact submissions yet
                                        </div>
                                    ) : (
                                        contactSubmissions.map((submission) => (
                                            <div key={submission.id} className="bg-white border border-gray-200 p-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <div className="text-sm text-gray-500">Name</div>
                                                        <div className="font-bold">{submission.name}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm text-gray-500">Email</div>
                                                        <div className="font-medium">{submission.email}</div>
                                                    </div>
                                                </div>
                                                {submission.subject && (
                                                    <div className="mb-2">
                                                        <div className="text-sm text-gray-500">Subject</div>
                                                        <div className="font-medium">{submission.subject}</div>
                                                    </div>
                                                )}
                                                <div className="mb-4">
                                                    <div className="text-sm text-gray-500 mb-1">Message</div>
                                                    <div className="text-sm whitespace-pre-wrap">{submission.message}</div>
                                                </div>
                                                <div className="mt-4 flex items-center gap-4">
                                                    <label className="text-sm text-gray-600">Status:</label>
                                                    <select
                                                        value={submission.status}
                                                        onChange={(e) => updateContactStatus(submission.id, e.target.value)}
                                                        className="border border-gray-300 px-3 py-1 text-sm"
                                                    >
                                                        <option value="unread">Unread</option>
                                                        <option value="read">Read</option>
                                                        <option value="replied">Replied</option>
                                                        <option value="resolved">Resolved</option>
                                                    </select>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(submission.created_at).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </SlideProvider>
    );
}
