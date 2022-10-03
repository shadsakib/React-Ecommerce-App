import { useSelector } from 'react-redux';

export default function Checkout() {
  const cart = useSelector((state) => state.cart);

  return (
    <div
      style={{
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: '20px',
        paddingRight: '10px',
      }}
    >
      <h1 style={{ textAlign: 'center' }}> Review Items </h1>

      {cart.map((item, i) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: '10px',
            alignItems: 'center',
            border: '1px solid #e5e5e5',
          }}
        >
          <span> {i + 1}. </span>
          <img
            className="checkout-img scale"
            alt={item.image}
            src={item.image}
          />

          {/* <span style={{ display: 'inline-block' }}> {item.title} </span> */}
          <span className="checkout-item">
            {' '}
            <span className=""> Qty: </span>{' '}
            <span className="bold"> {item.quantity} </span>
          </span>
          <span className="checkout-item">
            {' '}
            <span className=""> Price: </span>{' '}
            <span className="bold"> ৳ {' ' + item.price * item.quantity} </span>{' '}
          </span>
        </div>
      ))}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: '10px',
          alignItems: 'center',
        }}
      >
        <span> </span>
        <img alt="" />

        <span className="checkout-item">
          {' '}
          <span className=""> </span> <span className="bold"> </span>
        </span>
        <span className="checkout-item">
          {' '}
          <span className="">
            {' '}
            Subtotal (
            {cart.reduce(
              (prevValue, item) => prevValue + item.quantity,
              0
            )}{' '}
            items):{' '}
          </span>{' '}
          <span className="bold">
            {' '}
            {' ' +
              '৳ ' +
              cart
                .reduce(
                  (prevValue, item) => prevValue + item.price * item.quantity,
                  0
                )
                .toFixed(2)}{' '}
          </span>{' '}
        </span>
      </div>
    </div>
  );
}
