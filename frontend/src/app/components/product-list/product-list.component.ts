import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  newProduct: Partial<Product> = { name: '', price: 0 };
  editingProduct: Product | null = null;
  editedProduct: Partial<Product> = { name: '', price: 0 };
  loading = false;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products.';
        this.loading = false;
      }
    });
  }

  addProduct() {
    if (!this.newProduct.name || !this.newProduct.price) return;
    this.productService.addProduct({
      name: this.newProduct.name!,
      price: this.newProduct.price!
    }).subscribe({
      next: (product) => {
        this.products.push(product);
        this.newProduct = { name: '', price: 0 };
      },
      error: () => {
        this.error = 'Failed to add product.';
      }
    });
  }

  startEdit(product: Product) {
    this.editingProduct = { ...product };
    this.editedProduct = { name: product.name, price: product.price };
  }

  saveEdit(product: Product) {
    if (!this.editedProduct.name || !this.editedProduct.price) return;
    const updatedProduct: Product = {
      id: product.id,
      name: this.editedProduct.name!,
      price: this.editedProduct.price!
    };
    this.productService.updateProduct(updatedProduct).subscribe({
      next: (updated) => {
        const idx = this.products.findIndex(p => p.id === product.id);
        if (idx > -1) this.products[idx] = updated;
        this.editingProduct = null;
      },
      error: () => {
        this.error = 'Failed to update product.';
      }
    });
  }

  cancelEdit() {
    this.editingProduct = null;
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
      },
      error: () => {
        this.error = 'Failed to delete product.';
      }
    });
  }
}
