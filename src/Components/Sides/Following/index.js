import React from 'react';
import {Link} from "react-router-dom";
import Button from "../../Button";
import '../sides.css';
import getFollowing from "../../../Functions/getFollowing";
import follow from "../../../Functions/follow";
import unfollow from "../../../Functions/unfollow";

class Following extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            following: [],
            currentUserFollowing: []
        }
        this.follow = follow.bind(this);
        this.unfollow = unfollow.bind(this);
        this.getFollowing = getFollowing.bind(this);

        // if (this.props.username && this.props.myUsername) {
        //     this.getFollowing(this.props.username, this.abortController);
        //     this.getFollowing(this.props.myUsername, this.abortController);
        // }
    }

    abortController = new AbortController();

    componentDidMount() {
        this.getFollowingData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.getFollowingData();
        }
    }

    getFollowingData = () => {
        if (this.props.username && this.props.myUsername) {
            this.getFollowing(this.props.username, this.abortController)
                .then(data => {
                    this.setState({
                        following: data.data.username.following
                    })
                })
            this.getFollowing(this.props.myUsername, this.abortController)
                .then(data => {
                    this.setState({
                        currentUserFollowing: data.data.username.following
                    })
                })
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        return (
            <section className="secondary secondary-right">
                <h4>
                    following
                </h4>
                {this.state.following.map(following =>
                    <div
                        className="me-follow">
                        <div>
                            <p>
                                <Link to={"/" + following.username}>
                                    {following.username}
                                </Link>
                            </p>
                            <p className="fade-text x-small">
                                {following.description}
                            </p>
                        </div>
                        {this.props.loggedIn &&
                        <div>
                            {this.props.myUsername !== following.username &&
                            !this.state.currentUserFollowing.find(o => o.username === following.username) &&
                            <Button
                                className="follow"
                                onHandleClick={this.follow}
                                value={following.id}
                                name="+"
                            />
                            }
                            {this.state.currentUserFollowing.find(o => o.username === following.username) &&
                            <Button
                                className="follow unfollow unfollow-rotate"
                                onHandleClick={this.unfollow}
                                value={following.id}
                                name="+"
                            />
                            }
                        </div>
                        }
                    </div>
                )}
            </section>
        );
    }
}

export default Following;