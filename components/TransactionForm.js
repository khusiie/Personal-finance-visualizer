'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'; 

export default function TransactionForm({
  transaction,
  onAdd,
  onEdit,
  onCancel,
}) {
  const categories = ['Food', 'Rent', 'Transport', 'Entertainment', 'Utilities', 'Others'];

  const form = useForm({
    defaultValues: {
      amount: '',
      date: '',
      description: '',
      category: 'Others',
    },
  });

  useEffect(() => {
    if (transaction) {
      form.reset({
        amount: transaction.amount,
        date: transaction.date ? transaction.date.slice(0, 10) : '',
        description: transaction.description || '',
        category: transaction.category || 'Others',
      });
    } else {
      form.reset({
        amount: '',
        date: '',
        description: '',
        category: 'Others',
      });
    }
  }, [transaction, form]);

  const onSubmit = async (data) => {
    console.log("🧾 Form Data:", data); 
    const payload = {
      amount: parseFloat(data.amount),
      date: data.date,
      description: data.description,
      category: data.category,
    };

    try {
      let res;
      if (transaction) {
        res = await fetch(`/api/transactions/${transaction._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const txn = await res.json();

      if (transaction) {
        onEdit && onEdit(txn);
      } else {
        onAdd && onAdd(txn);
        form.reset();
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        {/* Dynamic Form Title */}
        <h2 className="text-3xl font-bold mb-4">
          {transaction ? 'Edit Transaction' : 'Add Transaction'}
        </h2>

        <FormField
          control={form.control}
          name="amount"
          rules={{ required: 'Amount is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" min="0" placeholder="Amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          rules={{ required: 'Date is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
           {/* Category Select Dropdown */}
        <FormField
          control={form.control}
          name="category"
          rules={{ required: 'Category is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

            

        <div className="flex gap-4">
          <Button type="submit" className="flex-1">
            {transaction ? 'Update Transaction' : 'Add Transaction'}
          </Button>

          {transaction && (
            <Button
              type="button"
              variant="outline"
              onClick={() => onCancel && onCancel()}
            >
              Back
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
