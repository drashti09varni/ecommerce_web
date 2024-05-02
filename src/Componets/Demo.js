import React from 'react'

const Demo = () => {
    return (
        <div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="title mb-4">Our products</h4>
                            <p className="text-muted para-desc mx-auto mb-0">
                                There is now an abundance of readable dummy texts. These are usually
                                used when a text is required purely to fill a space.
                            </p>
                        </div>
                    </div>
                    {/*end col*/}
                </div>
                {/*end row*/}
                <div className="row">
                    <div className="col-md-3 col-sm-6">
                        <div className="product-grid">
                            <div className="product-image">
                                <a href="#" className="image">
                                    <img
                                        className="pic-1"
                                        src="https://images.unsplash.com/photo-1539840093138-9b3e230e5206?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=765a2eb222b1851840a4a157780fb487&auto=format&fit=crop&w=1534&q=80"
                                    />
                                    <img
                                        className="pic-2"
                                        src="https://images.unsplash.com/photo-1539840093138-9b3e230e5206?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=765a2eb222b1851840a4a157780fb487&auto=format&fit=crop&w=1534&q=80"
                                    />
                                </a>
                                <a href="#" className="product-like-icon" data-tip="Add to Wishlist">
                                    <i className="far fa-heart" />
                                </a>
                                <ul className="product-links">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-search" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-random" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="title">
                                    <a href="#">Women's Top</a>
                                </h3>
                                <div className="price">$75.99</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="product-grid">
                            <div className="product-image">
                                <a href="#" className="image">
                                    <img
                                        className="pic-1"
                                        src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=04aebe9a22884efa1a5f61e434215597&auto=format&fit=crop&w=500&q=60"
                                    />
                                    <img
                                        className="pic-2"
                                        src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=04aebe9a22884efa1a5f61e434215597&auto=format&fit=crop&w=500&q=60"
                                    />
                                </a>
                                <span className="product-sale-label">Sale</span>
                                <a href="#" className="product-like-icon" data-tip="Add to Wishlist">
                                    <i className="far fa-heart" />
                                </a>
                                <ul className="product-links">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-search" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-random" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="title">
                                    <a href="#">Men's Blazer</a>
                                </h3>
                                <div className="price">
                                    <span>$86.33</span> $71.55
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="product-grid">
                            <div className="product-image">
                                <a href="#" className="image">
                                    <img
                                        className="pic-1"
                                        src="https://images.unsplash.com/photo-1516961642265-531546e84af2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=74065eec3c2f6a8284bbe30402432f1d&auto=format&fit=crop&w=500&q=60"
                                    />
                                    <img
                                        className="pic-2"
                                        src="https://images.unsplash.com/photo-1516961642265-531546e84af2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=74065eec3c2f6a8284bbe30402432f1d&auto=format&fit=crop&w=500&q=60"
                                    />
                                </a>
                                <span className="product-sale-label">Sale</span>
                                <a href="#" className="product-like-icon" data-tip="Add to Wishlist">
                                    <i className="far fa-heart" />
                                </a>
                                <ul className="product-links">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-search" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-random" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="title">
                                    <a href="#">Men's Blazer</a>
                                </h3>
                                <div className="price">
                                    <span>$86.33</span> $71.55
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="product-grid">
                            <div className="product-image">
                                <a href="#" className="image">
                                    <img
                                        className="pic-1"
                                        src="https://images.unsplash.com/photo-1524010349062-860def6649c3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e725946a3f177dce83a705d4b12019c2&auto=format&fit=crop&w=500&q=60"
                                    />
                                    <img
                                        className="pic-2"
                                        src="https://images.unsplash.com/photo-1524010349062-860def6649c3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e725946a3f177dce83a705d4b12019c2&auto=format&fit=crop&w=500&q=60"
                                    />
                                </a>
                                <span className="product-sale-label">Sale</span>
                                <a href="#" className="product-like-icon" data-tip="Add to Wishlist">
                                    <i className="far fa-heart" />
                                </a>
                                <ul className="product-links">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-search" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-random" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="title">
                                    <a href="#">Men's Blazer</a>
                                </h3>
                                <div className="price">
                                    <span>$86.33</span> $71.55
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Demo