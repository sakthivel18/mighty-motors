import Trade from "./Trade";

const Trades = () => {
    const categories = [
        {
            categoryName: "Sedans",
            trades: [
                {
                    name: "Audi A5",
                    location: "Charlotte, NC",
                    image: require("../images/car1.jpg")
                },
                {
                    name: "Honda Accord",
                    location: "Austin, TX",
                    image: require("../images/car2.jpg")
                },
                {
                    name: "Toyota Camry",
                    location: "San Francisco, CA",
                    image: require("../images/car3.jpg")
                }
            ]
        },
        {
            categoryName: "SUVs",
            trades: [
                {
                    name: "Audi Q5",
                    location: "Jersey city, NJ",
                    image: require("../images/car4.jpg")
                },
                {
                    name: "BMW X1",
                    location: "Manhattan, NY",
                    image: require("../images/car5.jpg")
                },
                {
                    name: "Mazda CX5",
                    location: "Blacksburg, VA",
                    image: require("../images/car6.jpg")
                }
            ]
        }
    ];
    return ( 
        <div className="container-fluid mt-3">
            {
                categories.map((c) => 
                    <div key={Math.random()}>
                        <h5>{c.categoryName}</h5>
                        <hr/>
                        <div className="row d-flex flex-row">
                        {
                            c.trades.map(trade =><Trade key={Math.random()} tradeDetails={trade}/>)
                        }      
                        </div>  
                    </div>
                )
            }
        </div>
    );
}
 
export default Trades;