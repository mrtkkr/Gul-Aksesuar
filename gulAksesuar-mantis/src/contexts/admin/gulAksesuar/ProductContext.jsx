// PanelContext.jsx
import React, { createContext, useState, useCallback } from 'react';
import { sendApiRequest } from '../../../services/network_service.js';

export const ProductContext = createContext();

const baseUrl = 'core/';
const productListUrl = 'product/';
const productDetailUrl = 'products/';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({
    productName: '',
    productPrice: '',
    productCategory: ''
  });

  // Kullanıcıları Getir (GET)
  const fetchProducts = useCallback(
    async ({
      page = 0,
      pageSize = 10,
      orderBy = 'product_time',
      order = 'asc',
      productName = filters.productName,
      productPrice = filters.productPrice,
      productCategory = filters.productCategory
    } = {}) => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = {
          page: page + 1, // Django'da sayfalar 1-indexli
          page_size: pageSize,
          order_by: orderBy,
          order: order
        };
        if (productName) queryParams.product_name = productName;
        if (productPrice) queryParams.product_price = productPrice;
        if (productCategory) queryParams.product_category = productCategory;

        const res = await sendApiRequest({
          url: baseUrl + productListUrl,
          method: 'GET',
          queryParams
        });

        if (res.response.status === 200) {
          setProducts(res.data.results || []);
          setCount(res.data.count || 0); // toplam kayıt sayısı
        } else {
          setError('Ürünler alınırken bir hata oluştu.');
        }
      } catch (error) {
        console.error('fetchProducts error:', error);
        setError('API çağrısı başarısız oldu.');
      } finally {
        setLoading(false);
      }
    },
    [filters] // 🔁 filters artık bağımlılıkta
  );

  const addProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await sendApiRequest({
        url: baseUrl + productListUrl,
        method: 'POST',
        body: productData
      });

      if (res?.response?.status === 201) {
        // Başarılı bir şekilde eklendiğinde, listeyi güncelliyoruz
        setProducts((prev) => [...prev, res.data]);
        return { success: true, data: res.data };
      } else {
        setError('Ürün eklenemedi.');
        return { success: false, error: 'Ürün eklenemedi.' };
      }
    } catch (err) {
      console.error('addProduct error:', err);
      setError('Ürün eklenirken hata oluştu.');
      return { success: false, error: 'Ürn eklenirken hata oluştu.' };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await sendApiRequest({
        url: `${baseUrl}${productDetailUrl}${id}/`,
        method: 'DELETE'
      });

      if (res?.response?.status === 204) {
        setProducts((prev) => prev.filter((pr) => pr.id !== id));
        return { success: true };
      } else {
        setError('Ürün silinemedi.');
        return { success: false, error: 'Ürün silinemedi.' };
      }
    } catch (err) {
      console.error('deleteProduct error:', err);
      setError('Ürün silinirken hata oluştu.');
      return { success: false, error: 'Ürün silinirken hata oluştu.' };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Eksik olan updateProduct fonksiyonunu ekliyoruz
  const updateProduct = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await sendApiRequest({
        url: `${baseUrl}${productDetailUrl}${id}/`,
        method: 'PUT',
        body: data
      });
      if (res.response.status === 200) {
        // Update the payment in the local state to avoid refetching
        setProducts((prev) => prev.map((product) => (product.id === id ? res.data : product)));
        return { success: true, data: res.data };
      } else {
        setError('Ürün güncellenemedi.');
        return { success: false, error: 'Ürün güncellenemedi.' };
      }
    } catch (err) {
      console.error('Product error:', err);
      setError('Ürün güncellenirken hata oluştu.');
      return { success: false, error: 'Ürün güncellenirken hata oluştu.' };
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    // Önce local state'teki products listesinden ID'li ürün var mı diye kontrol et
    const localProduct = products.find((product) => product.id === id);
    if (localProduct) {
      return { success: true, data: localProduct };
    }

    // Eğer local'de yoksa, API'den çek
    setLoading(true);
    setError(null);
    try {
      const res = await sendApiRequest({
        url: `${baseUrl}${productDetailUrl}${id}/`,
        method: 'GET'
      });

      if (res.response.status === 200) {
        return { success: true, data: res.data };
      } else {
        setError('Ürün bulunamadı.');
        return { success: false, error: 'Ürün bulunamadı.' };
      }
    } catch (err) {
      console.error('getProductById error:', err);
      setError('Ürün bilgisi alınırken hata oluştu.');
      return { success: false, error: 'Ürün bilgisi alınırken hata oluştu.' };
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        count,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
