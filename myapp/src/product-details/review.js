import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './product.css';
import StarRatings from 'react-star-ratings';
import reviewRequest from '../services/reviewRequest';
import { reviewAction } from '../actions/reviewAction'
const mapStateToProps = (state) => {
    return ({ reviews: state.review_reducer.reviews })
}
const mapDispatchToProps = (dispatch) => {
    return ({ action: bindActionCreators({ reviewAction }, dispatch) })
}
class Review extends Component {
    componentWillMount() {
        reviewRequest().then((response) => this.props.action.reviewAction(response.data))
    }

    render() {
        if (this.props.reviews !== null) {
            let review_of_product = this.props.reviews[this.props.id]
            let review_array = review_of_product.customer_ratings.map((single_review) => (
                <div className="Single-Review">
                    <div className="Review-Star">
                        <StarRatings
                            rating={parseFloat(single_review.rating, 10)}
                            starRatedColor="#ff6008"
                            numberOfStars={5}
                            starSpacing="5px"
                            starDimension="20px"
                            name='rating'
                        />
                        <span>{single_review.rating} of 5</span>
                    </div>
                    
                    <div className="Review-Name">
                        <p>By {single_review.name}</p>
                    </div>
                    <div className="Review-Content-Product">
                        <p>{single_review.content}</p>
                    </div>
                </div>
            )
            )
            return (
                <div className="Review">
                    <div className="Review-Heading" >
                        <p>Customer Review</p>
                    </div>
                    <div className="Overall-Rating">
                        <StarRatings
                            rating={parseFloat(review_of_product.overall, 10)}
                            starRatedColor="#ff6008"
                            numberOfStars={5}
                            starSpacing="5px"
                            starDimension="20px"
                            name='rating'
                        />
                        <span> {review_of_product.overall} of 5</span>
                    </div>
                    <div className="Top-Reviews">
                        <div><p>Top Customer Reviews</p></div>
                        <div className="All-Reviews">
                            {review_array}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return null
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
