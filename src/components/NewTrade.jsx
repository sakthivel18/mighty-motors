import '../styles/newTrade.css';

const NewTrade = () => {
    return ( 
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form>
                        <div className="form-group row my-3">
                            <label for="category" className="col-sm-2 col-form-label">Category</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="category" placeholder="category"/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label for="title" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="category" placeholder="title"/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label for="author" className="col-sm-2 col-form-label">Author</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="category" placeholder="author"/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label for="details" className="col-sm-2 col-form-label">Details</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" placeholder="description"></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 d-flex flex-row-reverse">
                                <button type="submit" className="btn btn-primary"> Create Trade</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
     );
}
 
export default NewTrade;