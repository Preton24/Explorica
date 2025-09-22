import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const cartItems = [
  {
    id: 'handicraft-1',
    name: 'Dokra Art Figurine',
    price: 1500,
    quantity: 1,
  },
  {
    id: 'handicraft-2',
    name: 'Sohrai Painting',
    price: 2500,
    quantity: 1,
  },
];

const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const tax = subtotal * 0.05;
const total = subtotal + tax;

export default function CartPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <ShoppingCart className="mx-auto h-16 w-16 text-primary" />
        <h1 className="font-headline text-5xl font-bold mt-4">Your Shopping Cart</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Review your items and proceed to checkout.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => {
            const itemImage = PlaceHolderImages.find(img => img.id === item.id);
            return (
              <Card key={item.id} className="flex items-center p-4 transition-shadow hover:shadow-lg">
                {itemImage && (
                  <Image
                    src={itemImage.imageUrl}
                    alt={item.name}
                    data-ai-hint={itemImage.imageHint}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                )}
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Authentic handmade craft</p>
                  <p className="font-bold mt-1">Rs.{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className="w-14 h-8 text-center"
                  />
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="ml-4 text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20">
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rs.{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes (5%)</span>
                <span>Rs.{tax.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>Rs.{total.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
