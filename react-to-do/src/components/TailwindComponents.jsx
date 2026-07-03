import React, { useState, useEffect } from "react";
import { FaTachometerAlt , FaExclamation, FaTasks, FaCog, FaQuestionCircle, FaSignOutAlt  } from "react-icons/fa";
import Card from "./Card.jsx";

export default function TailwindComponents() {



return(
    <>  
        <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
            <li>
            <a href="#" className="block transition-colors hover:text-gray-900 dark:hover:text-white">
                Home
            </a>
            </li>

            <li className="rtl:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            </li>

            <li>
            <a href="#" className="block transition-colors hover:text-gray-900 dark:hover:text-white">
                Category
            </a>
            </li>

            <li className="rtl:rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            </li>

            <li>
            <a href="#" className="block transition-colors hover:text-gray-900 dark:hover:text-white">
                Product
            </a>
            </li>
        </ol>
        </nav>


        <div className="relative inline-flex">
  <span className="inline-flex divide-x divide-gray-300 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
    <button type="button" className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative">
      Product
    </button>

    <button type="button" className="px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 focus:relative" aria-label="Menu">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
      </svg>
    </button>
  </span>

  <div role="menu" className="absolute end-0 top-12 z-auto w-56 divide-y divide-gray-200 overflow-hidden rounded border border-gray-300 bg-white shadow-sm">
    <div>
      <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900" role="menuitem">
        Storefront
      </a>

      <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900" role="menuitem">
        Warehouse
      </a>

      <a href="#" className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900" role="menuitem">
        Stock
      </a>
    </div>
    <button type="button" className="block w-full px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 ltr:text-left rtl:text-right">
      Delete
    </button>
  </div>
</div>


{/* https://wpdean.com/tuikit/tailwind-css-ui-kit.html */}


{/* <!-- Hero Section CTA  --> */}
 <div className="bg-gray-100 py-16 sm:py-20 text-center px-4">
     <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
         Build Your Next Idea Faster
     </h1>
     <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
         Leverage our library of UI components to accelerate your development process and create stunning user interfaces with ease.
     </p>
     <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
         <a href="#" className="w-full sm:w-auto inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg">
             Get Started
         </a>
         <a href="#" className="w-full sm:w-auto inline-block bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out text-lg">
             Learn More
         </a>
     </div>
 </div>



{/* <!-- Simple Centered Login Form --> */}
<div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
    <form>
      <div className="mb-4">
        <label for="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
        <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="you@example.com" required />
      </div>
      <div className="mb-6">
        <label for="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input type="password" id="password" name="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="••••••••" required />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200">
        Sign In
      </button>
      <div className="text-center mt-4">
        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
      </div>
    </form>
    <p className="text-center text-sm text-gray-500 mt-6">
      Don't have an account? <a href="#" className="text-blue-500 hover:underline font-medium">Sign up</a>
    </p>
  </div>
</div>


{/* One-Page Checkout Form */}
<form className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* <!-- Shipping & Billing Info (Left/Main Column) --> */}
    <div className="md:col-span-2 space-y-6">
        {/* <!-- Shipping Address --> */}
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" id="first_name" name="first_name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="John" />
                </div>
                <div>
                    <label for="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" id="last_name" name="last_name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Doe" />
                </div>
                <div className="sm:col-span-2">
                    <label for="email_address" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email_address" name="email_address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="you@example.com" />
                </div>
                <div className="sm:col-span-2">
                    <label for="street_address" className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input type="text" id="street_address" name="street_address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="123 Main St" />
                </div>
                <div>
                    <label for="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" id="city" name="city" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Anytown" />
                </div>
                <div>
                    <label for="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                    <input type="text" id="state" name="state" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="CA" />
                </div>
                <div>
                    <label for="zip_code" className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                    <input type="text" id="zip_code" name="zip_code" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="90210" />
                </div>
                <div>
                    <label for="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <select id="country" name="country" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                    </select>
                </div>
            </div>
        </div>

        {/* <!-- Billing Address --> */}
        <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center mb-4">
                <input id="same_as_shipping" name="same_as_shipping" type="checkbox" checked className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <label for="same_as_shipping" className="ml-2 block text-sm text-gray-900">Billing address is the same as my shipping address</label>
            </div>
            {/* <!-- Billing address form fields would go here, conditionally displayed --> */}
        </div>

        {/* <!-- Payment Details --> */}
        <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-4">
                {/* <!-- Payment Method Selection (Example: Radio buttons) --> */}
                <fieldset>
                    <legend className="text-sm font-medium text-gray-900">Payment Method</legend>
                    <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                            <input id="credit_card" name="payment_method" type="radio" checked className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                            <label for="credit_card" className="ml-3 block text-sm font-medium text-gray-700">Credit card</label>
                        </div>
                        <div className="flex items-center">
                            <input id="paypal" name="payment_method" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                            <label for="paypal" className="ml-3 block text-sm font-medium text-gray-700">PayPal</label>
                        </div>
                    </div>
                </fieldset>

                {/* <!-- Credit Card Fields --> */} 
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-4">
                        <label for="card_number" className="block text-sm font-medium text-gray-700">Card number</label>
                        <input type="text" id="card_number" name="card_number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="•••• •••• •••• ••••" />
                    </div>
                    <div className="sm:col-span-2">
                        <label for="expiry_date" className="block text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
                        <input type="text" id="expiry_date" name="expiry_date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="MM / YY" />
                    </div>
                    <div>
                        <label for="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                        <input type="text" id="cvc" name="cvc" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="•••" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Order Summary (Right/Side Column) --> */}
    <div className="md:col-span-1">
        <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
            <ul role="list" className="divide-y divide-gray-200">
                <li className="flex py-4">
                    <img src="https://picsum.photos/id/1/64/64" alt="Product Image" className="h-16 w-16 rounded-md object-cover" />
                    <div className="ml-4 flex flex-1 flex-col">
                        <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3><a href="#">Basic Tee</a></h3>
                                <p className="ml-4">$32.00</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Black</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty 1</p>
                        </div>
                    </div>
                </li>
                <li className="flex py-4">
                    <img src="https://picsum.photos/id/2/64/64" alt="Product Image" className="h-16 w-16 rounded-md object-cover" />
                    <div className="ml-4 flex flex-1 flex-col">
                        <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3><a href="#">Utility Jacket</a></h3>
                                <p className="ml-4">$110.00</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Olive</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty 1</p>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <p>Subtotal</p>
                    <p>$142.00</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <p>Shipping</p>
                    <p>$5.00</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <p>Tax</p>
                    <p>$11.36</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 pt-2">
                    <p>Total</p>
                    <p>$158.36</p>
                </div>
            </div>
            <button type="submit" className="mt-6 w-full rounded-md border border-transparent bg-blue-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Place Order
            </button>
        </div>
    </div>
</form>

    </>
);
}