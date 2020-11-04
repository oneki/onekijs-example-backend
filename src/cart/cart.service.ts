import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import Product from '../@common/dto/product';
import Cart from './dto/cart';

@Injectable()
export class CartService {
  getCart(id: string): Cart {
    const filepath = this.cartFilepath(id);
    if (!fs.existsSync(filepath)) {
      return {
        products: [],
      };
    }
    const rawdata = fs.readFileSync(filepath);
    return <Cart>JSON.parse(rawdata.toString());
  }

  addProduct(id: string, product: Product): Cart {
    const cart = this.getCart(id);
    cart.products.push(product);
    this.writeCart(id, cart);
    return cart;
  }

  clearCart(id: string): Cart {
    const cart = {
      products:[]
    }
    this.writeCart(id, cart);
    return cart;
  }

  private cartFilepath(id: string) {
    return `${process.env.CART_DIR}/${id}.json`;
  }

  private writeCart(id: string, cart:Cart): void {
    fs.writeFileSync(this.cartFilepath(id), JSON.stringify(cart));
  }
}
