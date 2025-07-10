import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import Swal from 'sweetalert2';

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
    if (!this.newProduct.name || this.newProduct.name.trim() === '') {
      Swal.fire('', 'El nombre del producto es obligatorio.', 'warning');
      return;
    }
    if (
      this.newProduct.price === undefined ||
      this.newProduct.price === null ||
      isNaN(Number(this.newProduct.price)) ||
      Number(this.newProduct.price) <= 0
    ) {
      Swal.fire('', 'El precio debe ser un número mayor a 0.', 'warning');
      return;
    }
    this.productService.addProduct({
      name: this.newProduct.name!,
      price: Number(this.newProduct.price!)
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
    if (!this.editedProduct.name || this.editedProduct.name.trim() === '') {
      Swal.fire('', 'El nombre del producto es obligatorio.', 'warning');
      return;
    }
    if (
      this.editedProduct.price === undefined ||
      this.editedProduct.price === null ||
      isNaN(Number(this.editedProduct.price)) ||
      Number(this.editedProduct.price) <= 0
    ) {
      Swal.fire('', 'El precio debe ser un número mayor a 0.', 'warning');
      return;
    }
    const updatedProduct: Product = {
      id: product.id,
      name: this.editedProduct.name!,
      price: Number(this.editedProduct.price!)
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffd600',
      cancelButtonColor: '#222',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== id);
            Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
          },
          error: () => {
            this.error = 'Failed to delete product.';
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
          }
        });
      }
    });
  }
}
