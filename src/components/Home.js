import React, { useReducer } from "react";
import "./Home.css";

// const initialState = 0;
const reducer = (state, action) => {
    // console.log(action);
   
    if(action.type==="plus"){
        let tempprod = state.productList.map((e)=>{
             if(e.id===action.payload)
             {
                return {...e ,Quantity: e.Quantity+1}
            }
            return e
        });
        // console.log("tempprod", tempprod);
        return { ...state, productList: tempprod };     
    }
    else if(action.type==='minus'){
        // console.log('minus');
        let tempprod = state.productList.map((e)=>{
            return e.id === action.payload && e.Quantity > 0 ? { ...e, Quantity: e.Quantity - 1 } : e;
        })
        return {...state,productList:tempprod}
    }
    
}


const initialState = {
    productList:[
        { id: 1, name: "Product-1", price: 100, Quantity: 0 },
        { id: 2, name: "Product-2", price: 200, Quantity: 0 },
        { id: 3, name: "Product-3", price: 300, Quantity: 0 },
        { id: 4, name: "Product-4", price: 400, Quantity: 0 },
      ]
}


const Home = () => {
 
    const [count, dispatch] = useReducer(reducer, initialState)
    console.log(count);

    // total section 

    const price = () => {
        let total = count.productList.reduce((acc, product) => acc + (product.price * product.Quantity), 0);
        return total;
        
    };

  return (
    <div className="whole_cont">
        <div className="rit">
            <div className="hh">
                <h1>Product</h1>
            </div>
            
            <div className="Carts_cont">
                {count.productList.map((item, id) => {
                return (
                    <div className="inner_sec right_sec" key={id}>
                    <div className="names">{item.name}</div>
                    <div className="price_sec">{item.price}</div>
                    <div className="btns">
                        <span onClick={()=>dispatch({type: "minus", payload: item.id})}>-</span>
                        <span>{item.Quantity}</span>
                        <span onClick={()=>dispatch({type: "plus", payload: item.id})}>+</span>
                    </div>
                    </div>
                );
                })}

            </div>
        </div>
        <div className="right">
            <div className="info">
                <h1>Cart</h1>
            </div>
            <div className="cartss">
            {
            count.productList.map((item,id) => {
                        if (item.Quantity > 0) {
                            return (
                                <div className="right_sec" key={id}>
                                    <div className="names">{item.name}</div>
                                    <div>{`${item.price} * ${item.Quantity}`}</div>
                                </div>
                            );
                        }
                        return "";
                    })}
            </div>
            <div className="total_sec">
                <div className="total_section">
                    <h2>Total:</h2>
                </div>
                <div className="price">
                    {price()}
                </div>
            </div>
        </div>
        
    </div>
  );
};

export default Home;
