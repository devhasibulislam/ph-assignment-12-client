import React from 'react';

const Technology = () => {
    return (
        <div className=' flex p-8'>
            <div className='mr-4'>
                {/* <!-- The button to open modal --> */}
                <label for="front-end" class="btn modal-button btn-primary">Frontend</label>

                {/* <!-- Put this part before </body> tag-- > */}
                <input type="checkbox" id="front-end" class="modal-toggle" />
                <label for="front-end" class="modal cursor-pointer">
                    <label class="modal-box relative" for="">
                        <h3 class="text-lg font-bold">List of front-end technologies</h3>
                        <div>
                            <ul>
                                <li>React</li>
                                <li>React Bootstrap</li>
                                <li>React Font Awesome</li>
                                <li>Tailwind</li>
                                <li>Axios</li>
                                <li>React Query</li>
                                <li>React Router</li>
                                <li>React Spring</li>
                                <li>SWR</li>
                                <li>React Google Maps API</li>
                                <li>React Toastify</li>
                                <li>React Leaflet</li>
                                <li>React Hooks Forms</li>
                                <li>React Day Picker</li>
                            </ul>
                        </div>
                    </label>
                </label>
            </div>
            <div className='ml-4'>
                {/* <!-- The button to open modal --> */}
                <label for="back-end" class="btn modal-button btn-secondary">Backend</label>

                {/* <!-- Put this part before </body> tag-- > */}
                <input type="checkbox" id="back-end" class="modal-toggle" />
                <label for="back-end" class="modal cursor-pointer">
                    <label class="modal-box relative" for="">
                        <h3 class="text-lg font-bold">List of back-end technologies</h3>
                        <div>
                            <ul>
                                <li>MongoDB</li>
                                <li>Firebase</li>
                                <li>Heroku</li>
                                <li>Netlify</li>
                                <li>Github</li>
                                <li>React Hooks Firebase</li>
                            </ul>
                        </div>
                    </label>
                </label>
            </div>
        </div>
    );
};

export default Technology;