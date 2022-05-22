import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <section className="page_404 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 md:w-1/2 w-full">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center ">404</h1>


                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2">
                                    Look like you're lost
                                </h3>

                                <p>the page you are looking for not avaible!</p>

                                <a href="/" className="link_404">Go to Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;