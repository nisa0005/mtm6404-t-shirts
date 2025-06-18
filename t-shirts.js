// VARIABLES

const tshirtsData = [
  {
    title: 'Blue T-Shirt',
    image: 'images/blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'images/bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'images/cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'images/green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'images/blue-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'images/light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'images/purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'images/red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'images/teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
]


function App() {
  const [tshirts, setTshirts] = React.useState(tshirtsData)

  function selectHandler(index, newQuantity) {
    setTshirts(prev =>
      prev.map((tshirt, i) =>
        i === index ? { ...tshirt, quantity: newQuantity } : tshirt
      )
    )
  }

  function buyHandler(index) {
    setTshirts(prev =>
      prev.map((shirt, i) => {
        if (i === index) {
          const updateStock = shirt.stock - shirt.quantity
          return {
            ...shirt, stock: (shirt.stock - shirt.quantity), quantity: 1
          }
        }
        return shirt
      })
    )
  }

  return (
    <div>
      <h1>T-Shirts</h1>
      <DisplayShirts
        tshirts={tshirts}
        onQuantityChange={selectHandler}
        onBuy={buyHandler}
      />
    </div>
  )
}



const DisplayShirts = ({ tshirts, onQuantityChange, onBuy }) => {
  return (
    <div className="tshirt-grid">

      {/* tshirt with info */}

      {tshirts.map((shirt, index) => (
        <div className="tshirt-card" key={shirt.title}>
          <h3>{shirt.title}</h3>
          <img src={shirt.image} alt={shirt.title} />
          <p>$ {shirt.price}</p>

          {/* out of stock message */}

          {shirt.stock > 0 ? (
            <div>
              <p>{shirt.stock} left!</p>
              <select
                value={shirt.quantity}
                onChange={e => onQuantityChange(index, parseInt(e.target.value))}
              >
                {[...Array(shirt.stock).keys()].map(num => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <button onClick={() => onBuy(index)}>Buy</button>
            </div>
          ) : (
            <p> Out of Stock! </p>
          )}

        </div>
      ))}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)