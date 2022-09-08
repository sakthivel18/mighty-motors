import car from "../images/car1.jpg";

const TradeDetail = () => {
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-5">
                            <img src={car} height={200}/>
                        </div>
                        <div className="col-md-7">
                            <p> Audi A4 posted by Sakthivel Ravichandran </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Proin sed libero enim sed faucibus turpis in eu mi. Libero volutpat sed cras ornare arcu dui vivamus. Eu nisl nunc mi ipsum faucibus vitae. Elementum nibh tellus molestie nunc non blandit massa enim nec. Et netus et malesuada fames ac turpis egestas maecenas pharetra. Viverra nam libero justo laoreet sit amet cursus. Neque egestas congue quisque egestas. Pellentesque id nibh tortor id aliquet lectus. Vitae tortor condimentum lacinia quis vel eros donec. Amet tellus cras adipiscing enim eu turpis. Sem viverra aliquet eget sit. Risus nec feugiat in fermentum posuere urna. Eleifend quam adipiscing vitae proin.
                    </p>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
     );
}
 
export default TradeDetail;