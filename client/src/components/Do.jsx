import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Col, Pagination, Row } from 'antd';
import { ScaleLoader } from 'react-spinners';
import '../css/Categories.css';

function Place({ place }) {
    return (
        <div>
            <Link to={`/place/${place._id}`}>
                <Card
                    hoverable
                    cover={<img className='palce-card-image' src={`/uploads/${place._id}-0.jpg`} alt={place.name} />}      //show index=0 image as cover   
                >
                    <div className='place-card-p'>
                        <p>{place.name}</p>
                    </div>
                </Card>
            </Link>
        </div>
    );
}

function Do() {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);

    const placesPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {                                              //by using useeffect hook calling all places
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/places/getallplaces');               //calling get all places API (create constant as response for received data)
                const data = response.data;                                                 //save received data(response.data) as data
                const doPlaces = data.places.filter(place => place.category === 'Do');      //filter category==do places from all the places)
                setPlaces(doPlaces);
                setFilteredPlaces(doPlaces);
                setTimeout(() => {
                    setIsLoading(false);
                    setShowSpinner(false);                         //until spend 1500ms close showspinner
                }, 1500);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setShowSpinner(false);
            }
        };

        fetchData();
    }, []);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {showSpinner ? (                                  //show the spinner(1.5s)
                <div className="spinner-container">
                    <ScaleLoader color="#2e96d6" />
                </div>
            ) : (
                <div className="blogscreen-content">
                    <Row gutter={[16, 16]}>
                        {filteredPlaces
                            .slice((currentPage - 1) * placesPerPage, currentPage * placesPerPage)            //if have many places first loading 8 and then again 8
                            .map(place => (
                                <Col key={place.id} span={6} className='palce-card' >
                                    <Place place={place} />
                                </Col>
                            ))}
                    </Row>
                </div>
            )}
            <div className="pagnition">
                <Pagination
                    current={currentPage}
                    pageSize={placesPerPage}
                    total={filteredPlaces.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
}

export default Do;
