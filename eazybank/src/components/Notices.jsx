import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNoticeDetails } from '../Service/DashboardService';

const NoticesComponent = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                console.log("Fetching notices..."); // Debugging start
                const response = await getNoticeDetails();
                console.log("API Response:", response); // Check the response
                setNotices(response.body || []); // Ensure response.body is an array
            } catch (error) {
                console.error('Error fetching notice details:', error);
            }
        };

        fetchNotices();
    }, []);

    console.log("NoticesComponent rendered"); // Check if the component renders

    if (notices.length === 0) {
        return <div>No notices available</div>;
    }

    return (
        <section className="ftco-section" id="cards">
            <div className="container">
                <div className="row">
                    {notices.map((notice, index) => (
                        <div className="col-md-4 cardheader" key={index}>
                            <div className="card">
                                <div className="icon-wrap px-4 pt-4">
                                    <div className="icon d-flex justify-content-center align-items-center bg-success rounded-circle">
                                        <span className="ion-logo-ionic text-light">
                                            <i className="fa fa-envelope-open"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body pb-5 px-4">
                                    <h5 className="card-title">{notice.noticeSummary}</h5>
                                    <p className="card-text">{notice.noticeDetails}</p>
                                    <Link to="/contact" className="btn btn-success">Contact US</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NoticesComponent;
