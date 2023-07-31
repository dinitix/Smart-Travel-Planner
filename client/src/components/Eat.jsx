import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import { ScaleLoader } from 'react-spinners';
import '../css/Categories.css';

function Place({ place }) {
    return (
        <div>                             
            <Link to={`/place/${place._id}`}>       
                <Card
                    span={6}
                    hoverable
                    cover={<img className='palce-card-image' src={`/uploads/${place._id}-0.jpg`} alt={place.name} />}   //show index=0 images as cover
                >
                    <div className='place-card-p'>
                        <p>{place.name}</p>
                    </div>
                </Card>
            </Link>
        </div>
    );
}

function Eat() {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true);

    const placesPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {                                   //by using useeffect hook calling all places
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/places/getallplaces');   //calling get all places API (create constant as response for received data)
                const data = response.data;                                     //save received data(response.data) as data
                const eatPlaces = data.places.filter(place => place.category === 'Eat');     //filter category==eat places from all the places)
                setPlaces(eatPlaces);
                setFilteredPlaces(eatPlaces);
                setTimeout(() => {
                    setIsLoading(false);
                    setShowSpinner(false);               //until spend 1500ms close showspinner
                }, 1500);                          
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setShowSpinner(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {showSpinner ? (                                 //show the spinner(1.5s)
                <div className="spinner-container">
                    <ScaleLoader color="#2e96d6" />
                </div>
            ) : (
                <div className="blogscreen-content">
                    <Row gutter={[16, 16]}>
                        {filteredPlaces
                            .slice((currentPage - 1) * placesPerPage, currentPage * placesPerPage)   //if have many places first loading 8 and then again 8
                            .map(place => (
                                <Col key={place.id} span={6} className='palce-card'>
                                    <Place place={place} />
                                </Col>
                            ))}
                    </Row>
                </div>
            )}
        </div>
    );
}

export default Eat;
