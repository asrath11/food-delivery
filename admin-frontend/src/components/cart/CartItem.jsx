import React from 'react';
import { API_URL } from '@/constants/config';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Heart, Trash, Minus, Plus } from 'lucide-react';

function CartItem({ cart }) {
    return (
        <div className="bg-white shadow-lg ml-10 my-10 p-10 max-w-5xl border border-gray-200">
            <h1 className="text-3xl font-bold mb-10 text-gray-900 border-b border-gray-300 pb-4">
                🛒 Your Cart
            </h1>

            <div className="space-y-8">
                {cart.map((foodItems, index) => (
                    <>
                        <div
                            key={index}
                            className="flex justify-between items-center gap-6 p-6"
                        >
                            {/* Left Section: Image + Info */}
                            <div className="flex gap-6 items-center flex-1 min-w-0">
                                {/* Product Image */}
                                <div className="w-24 h-24 rounded-xl overflow-hidden shadow">
                                    <img
                                        src={`${API_URL}/${foodItems.item.image}`}
                                        alt={foodItems.item.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex flex-col justify-between flex-1 space-y-2">
                                    <h2 className="text-lg font-semibold text-gray-900 truncate">
                                        {foodItems.item.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {foodItems.item?.desc}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-red-50 hover:text-red-500 transition-colors"
                                        >
                                            <Heart className="w-5 h-5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-red-50 hover:text-red-500 transition-colors"
                                        >
                                            <Trash className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section: Price + Quantity Controls */}
                            <div className="flex flex-col items-end justify-between gap-3 min-w-[140px]">
                                {/* Price */}
                                <h3 className="text-xl font-semibold text-green-600">
                                    ₹{foodItems.item?.price}
                                </h3>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3 bg-white rounded-full border border-gray-300 px-3 py-1 shadow-sm">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-8 h-8 hover:bg-gray-100 hover:text-red-500 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>

                                    <span className="text-base font-medium text-gray-800 min-w-[1.5rem] text-center">
                                        {foodItems.quantity}
                                    </span>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-8 h-8 hover:bg-gray-100 hover:text-green-600 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {index !== cart.length - 1 && (
                            <Separator />
                        )}
                    </>
                ))}

            </div>

        </div>
    );
}

export default CartItem;
