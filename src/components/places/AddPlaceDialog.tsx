import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreatePlace } from '@/hooks/use-places';
import { Plus, Loader2 } from 'lucide-react';
const formSchema = z.object({
  title: z.string().min(2, 'Name is too short'),
  category: z.enum(['Park', 'Cafe', 'Hotel', 'Trail']),
  description: z.string().min(10, 'Tell us a bit more!'),
  image: z.string().url('Please provide a valid image URL'),
});
export function AddPlaceDialog() {
  const [open, setOpen] = useState(false);
  const createPlace = useCreatePlace();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: 'Cafe',
      description: '',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
    },
  });
  useEffect(() => {
    if (createPlace.isSuccess) {
      setOpen(false);
      form.reset();
      createPlace.reset();
    }
  }, [createPlace.isSuccess, createPlace, form]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createPlace.mutateAsync({
      ...values,
      amenities: ['New Spot'],
      rules: ['Standard pet rules apply'],
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-sketch bg-secondary text-secondary-foreground hover:bg-secondary/90 sketch-border-sm gap-2">
          <Plus className="h-4 w-4" /> Suggest a Spot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sketch-border bg-background">
        <DialogHeader>
          <DialogTitle className="text-3xl font-sketch text-primary">Sniff Out a New Spot</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Bark & Brew" {...field} className="sketch-border-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="sketch-border-sm">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Park">Park</SelectItem>
                      <SelectItem value="Cafe">Cafe</SelectItem>
                      <SelectItem value="Hotel">Hotel</SelectItem>
                      <SelectItem value="Trail">Trail</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} className="sketch-border-sm" />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What makes it special?" {...field} className="sketch-border-sm min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full font-sketch text-lg h-12 bg-primary hover:scale-105 transition-transform"
              disabled={createPlace.isPending}
            >
              {createPlace.isPending ? <Loader2 className="animate-spin" /> : "Sniff it Out!"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}