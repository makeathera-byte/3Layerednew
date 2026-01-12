// Cart Type Definitions

export interface CartItem {
    id: string; // Unique cart item ID
    productId: string;
    productSlug: string;
    productName: string;
    productImage: string;
    basePrice: number;
    quantity: number;
    customizations: {
        [optionId: string]: {
            variantId: string;
            variantName: string;
            priceModifier: number;
        };
    };
    totalPrice: number; // Base price + all customizations * quantity
    currency: string;
    displayFormat: string;
}

export interface Cart {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    currency: string;
}

export interface CartContextType {
    cart: Cart;
    addToCart: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}
