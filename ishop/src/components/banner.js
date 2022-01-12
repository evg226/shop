import React from 'react';

function Banner() {
    return (
        <section className="banner">
            <div className="banner__container container">
                <div className="banner__img">
                    <img src="img/man.png" alt="banner image" />
                </div>
                <div className="banner__heading">
                    <h2 className="banner__heading__big">The Brand</h2>
                    <p className="banner__heading__little">
                        of Luxerious <span className="banner__heading__call">fashion</span>
                    </p>
                </div>

            </div>
        </section>
);
}

export default Banner;