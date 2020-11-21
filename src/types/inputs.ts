interface UpdateProductInput {
  updateProductInput: {
    userId: string;
    productId: string;
    title?: string;
    description?: string;
    location?: string;
    category?: string;  
    price?: number;
    imagesSrc?: string[];
  }
}

export type { UpdateProductInput }