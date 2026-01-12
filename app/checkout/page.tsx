'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Navbar } from '@/components/Navbar';
import { SlideProvider } from '@/contexts/SlideContext';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Lock, CreditCard, Truck, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const router = useRouter();
    const [step, setStep] = useState<'information' | 'shipping' | 'payment'>('information');
    const [formData, setFormData] = useState({
        // Contact Information
        email: '',
        phone: '',

        // Shipping Address
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',

        // Payment
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',

        // Order Notes
        orderNotes: '',
    });

    const formatPrice = (price: number) => {
        return `₹${price.toLocaleString()}`;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Here you would integrate with a payment gateway
        // For now, we'll simulate a successful order
        alert('Order placed successfully! (This is a demo)');
        clearCart();
        router.push('/');
    };

    if (cart.items.length === 0) {
        return (
            <SlideProvider>
                <Navbar />
                <main className="min-h-screen bg-gray-50 pt-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                        <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                        <h1 className="font-serif text-4xl font-bold mb-4">Your cart is empty</h1>
                        <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
                        <Link
                            href="/products/category/miniature-temples"
                            className="inline-block bg-black text-white px-8 py-4 hover:bg-gray-900 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </main>
            </SlideProvider>
        );
    }

    return (
        <SlideProvider>
            <Navbar />
            <main className="min-h-screen bg-gray-50 pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href="/cart"
                            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Cart
                        </Link>
                        <h1 className="font-serif text-5xl md:text-6xl font-bold">Checkout</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Checkout Form */}
                        <div>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Contact Information */}
                                <div className="bg-white border border-gray-200 p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            1
                                        </div>
                                        <h2 className="font-serif text-2xl font-bold">Contact Information</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                placeholder="your@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                placeholder="+91 1234567890"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="bg-white border border-gray-200 p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            2
                                        </div>
                                        <h2 className="font-serif text-2xl font-bold">Shipping Address</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                                                    First Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                                                    Last Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    required
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="address" className="block text-sm font-medium mb-2">
                                                Address *
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                required
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                placeholder="Street address"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="apartment" className="block text-sm font-medium mb-2">
                                                Apartment, Suite, etc. (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                id="apartment"
                                                name="apartment"
                                                value={formData.apartment}
                                                onChange={handleInputChange}
                                                className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium mb-2">
                                                    City *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    required
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="state" className="block text-sm font-medium mb-2">
                                                    State *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="state"
                                                    name="state"
                                                    required
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="pincode" className="block text-sm font-medium mb-2">
                                                    PIN Code *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="pincode"
                                                    name="pincode"
                                                    required
                                                    value={formData.pincode}
                                                    onChange={handleInputChange}
                                                    className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                    placeholder="110001"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium mb-2">
                                                    Country *
                                                </label>
                                                <select
                                                    id="country"
                                                    name="country"
                                                    required
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                >
                                                    <option value="India">India</option>
                                                    <option value="USA">United States</option>
                                                    <option value="UK">United Kingdom</option>
                                                    <option value="Canada">Canada</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="bg-white border border-gray-200 p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            3
                                        </div>
                                        <h2 className="font-serif text-2xl font-bold">Payment Method</h2>
                                        <Lock className="w-5 h-5 text-gray-400 ml-auto" />
                                    </div>

                                    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 text-sm text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <Lock className="w-4 h-4" />
                                            All transactions are secure and encrypted
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                                                Card Number *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    name="cardNumber"
                                                    required
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full border-2 border-gray-200 px-4 py-3 pr-12 focus:border-black focus:outline-none transition-colors"
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength={19}
                                                />
                                                <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                                                Cardholder Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="cardName"
                                                name="cardName"
                                                required
                                                value={formData.cardName}
                                                onChange={handleInputChange}
                                                className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                placeholder="Name on card"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                                                    Expiry Date *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="expiryDate"
                                                    name="expiryDate"
                                                    required
                                                    value={formData.expiryDate}
                                                    onChange={handleInputChange}
                                                    className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                                                    CVV *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cvv"
                                                    name="cvv"
                                                    required
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors"
                                                    placeholder="123"
                                                    maxLength={4}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Notes */}
                                <div className="bg-white border border-gray-200 p-8">
                                    <h3 className="font-serif text-xl font-bold mb-4">Order Notes (Optional)</h3>
                                    <textarea
                                        id="orderNotes"
                                        name="orderNotes"
                                        value={formData.orderNotes}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full border-2 border-gray-200 px-4 py-3 focus:border-black focus:outline-none transition-colors resize-none"
                                        placeholder="Any special instructions for your order..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-4 px-6 text-lg font-light tracking-wide hover:bg-gray-900 transition-colors duration-200"
                                >
                                    Complete Order
                                </button>

                                <p className="text-xs text-center text-gray-500">
                                    By completing your order, you agree to our{' '}
                                    <Link href="/terms" className="underline hover:no-underline">
                                        Terms & Conditions
                                    </Link>
                                </p>
                            </form>
                        </div>

                        {/* Order Summary - Sticky */}
                        <div>
                            <div className="bg-white border border-gray-200 p-8 sticky top-32">
                                <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>

                                {/* Cart Items */}
                                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                                    {cart.items.map(item => (
                                        <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                                            <div className="relative w-20 h-20 bg-gray-100 flex-shrink-0">
                                                <Image
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                                    {item.quantity}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-sm mb-1">{item.productName}</h3>
                                                {Object.keys(item.customizations).length > 0 && (
                                                    <p className="text-xs text-gray-500">
                                                        {Object.values(item.customizations).map(c => c.variantName).join(', ')}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-sm font-medium">
                                                {formatPrice(item.totalPrice)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pricing Breakdown */}
                                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span>{formatPrice(cart.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tax (18% GST)</span>
                                        <span>{formatPrice(Math.round(cart.subtotal * 0.18))}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-baseline mb-6">
                                    <span className="text-lg font-medium">Total</span>
                                    <span className="font-serif text-3xl font-bold">
                                        {formatPrice(Math.round(cart.subtotal * 1.18))}
                                    </span>
                                </div>

                                {/* Trust Badges */}
                                <div className="space-y-2 text-xs text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        <span>Secure SSL encrypted payment</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-4 h-4" />
                                        <span>Free shipping on all orders</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Package className="w-4 h-4" />
                                        <span>Museum-quality protective packaging</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </SlideProvider>
    );
}
