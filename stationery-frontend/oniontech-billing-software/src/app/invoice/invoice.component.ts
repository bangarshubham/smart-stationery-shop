// app.component.ts
import { Component } from '@angular/core';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id: number;
  invoiceNumber: string;
  customerId: number;
  customerName: string;
  date: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

@Component({
  selector: 'app-invoice',
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-900">BillMaster Pro</h1>
            <div class="flex space-x-4">
              <button 
                (click)="activeTab = 'dashboard'"
                [class]="activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'"
                class="px-4 py-2 rounded-lg font-medium transition-colors">
                Dashboard
              </button>
              <button 
                (click)="activeTab = 'invoices'"
                [class]="activeTab === 'invoices' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'"
                class="px-4 py-2 rounded-lg font-medium transition-colors">
                Invoices
              </button>
              <button 
                (click)="activeTab = 'customers'"
                [class]="activeTab === 'customers' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'"
                class="px-4 py-2 rounded-lg font-medium transition-colors">
                Customers
              </button>
              <button 
                (click)="activeTab = 'reports'"
                [class]="activeTab === 'reports' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'"
                class="px-4 py-2 rounded-lg font-medium transition-colors">
                Reports
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="p-6">
        <!-- Dashboard Tab -->
        <div *ngIf="activeTab === 'dashboard'" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-sm border">
              <div class="flex items-center">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Total Invoices</p>
                  <p class="text-2xl font-bold text-gray-900">{{invoices.length}}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm border">
              <div class="flex items-center">
                <div class="p-2 bg-green-100 rounded-lg">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p class="text-2xl font-bold text-gray-900">{{getTotalRevenue() | currency:'INR'}}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm border">
              <div class="flex items-center">
                <div class="p-2 bg-yellow-100 rounded-lg">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Pending</p>
                  <p class="text-2xl font-bold text-gray-900">{{getPendingInvoices()}}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm border">
              <div class="flex items-center">
                <div class="p-2 bg-purple-100 rounded-lg">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Customers</p>
                  <p class="text-2xl font-bold text-gray-900">{{customers.length}}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Invoices -->
          <div class="bg-white rounded-xl shadow-sm border">
            <div class="px-6 py-4 border-b">
              <h2 class="text-lg font-semibold text-gray-900">Recent Invoices</h2>
            </div>
            <div class="p-6">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="text-left text-sm font-medium text-gray-500">
                      <th class="pb-3">Invoice #</th>
                      <th class="pb-3">Customer</th>
                      <th class="pb-3">Date</th>
                      <th class="pb-3">Amount</th>
                      <th class="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody class="text-sm">
                    <tr *ngFor="let invoice of invoices.slice(0, 5)" class="border-t">
                      <td class="py-3 font-medium">{{invoice.invoiceNumber}}</td>
                      <td class="py-3">{{invoice.customerName}}</td>
                      <td class="py-3">{{invoice.date | date:'short'}}</td>
                      <td class="py-3">{{invoice.total | currency:'INR'}}</td>
                      <td class="py-3">
                        <span [class]="getStatusClass(invoice.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                          {{invoice.status | titlecase}}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Invoices Tab -->
        <div *ngIf="activeTab === 'invoices'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">Invoices</h2>
            <button 
              (click)="showInvoiceModal = true; resetInvoiceForm()"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Create Invoice
            </button>
          </div>

          <div class="bg-white rounded-xl shadow-sm border">
            <div class="p-6">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="text-left text-sm font-medium text-gray-500">
                      <th class="pb-3">Invoice #</th>
                      <th class="pb-3">Customer</th>
                      <th class="pb-3">Date</th>
                      <th class="pb-3">Due Date</th>
                      <th class="pb-3">Amount</th>
                      <th class="pb-3">Status</th>
                      <th class="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="text-sm">
                    <tr *ngFor="let invoice of invoices" class="border-t">
                      <td class="py-3 font-medium">{{invoice.invoiceNumber}}</td>
                      <td class="py-3">{{invoice.customerName}}</td>
                      <td class="py-3">{{invoice.date | date:'short'}}</td>
                      <td class="py-3">{{invoice.dueDate | date:'short'}}</td>
                      <td class="py-3">{{invoice.total | currency:'INR'}}</td>
                      <td class="py-3">
                        <span [class]="getStatusClass(invoice.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                          {{invoice.status | titlecase}}
                        </span>
                      </td>
                      <td class="py-3">
                        <button 
                          (click)="editInvoice(invoice)"
                          class="text-blue-600 hover:text-blue-800 mr-3">
                          Edit
                        </button>
                        <button 
                          (click)="deleteInvoice(invoice.id)"
                          class="text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Customers Tab -->
        <div *ngIf="activeTab === 'customers'" class="space-y-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold text-gray-900">Customers</h2>
            <button 
              (click)="showCustomerModal = true; resetCustomerForm()"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Customer
            </button>
          </div>

          <div class="bg-white rounded-xl shadow-sm border">
            <div class="p-6">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="text-left text-sm font-medium text-gray-500">
                      <th class="pb-3">Name</th>
                      <th class="pb-3">Email</th>
                      <th class="pb-3">Phone</th>
                      <th class="pb-3">Address</th>
                      <th class="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="text-sm">
                    <tr *ngFor="let customer of customers" class="border-t">
                      <td class="py-3 font-medium">{{customer.name}}</td>
                      <td class="py-3">{{customer.email}}</td>
                      <td class="py-3">{{customer.phone}}</td>
                      <td class="py-3">{{customer.address}}</td>
                      <td class="py-3">
                        <button 
                          (click)="editCustomer(customer)"
                          class="text-blue-600 hover:text-blue-800 mr-3">
                          Edit
                        </button>
                        <button 
                          (click)="deleteCustomer(customer.id)"
                          class="text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Reports Tab -->
        <div *ngIf="activeTab === 'reports'" class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900">Reports</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-sm border">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Revenue by Status</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Paid</span>
                  <span class="font-semibold">{{getRevenueByStatus('paid') | currency:'INR'}}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Sent</span>
                  <span class="font-semibold">{{getRevenueByStatus('sent') | currency:'INR'}}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Draft</span>
                  <span class="font-semibold">{{getRevenueByStatus('draft') | currency:'INR'}}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Overdue</span>
                  <span class="font-semibold text-red-600">{{getRevenueByStatus('overdue') | currency:'INR'}}</span>
                </div>
              </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Invoice Statistics</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Average Invoice Value</span>
                  <span class="font-semibold">{{getAverageInvoiceValue() |currency:'INR'}}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Highest Invoice</span>
                  <span class="font-semibold">{{getHighestInvoice() | currency:'INR'}}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">Collection Rate</span>
                  <span class="font-semibold">{{getCollectionRate()}}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Invoice Modal -->
      <div *ngIf="showInvoiceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold">{{editingInvoice ? 'Edit Invoice' : 'Create Invoice'}}</h3>
            <button (click)="showInvoiceModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form (ngSubmit)="saveInvoice()" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <select [(ngModel)]="invoiceForm.customerId" name="customerId" required class="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="">Select Customer</option>
                  <option *ngFor="let customer of customers" [value]="customer.id">{{customer.name}}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input type="date" [(ngModel)]="invoiceForm.dueDate" name="dueDate" required class="w-full border border-gray-300 rounded-lg px-3 py-2">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Items</label>
              <div class="space-y-2">
                <div *ngFor="let item of invoiceForm.items; let i = index" class="grid grid-cols-12 gap-2 items-center">
                  <div class="col-span-5">
                    <input type="text" [(ngModel)]="item.description" [name]="'description' + i" placeholder="Description" class="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                  </div>
                  <div class="col-span-2">
                    <input type="number" [(ngModel)]="item.quantity" [name]="'quantity' + i" (input)="calculateItemAmount(i)" placeholder="Qty" class="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                  </div>
                  <div class="col-span-2">
                    <input type="number" [(ngModel)]="item.rate" [name]="'rate' + i" (input)="calculateItemAmount(i)" placeholder="Rate" step="0.01" class="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                  </div>
                  <div class="col-span-2">
                    <input type="number" [value]="item.amount" readonly placeholder="Amount" class="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50">
                  </div>
                  <div class="col-span-1">
                    <button type="button" (click)="removeItem(i)" class="text-red-600 hover:text-red-800">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <button type="button" (click)="addItem()" class="mt-2 text-blue-600 hover:text-blue-800 text-sm">+ Add Item</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Subtotal</label>
                <input type="number" [value]="calculateSubtotal()" readonly class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tax (%)</label>
                <input type="number" [(ngModel)]="invoiceForm.taxRate" name="taxRate" (input)="calculateTotal()" step="0.01" class="w-full border border-gray-300 rounded-lg px-3 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Total</label>
                <input type="number" [value]="calculateInvoiceTotal()" readonly class="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 font-semibold">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select [(ngModel)]="invoiceForm.status" name="status" class="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" (click)="showInvoiceModal = false" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {{editingInvoice ? 'Update Invoice' : 'Create Invoice'}}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Customer Modal -->
      <div *ngIf="showCustomerModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-6 w-full max-w-md">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold">{{editingCustomer ? 'Edit Customer' : 'Add Customer'}}</h3>
            <button (click)="showCustomerModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form (ngSubmit)="saveCustomer()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" [(ngModel)]="customerForm.name" name="name" required class="w-full border border-gray-300 rounded-lg px-3 py-2">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" [(ngModel)]="customerForm.email" name="email" required class="w-full border border-gray-300 rounded-lg px-3 py-2">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" [(ngModel)]="customerForm.phone" name="phone" required class="w-full border border-gray-300 rounded-lg px-3 py-2">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea [(ngModel)]="customerForm.address" name="address" required class="w-full border border-gray-300 rounded-lg px-3 py-2 h-20"></textarea>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" (click)="showCustomerModal = false" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {{editingCustomer ? 'Update Customer' : 'Add Customer'}}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class InvoiceComponent {
  activeTab = 'dashboard';
  showInvoiceModal = false;
  showCustomerModal = false;
  editingInvoice: Invoice | null = null;
  editingCustomer: Customer | null = null;

  customers: Customer[] = [
    { id: 1, name: 'Acme Corporation', email: 'billing@acme.com', phone: '+1-555-0123', address: '123 Business Ave, NY 10001' },
    { id: 2, name: 'Tech Solutions Inc', email: 'accounts@techsol.com', phone: '+1-555-0456', address: '456 Innovation Blvd, CA 90210' },
    { id: 3, name: 'Global Enterprises', email: 'finance@global-ent.com', phone: '+1-555-0789', address: '789 Corporate Way, TX 75001' }
  ];

  invoices: Invoice[] = [
    {
      id: 1,
      invoiceNumber: 'INV-001',
      customerId: 1,
      customerName: 'Acme Corporation',
      date: new Date('2024-01-15'),
      dueDate: new Date('2024-02-15'),
      items: [
        { id: 1, description: 'Web Development Services', quantity: 1, rate: 5000, amount: 5000 },
        { id: 2, description: 'Hosting Setup', quantity: 1, rate: 500, amount: 500 }
      ],
      subtotal: 5500,
      tax: 550,
      total: 6050,
      status: 'paid'
    },
    {
      id: 2,
      invoiceNumber: 'INV-002',
      customerId: 2,
      customerName: 'Tech Solutions Inc',
      date: new Date('2024-01-20'),
      dueDate: new Date('2024-02-20'),
      items: [
        { id: 3, description: 'Mobile App Development', quantity: 1, rate: 8000, amount: 8000 }
      ],
      subtotal: 8000,
      tax: 800,
      total: 8800,
      status: 'sent'
    },
    {
      id: 3,
      invoiceNumber: 'INV-003',
      customerId: 3,
      customerName: 'Global Enterprises',
      date: new Date('2024-01-25'),
      dueDate: new Date('2024-02-25'),
      items: [
        { id: 4, description: 'Consulting Services', quantity: 40, rate: 150, amount: 6000 }
      ],
      subtotal: 6000,
      tax: 600,
      total: 6600,
      status: 'overdue'
    }
  ];

  customerForm = { id: 0, name: '', email: '', phone: '', address: '' };

  invoiceForm = {
    id: 0,
    customerId: 0,
    dueDate: '',
    items: [{ id: 1, description: '', quantity: 1, rate: 0, amount: 0 }],
    taxRate: 10,
    status: 'draft'
  };

  private nextInvoiceId = 4;
  private nextCustomerId = 4;
  private nextItemId = 5;

  // Dashboard Methods
  getTotalRevenue(): number {
    return this.invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  }

  getPendingInvoices(): number {
    return this.invoices.filter(inv => inv.status === 'sent' || inv.status === 'overdue').length;
  }

  getStatusClass(status: string): string {
    const statusClasses = {
      'draft': 'bg-gray-100 text-gray-800',
      'sent': 'bg-blue-100 text-blue-800',
      'paid': 'bg-green-100 text-green-800',
      'overdue': 'bg-red-100 text-red-800'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800';
  }

  // Report Methods
  getRevenueByStatus(status: string): number {
    return this.invoices
      .filter(inv => inv.status === status)
      .reduce((sum, inv) => sum + inv.total, 0);
  }

  getAverageInvoiceValue(): number {
    if (this.invoices.length === 0) return 0;
    return this.getTotalRevenue() / this.invoices.length;
  }

  getHighestInvoice(): number {
    if (this.invoices.length === 0) return 0;
    return Math.max(...this.invoices.map(inv => inv.total));
  }

  getCollectionRate(): number {
    const totalInvoices = this.invoices.length;
    if (totalInvoices === 0) return 0;
    const paidInvoices = this.invoices.filter(inv => inv.status === 'paid').length;
    return Math.round((paidInvoices / totalInvoices) * 100);
  }

  // Customer Methods
  resetCustomerForm(): void {
    this.customerForm = { id: 0, name: '', email: '', phone: '', address: '' };
    this.editingCustomer = null;
  }

  editCustomer(customer: Customer): void {
    this.customerForm = { ...customer };
    this.editingCustomer = customer;
    this.showCustomerModal = true;
  }

  saveCustomer(): void {
    if (this.editingCustomer) {
      const index = this.customers.findIndex(c => c.id === this.editingCustomer!.id);
      if (index !== -1) {
        this.customers[index] = { ...this.customerForm };
        // Update customer name in invoices
        this.invoices.forEach(inv => {
          if (inv.customerId === this.customerForm.id) {
            inv.customerName = this.customerForm.name;
          }
        });
      }
    } else {
      const newCustomer: Customer = {
        ...this.customerForm,
        id: this.nextCustomerId++
      };
      this.customers.push(newCustomer);
    }
    this.showCustomerModal = false;
    this.resetCustomerForm();
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customers = this.customers.filter(c => c.id !== id);
      // Also delete related invoices
      this.invoices = this.invoices.filter(inv => inv.customerId !== id);
    }
  }

  // Invoice Methods
  resetInvoiceForm(): void {
    this.invoiceForm = {
      id: 0,
      customerId: 0,
      dueDate: '',
      items: [{ id: 1, description: '', quantity: 1, rate: 0, amount: 0 }],
      taxRate: 10,
      status: 'draft'
    };
    this.editingInvoice = null;
  }

  editInvoice(invoice: Invoice): void {
    this.invoiceForm = {
      id: invoice.id,
      customerId: invoice.customerId,
      dueDate: invoice.dueDate.toISOString().split('T')[0],
      items: [...invoice.items],
      taxRate: (invoice.tax / invoice.subtotal) * 100,
      status: invoice.status
    };
    this.editingInvoice = invoice;
    this.showInvoiceModal = true;
  }

  addItem(): void {
    this.invoiceForm.items.push({
      id: this.nextItemId++,
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    });
  }

  removeItem(index: number): void {
    if (this.invoiceForm.items.length > 1) {
      this.invoiceForm.items.splice(index, 1);
    }
  }

  calculateItemAmount(index: number): void {
    const item = this.invoiceForm.items[index];
    item.amount = item.quantity * item.rate;
  }

  calculateSubtotal(): number {
    return this.invoiceForm.items.reduce((sum, item) => sum + item.amount, 0);
  }

  calculateInvoiceTotal(): number {
    const subtotal = this.calculateSubtotal();
    const tax = (subtotal * this.invoiceForm.taxRate) / 100;
    return subtotal + tax;
  }

  calculateTotal(): void {
    // This method is called when tax rate changes
    // The actual calculation is done in calculateInvoiceTotal()
  }

  saveInvoice(): void {
    const customer = this.customers.find(c => c.id == this.invoiceForm.customerId);
    if (!customer) {
      alert('Please select a customer');
      return;
    }

    const subtotal = this.calculateSubtotal();
    const tax = (subtotal * this.invoiceForm.taxRate) / 100;
    const total = subtotal + tax;

    if (this.editingInvoice) {
      const index = this.invoices.findIndex(inv => inv.id === this.editingInvoice!.id);
      if (index !== -1) {
        this.invoices[index] = {
          id: this.editingInvoice.id,
          invoiceNumber: this.editingInvoice.invoiceNumber,
          customerId: this.invoiceForm.customerId,
          customerName: customer.name,
          date: this.editingInvoice.date,
          dueDate: new Date(this.invoiceForm.dueDate),
          items: [...this.invoiceForm.items],
          subtotal,
          tax,
          total,
          status: this.invoiceForm.status as 'draft' | 'sent' | 'paid' | 'overdue'
        };
      }
    } else {
      const newInvoice: Invoice = {
        id: this.nextInvoiceId++,
        invoiceNumber: `INV-${String(this.nextInvoiceId - 1).padStart(3, '0')}`,
        customerId: this.invoiceForm.customerId,
        customerName: customer.name,
        date: new Date(),
        dueDate: new Date(this.invoiceForm.dueDate),
        items: [...this.invoiceForm.items],
        subtotal,
        tax,
        total,
        status: this.invoiceForm.status as 'draft' | 'sent' | 'paid' | 'overdue'
      };
      this.invoices.unshift(newInvoice);
    }

    this.showInvoiceModal = false;
    this.resetInvoiceForm();
  }

  deleteInvoice(id: number): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoices = this.invoices.filter(inv => inv.id !== id);
    }
  }
}