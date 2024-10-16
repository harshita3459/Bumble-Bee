import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './DishList.css';

const DishList = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing

  // Dummy data for dishes
  const dishes = [
    {
      name: "Chicken Biryani",
      description: "Aromatic rice with tender chicken pieces and spices.",
      price: 350,
      image: "food 1.jpeg",
    },
    {
      name: "Paneer Butter Masala",
      description: "Cottage cheese cubes cooked in a rich, creamy tomato gravy.",
      price: 250,
      image: "food 2.jpeg",
    },
    {
      name: "Margherita Pizza",
      description: "Classic pizza with fresh tomatoes, mozzarella, and basil.",
      price: 400,
      image: "food 3.jpeg",
    },
    {
      name: "Pasta Alfredo",
      description: "Creamy Alfredo sauce with fettuccine pasta.",
      price: 300,
      image: "food 4.jpeg",
    },
    {
      name: "Butter Chicken",
      description: "Chicken cooked in creamy tomato gravy with a blend of spices.",
      price: 380,
      image: "food 5.jpeg",
    },
    {
      name: "Tandoori Roti",
      description: "Indian flatbread cooked in a clay oven (tandoor).",
      price: 20,
      image: "food 6.jpeg",
    },
    {
      name: "Sushi Rolls",
      description: "Japanese rice rolls with vegetables or seafood.",
      price: 600,
      image: "food 7.jpeg",
    },
    {
      name: "Egg Curry",
      description: "Boiled eggs cooked in a spicy curry.",
      price: 200,
      image: "food 8.jpeg",
    },
    {
      name: "Veg Pulao",
      description: "Rice cooked with mixed vegetables and spices.",
      price: 150,
      image: "food 9.jpeg",
    },
    {
      name: "Hakka Noodles",
      description: "Stir-fried noodles with vegetables and soy sauce.",
      price: 180,
      image: "food 10.jpeg",
    },
    {
      name: "Masala Dosa",
      description: "Crispy dosa filled with spiced potatoes.",
      price: 100,
      image: "food 11.jpeg",
    },
    {
      name: "Chicken Fried Rice",
      description: "Stir-fried rice with chicken, vegetables, and sauces.",
      price: 220,
      image: "food 12.jpeg",
    }
  ];

  // Navigate to Order Form page with the selected dish details
  const handleOrderNow = (dish) => {
    navigate('/order-form', { state: { dish } }); // Pass dish data to the order form page
  };

  return (
    <div className='dish-list-container'>
      <div className="dish-list">
        {dishes.map((dish, index) => (
          <div key={index} className="dish-item">
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <div className="dish-info">
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <p>Price: ₹{dish.price}</p>
              <button className="order-now-button" onClick={() => handleOrderNow(dish)}>Order Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishList;
