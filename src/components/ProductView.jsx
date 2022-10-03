import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, changeQuantity } from '../store/cartSlice';
import { updateProduct } from '../store/productsSlice';

function ProductView() {
  const { id } = useParams();

  const product = useSelector((state) =>
    state.products.find((product) => product.id === +id)
  );

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddItemToCart = function () {
    if (cart.some((item) => item.id === +id)) {
      const payload = { id: +id, change: 1 };
      console.log(payload);

      product.quantityInStock > 0 ? dispatch(changeQuantity(payload)) : pass();
    } else {
      const payload = { ...product, quantity: 1 };
      dispatch(addItem(payload));
    }

    dispatch(updateProduct({ id: product.id, change: -1 }));
  };

  const pass = function () {};

  return (
    <div className="product">
      <h1> {product.title} </h1>
      <div className="product-cont">
        <img width="300" height="400" alt={product.title} src={product.image} />
        <div className="price"> ৳ {product.price} </div>
        <Button
          variant="contained"
          color={product.quantityInStock ? 'primary' : 'warning'}
          disabled={!product.quantityInStock}
          onClick={handleAddItemToCart}
        >
          {' '}
          Add to Cart{' '}
        </Button>
        <p> {product.description}</p>
        <div className="category"> {product.category} </div>
      </div>
    </div>
  );
}

export default ProductView;
