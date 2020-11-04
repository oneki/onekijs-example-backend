import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Cookies } from '@nestjsplus/cookies';
import Product from '../@common/dto/product';
import { base64url } from '../@common/utils/base64';
import { CartService } from './cart.service';
import Cart from './dto/cart';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Cookies('username') username?: string): Promise<Cart> {
    const id = this.usernameToCartId(username);
    try {
      return this.cartService.getCart(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post()
  async addProduct(
    @Body() product: Product,
    @Cookies('username') username?: string,
  ): Promise<Cart> {
    const id = this.usernameToCartId(username);
    try {
      return this.cartService.addProduct(id, product);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete()
  async clearCart(
    @Body() product: Product,
    @Cookies('username') username?: string,
  ): Promise<Cart> {
    const id = this.usernameToCartId(username);
    try {
      return this.cartService.clearCart(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private usernameToCartId(username?: string): string {
    if (!username || username.length > 100) {
      throw new UnauthorizedException();
    }
    return base64url(username);
  }
}
