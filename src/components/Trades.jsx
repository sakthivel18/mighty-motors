import Trade from "./Trade";

const Trades = () => {
    const categories = [
        {
            categoryName: "Sedans",
            trades: [
                {
                    name: "Audi A5",
                    location: "Charlotte, NC",
                    imageUrl: "../images/car1.jpg"
                },
                {
                    name: "Honda Accord",
                    location: "Austin, TX",
                    imageUrl: "../images/car1.jpg"
                },
                {
                    name: "Toyota Camry",
                    location: "San Francisco, CA",
                    imageUrl: "../images/car1.jpg"
                }
            ]
        },
        {
            categoryName: "SUVs",
            trades: [
                {
                    name: "Audi Q5",
                    location: "Jersey city, NJ",
                    imageUrl: "../images/car1.jpg"
                },
                {
                    name: "BMW X1",
                    location: "Manhattan, NY",
                    imageUrl: "../images/car1.jpg"
                },
                {
                    name: "Mazda CX5",
                    location: "Blacksburg, VA",
                    imageUrl: "../images/car1.jpg"
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