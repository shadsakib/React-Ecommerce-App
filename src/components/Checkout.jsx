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
        marginTop: '20px',
      }}
    >
      <h1 style={{ textAlign: 'center' }}> Review Items </h1>

      {cart.map((item) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: '10px',
          }}
        >
          <img height="20px" width="20px" alt={item.image} src={item.image} />

          {/* <span style={{ display: 'inline-block' }}> {item.title} </span> */}
          <span>
            {' '}
            <span className="bold"> Quantity: </span> {item.quantity}{' '}
          </span>
          <span>
            {' '}
            <span className="bold"> Price: </span> BDT{' '}
            {item.price * item.quantity}{' '}
          </span>
        </div>
      ))}
    </div>
  );
}
