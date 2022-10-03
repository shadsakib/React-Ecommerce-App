import { IconButton, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity, removeItem, clear } from '../store/cartSlice';
import { updateProduct } from '../store/productsSlice';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const currentRoute = useLocation().pathname;
  const navigate = useNavigate();

  const handleQuantityChange = function (itemId, change) {
    const payloadCart = { id: itemId, change: change };
    const payloadProduct = { id: itemId, change: -change };
    console.log(-change);

    dispatch(changeQuantity(payloadCart));
    dispatch(updateProduct(payloadProduct));
  };

  const handleRemoveFromCart = function (itemId) {
    const payloadCart = { id: itemId };
    dispatch(removeItem(payloadCart));

    const cartItem = cart.find((item) => item.id === itemId);
    const payloadProduct = { id: itemId, change: cartItem.quantity };
    dispatch(updateProduct(payloadProduct));
  };

  const handleCheckout = function () {
    dispatch(clear());
    alert('Successfully paid and checked out!');
    navigate('/');
  };

  return (
    <div className="cart">
      <h1 style={{ textAlign: 'center' }}> Cart </h1>
      {/* <div className="cart-item">
        <span> Hans Niemann Sinquefield Cup T-shirt </span>
        <IconButton>
          {' '}
          <RemoveCircleIcon />{' '}
        </IconButton>
        <span> 5 </span>
        <IconButton>
          {' '}
          <AddCircleIcon />{' '}
        </IconButton>
      </div> */}
      {!cart.length ? (
        <p>Your cart is empty. Please choose an item and add it to cart :) </p>
      ) : (
        ''
      )}
      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <span style={{ display: 'inline-block', width: '60%' }}>
            {' '}
            {item.title}{' '}
          </span>
          <div>
            <IconButton
              onClick={() => {
                handleQuantityChange(item.id, -1);
              }}
              color="primary"
            >
              {' '}
              <RemoveCircleIcon />{' '}
            </IconButton>
            <span> {item.quantity} </span>
            <IconButton
              onClick={() => {
                handleQuantityChange(item.id, 1);
              }}
              color="primary"
            >
              {' '}
              <AddCircleIcon />{' '}
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                handleRemoveFromCart(item.id);
              }}
            >
              {' '}
              <CancelIcon />{' '}
            </IconButton>
          </div>
        </div>
      ))}
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <div className="bold totals"> Items</div>
        <div className="bold grey totals">
          {' '}
          {'(' +
            cart.reduce((prevValue, item) => prevValue + item.quantity, 0) +
            ')'}{' '}
        </div>

        <div className="bold totals"> Subtotal </div>
        <div className="bold grey totals">
          {'৳ ' +
            cart
              .reduce(
                (prevValue, item) => prevValue + item.price * item.quantity,
                0
              )
              .toFixed(2)}
        </div>
      </div>
      {!currentRoute.endsWith('checkout') ? (
        <Button
          variant="contained"
          color={'primary'}
          size="small"
          disabled={!cart.length}
          LinkComponent={Link}
          to="/checkout"
        >
          {' '}
          Checkout{' '}
        </Button>
      ) : (
        <Button
          variant="contained"
          startIcon={<ShoppingCartCheckoutIcon />}
          onClick={handleCheckout}
          disabled={!cart.length}
        >
          {' '}
          Confirm and Pay{' '}
        </Button>
      )}
    </div>
  );
}

export default Cart;
